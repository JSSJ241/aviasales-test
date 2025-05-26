import { TicketCard } from "../TicketCard/TicketCard.jsx";
import { useSelector } from "react-redux";
import { useState } from "react"; 
import styles from './TicketList.module.css';

export const TicketList = () => {

    const [visibilityCount, setVisibilityCount] = useState(5);
    const  {items, loading, error } = useSelector((state) => state.tickets);
    const sortType = useSelector((state) =>state.sort);
    const filters = useSelector((state) => state.filters.options);

    const getStopsFilter = () => {
        const result = [];
        if (filters['Без пересадок']) {
            result.push(0);
        }
        if (filters['1 пересадка']) {
            result.push(1);
        }
        if (filters['2 пересадки']) {
            result.push(2);
        }
        if (filters['3 пересадки']) {
            result.push(3);
        }
        if (result.length === 0) {
            return [0, 1, 2, 3, 4, 5]
        }
        return result;
    }

    const filterTickets = (tickets) => {
        const allowedStops = getStopsFilter();
        return tickets.filter((tickets) => 
        tickets.segments.every((seg) => allowedStops.includes(seg.stops.length))
    );
    };

    const sortTickets = (tickets) => {
        switch(sortType) {
            case 'cheap':
                return [...tickets].sort((a,b) => a.price - b.price);
            case 'fast':
                return [...tickets].sort((a,b) => {
                    const timeA = a.segments[0].duration + a.segments[1].duration;
                    const timeB = b.segments[0].duration + b.segments[1].duration;
                    return timeA - timeB;
                });
            case 'optimal':
                    return[...tickets].sort((a,b) => {
                        const durationA = a.segments[0].duration + a.segments[1].duration;
                        const durationB = b.segments[0].duration + b.segments[1].duration;
                        return (a.price + durationA * 0.5) - (b.price + durationB * 0.5);
                    });
            default:
                return tickets;
        }
    }

    const showMore = () => {
        setVisibilityCount((prev) => prev + 5);
    }

    if (loading) return <p>Загрузка билетов...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    const sortedTickets = sortTickets(filterTickets(items)).slice(0, visibilityCount);
    
    return (
        <div className={styles.list}>
            {sortedTickets.map((ticket, index) => (
                <TicketCard key={index} ticket={ticket} />
        ))}

        {visibilityCount < items.length && (
            <button className={styles.next} onClick={showMore}>Показать еще 5 билетов!</button>
        )}
        </div>
    );
};
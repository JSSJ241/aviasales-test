import { useSelector, useDispatch } from 'react-redux';
import { setSortType } from './sortSlice';
import { TicketCard } from '../TicketCard/TicketCard.jsx';
import styles from './SortTabs.module.css';

export const SortTabs = () => {
    const dispatch = useDispatch();
    const currentSort = useSelector((state) => state.sort);

    const handleClick = (type) => {
        dispatch(setSortType(type));
    };

    return(
        <div className={styles.tabs}>
            <button className={`${styles.tab} ${currentSort === 'cheap' ? styles.active : ''}`}
            onClick={() => handleClick('cheap')}
            >
                Самый дешевый
            </button>

            <button className={`${styles.tab} ${currentSort === 'fast' ? styles.active : ''}`}
            onClick={() => handleClick('fast')}
            >
                Самый быстрый
            </button>

            <button className={`${styles.tab} ${currentSort === 'optimal' ? styles.active : ''}`}
            onClick={() => handleClick('optimal')}
            >
                Оптимальный
            </button>
        </div>
    );
};
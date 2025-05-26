import styles from './TicketCard.module.css';

const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
};

const getArrivalTime = (dateStr, duration) => {
    const date = new Date(dateStr);
    const arrival = new Date(date.getTime() + duration * 60 * 1000);
    return arrival.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
};

const getDurationString = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}ч ${mins}м`
}

const formatStopsLabel = (stopsCount) => {
    if (stopsCount === 0) return 'без пересадок';
    if (stopsCount === 1) return '1 пересадка';
    if (stopsCount < 5) return `${stopsCount} пересадки`;
    return `${stopsCount} пересадок`;
}

export const TicketCard = ({ ticket }) => {
    if (!ticket || !ticket.segments || ticket.segments.length < 1) {
    return null;
  }

  const segment = ticket.segments[0];
  const backSegment = ticket.segments[1] || null;

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.price}>
                    {ticket.price.toLocaleString ('ru-Ru')} RUB</span>
                <img className={styles.logo}
                src={`https://pics.avs.io/110/36/${ticket.carrier}.png`} 
                alt={ticket.carrier}
                />
            </div>
            <div className={styles.info}>
                <div className={styles.column}>
                    <span className={styles.label}>{segment.origin} - {segment.destination}</span>
                    <span className={styles.value}>
                        {formatTime(segment.date)} – {getArrivalTime(segment.date, segment.duration)}
                        </span>
                </div>
                <div className={styles.column}>
                    <span className={styles.label}>В пути</span>
                    <span className={styles.value}>{getDurationString(segment.duration)}</span>

                </div>
                <div className={styles.column}>
                    <span className={styles.label}>{formatStopsLabel(segment.stops.length)}</span>
                    <span className={styles.value}>{segment.stops.join(',')}</span>
                </div>
            </div>

            {backSegment && (
            <div className={styles.info}>
                <div className={styles.column}>
                    <span className={styles.label}>{backSegment.origin} – {backSegment.destination}</span>
                    <span className={styles.value}>
                        {formatTime(backSegment.date)} – {getArrivalTime(backSegment.date, backSegment.duration)}
                        </span>
                </div>
                <div className={styles.column}>
                    <span className={styles.label}>В пути</span>
                    <span className={styles.value}>{getDurationString(backSegment.duration)}</span>

                </div>
                <div className={styles.column}>
                    <span className={styles.label}>{formatStopsLabel(backSegment.stops.length)}</span>
                    <span className={styles.value}>{backSegment.stops.join(', ')}</span>
                </div>
            </div>
            )}
        </div>
    )
}

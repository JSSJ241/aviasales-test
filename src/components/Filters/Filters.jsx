import styles from './Filters.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFilter } from './filtersSlice';

export const  Filters = () => {
    const dispatch = useDispatch();

    const allChecked = useSelector((state) => state.filters.all);
    const options = useSelector((state) => state.filters.options);

    const handleChange = (label) => {
        dispatch(toggleFilter(label));
    };

    const labels = ['Все', 'Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'];

    return (
        <div className={styles.filters}>
            <h3 className={styles.title}>Количество пересадок</h3>
            {labels.map((label, idx) => {
                const isChecked = label === 'Все' ? allChecked : options[label];

                return (
                    <label key={idx} className={styles.option}>
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleChange(label)}
                        />
                        <span>{label}</span>
                    </label>
                );
            })}
        </div>
    );
};
import React from 'react';
import styles from './SportFilter.module.css';

interface SportFilterProps {
    value: string;
    onChange: (value: string) => void;
    options: string[];
}

export const SportFilter: React.FC<SportFilterProps> = React.memo(({ value, onChange, options }) => {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={styles.select}
        >
            <option value="">All Sports</option>
            {options.map((sport) => (
                <option key={sport} value={sport}>
                    {sport}
                </option>
            ))}
        </select>
    );
});
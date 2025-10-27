import React from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = React.memo(({ value, onChange }) => {
    return (
        <input
            type="text"
            placeholder="Search leagues..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={styles.input}
        />
    );
});
import React, { useState } from 'react';
import styles from './LeagueCard.module.css';

interface LeagueCardProps {
    id: string;
    name: string;
    sport: string;
    leagueAlternate?: string;
    getBadge: (idLeague: string) => Promise<string | null>;
}

export const LeagueCard: React.FC<LeagueCardProps> = React.memo(
    ({ id, name, sport, leagueAlternate, getBadge }) => {
        const [badge, setBadge] = useState<string | null>(null);
        const [loading, setLoading] = useState(false);

        const handleClick = async () => {
            if (badge || loading) return;

            setLoading(true);
            try {
                const fetchedBadge = await getBadge(id);
                setBadge(fetchedBadge);
            } catch (err) {
                console.error('Failed to fetch badge:', err);
            } finally {
                setLoading(false);
            }
        };

        return (
            <div onClick={handleClick} className={styles.card}>
                <h3 className={styles.leagueName}>{name}</h3>
                <p className={styles.sport}>{sport}</p>
                {leagueAlternate && <p className={styles.leagueAlt}>{leagueAlternate}</p>}

                {loading && <p>Loading badge...</p>}
                {badge && <img src={badge} alt={`${name} badge`} className={styles.badge} />}
            </div>
        );
    }
);
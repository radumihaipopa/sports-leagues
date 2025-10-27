import React from 'react';
import { useLeagues } from '../hooks/useLeagues';
import { LeagueCard } from '../components/LeagueCard';
import { SearchBar } from '../components/SearchBar';
import { SportFilter } from '../components/SportFilter';
import styles from './LeaguesPage.module.css';

export const LeaguesPage: React.FC = () => {
    const {
        leagues,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        selectedSport,
        setSelectedSport,
        getBadge,
        sports,
    } = useLeagues();

    const handleSportChange = (sport: string) => {
        setSearchTerm('');
        setSelectedSport(sport);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <SearchBar
                    value={searchTerm}
                    onChange={setSearchTerm}
                />
                <SportFilter
                    value={selectedSport}
                    onChange={handleSportChange}
                    options={sports}
                />
            </div>

            {loading && <p>Loading leagues...</p>}
            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.grid}>
                {leagues.length > 0
                    ? leagues.map((league) => (
                        <LeagueCard
                            key={`${league.idLeague}-${league.strLeague}`}
                            id={league.idLeague}
                            name={league.strLeague}
                            sport={league.strSport}
                            leagueAlternate={league.strLeagueAlternate}
                            getBadge={getBadge}
                        />
                    ))
                    : !loading && (
                    <p key="no-leagues">
                        No leagues found.
                    </p>
                )}
            </div>
        </div>
    );
};
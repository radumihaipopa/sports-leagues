import { useState, useEffect, useMemo } from 'react';
import type { League } from '../types/league';
import { fetchAllLeagues, fetchLeagueBadge } from '../api/leagues';
import { getCache, setCache, hasCache } from '../utils/cache';

export const useLeagues = () => {
    const [leagues, setLeagues] = useState<League[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
    const [selectedSport, setSelectedSport] = useState('');

    useEffect(() => {
        const loadLeagues = async () => {
            try {
                setLoading(true);
                setError(null);

                if (hasCache('leagues')) {
                    setLeagues(getCache<League[]>('leagues')!);
                } else {
                    const data = await fetchAllLeagues();
                    setCache('leagues', data);
                    setLeagues(data);
                }
            } catch (err) {
                console.error('Failed to fetch leagues:', err);
                setError('Failed to load leagues');
            } finally {
                setLoading(false);
            }
        };

        loadLeagues();
    }, []);

    useEffect(() => {
        const searchTimeout = window.setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 100);

        return () => clearTimeout(searchTimeout);
    }, [searchTerm]);

    const filteredLeagues = useMemo(() => {
        const term = debouncedSearchTerm.toLowerCase();

        return leagues.filter((league) => {
            const matchesSearch = league.strLeague.toLowerCase().includes(term);
            const matchesSport = selectedSport ? league.strSport === selectedSport : true;
            return matchesSearch && matchesSport;
        });
    }, [leagues, debouncedSearchTerm, selectedSport]);

    const sports = useMemo(() => {
        const uniqueSports = Array.from(new Set(leagues.map((l) => l.strSport)));
        return uniqueSports.sort();
    }, [leagues]);

    const getBadge = async (idLeague: string): Promise<string | null> => {
        const cacheKey = `badge-${idLeague}`;

        if (hasCache(cacheKey)) {
            return getCache<string | null>(cacheKey)!;
        }

        try {
            const badge = await fetchLeagueBadge(idLeague);
            setCache<string | null>(cacheKey, badge);
            return badge;
        } catch (err) {
            console.error(`Failed to fetch badge for league ${idLeague}:`, err);
            return null;
        }
    };

    return {
        leagues: filteredLeagues,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        selectedSport,
        setSelectedSport,
        getBadge,
        sports,
    };
};
import axios from 'axios';
import type { League } from '../types/league';

export const BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';

export const fetchAllLeagues = async (): Promise<League[]> => {
    try {
        const { data } = await axios.get(`${BASE_URL}/all_leagues.php`);
        if (!data || !data.leagues) {
            throw new Error('Invalid response from fetchAllLeagues API');
        }
        return data.leagues;
    } catch (error) {
        console.error('Error fetching leagues:', error);
        throw error;
    }
}

export const fetchLeagueBadge = async (idLeague: string): Promise<string | null> => {
    try {
        const { data } = await axios.get(`${BASE_URL}/search_all_seasons.php?badge=1&id=${idLeague}`);
        if (!data || !Array.isArray(data.seasons) || data.seasons.length === 0) {
            throw new Error('Invalid response from fetchLeagueBadge API');
        }
        return data.seasons[0]?.strBadge || null;
    } catch (error) {
        console.error(`fetchLeagueBadge error for id ${idLeague}:`, error);
        throw error;
    }
};
import axios from 'axios';
import { BASE_URL, fetchLeagueBadge, fetchAllLeagues } from './leagues';
import type {League} from '../types/league';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchAllLeagues', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('returns leagues when API responds correctly', async () => {
        const mockLeagues: League[] = [
            { idLeague: '1', strLeague: 'English Premier League', strSport: 'Soccer', strLeagueAlternate: 'EPL' },
            { idLeague: '2', strLeague: 'NBA', strSport: 'Basketball', strLeagueAlternate: '' },
        ];

        mockedAxios.get.mockResolvedValue({ data: { leagues: mockLeagues } });

        const result = await fetchAllLeagues();
        expect(result).toEqual(mockLeagues);
        expect(mockedAxios.get).toHaveBeenCalledWith(`${BASE_URL}/all_leagues.php`);
    });

    it('throws an error when API returns invalid data', async () => {
        mockedAxios.get.mockResolvedValue({ data: {} });

        await expect(fetchAllLeagues()).rejects.toThrow('Invalid response from fetchAllLeagues API');
    });

    it('throws an error on network failure', async () => {
        mockedAxios.get.mockRejectedValue(new Error('Network error'));

        await expect(fetchAllLeagues()).rejects.toThrow('Network error');
    });
});

describe('fetchLeagueBadge', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('returns badge URL if data exists', async () => {
        mockedAxios.get.mockResolvedValue({
            data: { seasons: [{ strBadge: 'url-to-badge' }] },
        });

        const badge = await fetchLeagueBadge('123');
        expect(badge).toBe('url-to-badge');
        expect(mockedAxios.get).toHaveBeenCalledWith(`${BASE_URL}/search_all_seasons.php?badge=1&id=123`);
    });

    it('throws error if seasons are empty', async () => {
        mockedAxios.get.mockResolvedValue({ data: { seasons: [] } });
        await expect(fetchLeagueBadge('123')).rejects.toThrow('Invalid response from fetchLeagueBadge API');
    });

    it('throws on network error', async () => {
        mockedAxios.get.mockRejectedValue(new Error('Network error'));
        await expect(fetchLeagueBadge('123')).rejects.toThrow('Network error');
    });
});

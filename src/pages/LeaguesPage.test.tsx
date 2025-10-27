import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LeaguesPage } from './LeaguesPage';
import { useLeagues } from '../hooks/useLeagues';

jest.mock('../hooks/useLeagues');

describe('LeaguesPage', () => {
    const mockedUseLeagues = useLeagues as jest.MockedFunction<typeof useLeagues>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockedUseLeagues.mockReturnValue({
            leagues: [],
            loading: false,
            error: null,
            searchTerm: '',
            setSearchTerm: jest.fn(),
            selectedSport: '',
            setSelectedSport: jest.fn(),
            getBadge: jest.fn(),
            sports: ['Soccer', 'Basketball'],
        });
    });

    it('renders search bar and sport filter', () => {
        render(<LeaguesPage />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('renders "No leagues found" when list is empty', () => {
        render(<LeaguesPage />);
        expect(screen.getByText(/No leagues found/i)).toBeInTheDocument();
    });

    it('renders loading state', () => {
        mockedUseLeagues.mockReturnValueOnce({
            ...mockedUseLeagues(),
            loading: true,
            leagues: [],
        } as never);

        render(<LeaguesPage />);
        expect(screen.getByText(/Loading leagues.../i)).toBeInTheDocument();
    });

    it('renders error message when error exists', () => {
        mockedUseLeagues.mockReturnValueOnce({
            ...mockedUseLeagues(),
            error: 'Failed to load leagues',
        } as never);

        render(<LeaguesPage />);
        expect(screen.getByText(/Failed to load leagues/i)).toBeInTheDocument();
    });

    it('renders league cards when leagues are present', () => {
        mockedUseLeagues.mockReturnValueOnce({
            ...mockedUseLeagues(),
            leagues: [
                {
                    idLeague: '1',
                    strLeague: 'English Premier League',
                    strSport: 'Soccer',
                    strLeagueAlternate: 'EPL',
                },
                {
                    idLeague: '2',
                    strLeague: 'NBA',
                    strSport: 'Basketball',
                    strLeagueAlternate: '',
                },
            ],
        } as never);

        render(<LeaguesPage />);
        expect(screen.getByText(/English Premier League/i)).toBeInTheDocument();
        expect(screen.getByText(/NBA/i)).toBeInTheDocument();
    });
});
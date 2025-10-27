import { getCache, setCache, hasCache } from './cache';

describe('Cache helpers', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('sets and gets a value', () => {
        setCache('key1', 123);
        expect(getCache<number>('key1')).toBe(123);
    });

    it('returns null for missing key', () => {
        expect(getCache<number>('unknown')).toBeNull();
    });

    it('returns null for type mismatch', () => {
        setCache('key2', 'stringValue');
        expect(getCache<number>('key2')).toBe('stringValue');
    });

    it('hasCache returns correct boolean', () => {
        setCache('key3', true);
        expect(hasCache('key3')).toBe(true);
        expect(hasCache('missing')).toBe(false);
    });
});
// Core
import { getFullApiUrl, getUniqueID, getRandomColor } from './';

const api = 'https://lab.lectrum.io/feed';
const groupID = 'l1lz1az2m5';
const assert = 'Api and groupID should be a string';
const length = 5;
const hashSymbolCodePoint = 35;

describe('helpers:', () => {
    test('getFullApiUrl should be a function', () => {
        expect(typeof getFullApiUrl).toBe('function');
    });

    test('getFullApiUrl function should throw an error if wrong non-string arguments were passed', () => {
        function getFullApiUrlWithError () {
            getFullApiUrl(null, 1);
        }

        expect(getFullApiUrlWithError).toThrowError(assert);
    });

    test('getFullApiUrl should return full API if executed successfully', () => {
        expect(getFullApiUrl(api, groupID)).toBe(`${api}/${groupID}`);
    });

    test('getUniqueID function should be a function', () => {
        expect(typeof getUniqueID).toBe('function');
    });

    test('getUniqueID function return value should be a string', () => {
        expect(typeof getUniqueID(1)).toBe('string');
    });

    test(`getUniqueID function return string value should have corrent length ${length}`, () => {
        expect(getUniqueID(length).length).toBe(length);
    });

    test('getRandomColor function should be a function', () => {
        expect(typeof getRandomColor).toBe('function');
    });

    test('getRandomColor function return value should be a string', () => {
        expect(typeof getRandomColor()).toBe('string');
    });

    test('getRandomColor function should always return a string of the same length', () => {
        expect(getRandomColor().length).toBe(7);
    });

    test('getRandomColor function return value should always start with \'#\' symbol', () => {
        expect(getRandomColor()[0]).toBe(String.fromCodePoint(hashSymbolCodePoint));
    });
});

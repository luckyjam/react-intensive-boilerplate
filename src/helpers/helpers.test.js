// Core
import { getFullApiUrl, getRandomColor, getUniqueID } from './';


const api =  'https://api.themoviedb.org/3/discover/movie?certification_country=US&';
const key = 'f95b4780d100c9d941e03e79486e1503';
const addQuery = '&sort_by=popularity.desc';
const assert = 'api, key and addQuery should be a string';
const hashSymbol = 35;
const hexLength = 7;
const assertUniqueId = 'Length should be a number';
// const colorTest = /[A-F, a-f, 0-9]/;

describe('helper', () => {
    test('getFullApiUrl should be a function', () => {
        expect(typeof getFullApiUrl).toBe('function');
    });

    test('getFullApiUrl function should trow an error if wrong non-string arguments were passed', () => {
        function getFullApiUrlWithError () {
            getFullApiUrl(null, 1);
        }

        expect(getFullApiUrlWithError).toThrowError(assert);
    });

    test('getFullApiUrl should return full API if executed successfully', () => {
        expect(getFullApiUrl(api, key, addQuery)).toBe(`${api}api_key=${key}${addQuery}`);
    });

    test('getFullApiUrl without addQuery parameter should return full API if executed successfully', () => {
        expect(getFullApiUrl(api, key)).toBe(`${api}api_key=${key}`);
    });

    test('getRandomColor should be a function', () => {
        expect(typeof getRandomColor).toBe('function');
    });

    test('getRandomColor should return string', () => {
        expect(typeof getRandomColor()).toBe('string');
    });

    test('getRandomColor should return first symbol to be hash', () => {
        expect(getRandomColor().charCodeAt(0)).toBe(hashSymbol);
    });

    test('getRandomColor should return string with a length of 7', () => {
        expect(getRandomColor().length).toBe(hexLength);
    });

    test('getUniqueID should be a function', () => {
        expect(typeof getUniqueID).toBe('function');
    });

    test('getUniqueID should return string', () => {
        expect(typeof getUniqueID(7)).toBe('string');
    });

    test('getUniqueID function should trow an error if wrong non-number argument was passed', () => {
        function getUniqueIdWithError () {
            getUniqueID(null);
        }

        expect(getUniqueIdWithError).toThrowError(assertUniqueId);
    });

    test('getUniqueID should return string with specified length', () => {
        expect(getUniqueID(7).length).toBe(7);
    });

});

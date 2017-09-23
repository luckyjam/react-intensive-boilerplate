// Core
import { getFullName, getUniqueID, getRandomColor } from './';

const firstName = 'Brad';
const lastName = 'Pitt';

describe('helpers: ', () => {
    test('getFullName function should be a function', () => {
        expect(typeof getFullName).toBe('function');
    });

    test('getFullName function should throw an error if wrong non-string arguments were passed', () => {
        function getFullNameWithError () {
            getFullName(null, 1);
        }

        expect(getFullNameWithError).toThrowError(
            'firstName and lastName arguments passed should be a string!'
        );
    });

    test('getFullName function should return fullName string separated by one space after successful execution', () => {
        expect(getFullName(firstName, lastName)).toBe(
            `${firstName} ${lastName}`
        );
    });

    test('getUniqueID function should be a function', () => {
        expect(typeof getUniqueID).toBe('function');
    });

    test('getUniqueID function return value should be a string', () => {
        expect(typeof getUniqueID(1)).toBe('string');
    });

    test('getUniqueID function return string value should have corrent length', () => {
        expect(getUniqueID(1).length).toBe(1);
        expect(getUniqueID(5).length).toBe(5);
        expect(getUniqueID(66).length).toBe(66);
    });

    test('getUniqueID function return value should be an empty string if there were no arguments passed', () => {
        expect(getUniqueID()).toBe('');
        expect(getUniqueID(null)).toBe('');
        expect(getUniqueID(undefined)).toBe('');
        expect(getUniqueID([])).toBe('');
        expect(getUniqueID({})).toBe('');
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
        expect(getRandomColor()[0]).toBe('#');
    });
});

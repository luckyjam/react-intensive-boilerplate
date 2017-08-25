// Core
import { getFullName, getCurrentTime, generateHash, getRandomColor } from './';
import moment from 'moment';

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

    test('getCurrentTime function should be a function', () => {
        expect(typeof getCurrentTime).toBe('function');
    });

    test('getCurrentTime function should return current date and time values properly formatted', () => {
        expect(getCurrentTime()).toBe(moment().format('MMMM D h:mm:ss a'));
    });

    test('generateHash function should be a function', () => {
        expect(typeof generateHash).toBe('function');
    });

    test('generateHash function return value should be a string', () => {
        expect(typeof generateHash(1)).toBe('string');
    });

    test('generateHash function return string value should have corrent length', () => {
        expect(generateHash(1).length).toBe(1);
        expect(generateHash(5).length).toBe(5);
        expect(generateHash(66).length).toBe(66);
    });

    test('generateHash function return value should be an empty string if there were no arguments passed', () => {
        expect(generateHash()).toBe('');
        expect(generateHash(null)).toBe('');
        expect(generateHash(undefined)).toBe('');
        expect(generateHash([])).toBe('');
        expect(generateHash({})).toBe('');
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

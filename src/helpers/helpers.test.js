// Core
import { getFullApiUrl } from './';

const api = 'https://lab.lectrum.io/feed';
const groupID = 'l1lz1az2m5';
const assert = 'Api and groupID should be a string';

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
});

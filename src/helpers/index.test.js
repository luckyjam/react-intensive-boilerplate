// Core
import { getFullName } from './';

const firstName = 'Brad';
const lastName = 'Pitt';

test('getFullName function should throw an error if wrong non-string arguments were passed', () => {
    function getFullNameWithError () {
        getFullName(null, 1);
    }

    expect(getFullNameWithError).toThrowError(
        'firstName and lastName arguments passed should be a string!'
    );
});

test('getFullName function should return fullName string separated by one space after successful execution', () => {
    expect(getFullName(firstName, lastName)).toBe(`${firstName} ${lastName}`);
    expect(getFullName(firstName, lastName)).toBe(`${firstName} ${lastName}`);
});

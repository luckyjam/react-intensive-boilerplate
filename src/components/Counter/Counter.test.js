// Core
import React from 'react';
import { shallow } from 'enzyme';
import Counter from './';

const count = 1;
const message = `Posts count: ${count}`;

const result = shallow(<Counter count = { count } />);

describe('Counter component:', () => {
    test('Counter component should have 1 \'section\' element', () => {
        expect(result.find('section').length).toBe(1);
    });

    test('Counter component should have valid html output', () => {
        expect(result.html()).toBe(`<section>${message}</section>`);
    });

    test('Counter component should children should have valid text value', () => {
        expect(result.text()).toBe(message);
    });
});

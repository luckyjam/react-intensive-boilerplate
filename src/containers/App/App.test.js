// Core
import React from 'react';
import { mount } from 'enzyme';
import App from './';

const result = mount(<App />);

describe('App container:', () => {
    test('Should have 5 \'section\' elements', () => {
        expect(result.find('section').length).toBe(5);
    });

    test('Should have valid html output', () => {
        expect(result.find('img').length).toBe(2);
    });

    test('Should have 1 \'textarea\' element', () => {
        expect(result.find('textarea').length).toBe(1);
    });
});

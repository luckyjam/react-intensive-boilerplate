// Core
import React from 'react';
import { mount } from 'enzyme';
import App from './';

const result = mount(<App />);
const placeholder = 'Marry Christmas!';

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

    test('textarea value should be empty initially', () => {
        expect(result.find('textarea').text()).toBe('');
    });

    test('textarea value should chang if text input provided', () => {
        result.find('textarea').simulate('change', {
            target: {
                value: placeholder
            }
        });

        expect(result.find('textarea').text()).toBe(placeholder);
    });

    test('App container\'s textarea value should chang if text input provided', () => {
        result.find('textarea').simulate('change', {
            target: {
                value: placeholder
            }
        });

        expect(result.find('textarea').text()).toBe(placeholder);
    });

    test('App container\'s textarea value should chang if text input provided', () => {
        expect(result.find('textarea').text()).toBe(placeholder + 1);
    });


});

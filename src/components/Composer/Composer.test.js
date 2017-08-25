// Core
import React from 'react';
import { mount } from 'enzyme';
import Composer from './';
import Feed from '../Feed';
import avatar from '../../theme/assets/homer.png';

const result = mount(<Composer createPost = { new Feed().createPost } />, {
    context: {
        avatar,
        firstName: 'Homer'
    }
});

const message = 'Marry Christmas!';
const state = {
    color:         '#000',
    textAreaValue: ''
};
const mutatedState = {
    color:         '#000',
    textAreaValue: message
};

describe('Composer component:', () => {
    test('Should have 1 \'section\' element', () => {
        expect(result.find('section').length).toBe(1);
    });

    test('Should have 1 \'form\' element', () => {
        expect(result.find('form').length).toBe(1);
    });

    test('Should have 1 \'textarea\' element', () => {
        expect(result.find('textarea').length).toBe(1);
    });

    test('Should have 1 \'input\' element', () => {
        expect(result.find('input').length).toBe(1);
    });

    test('Should have valid initial state', () => {
        expect(result.state()).toEqual(state);
    });

    test('Should respond to state change properly', () => {
        result.setState({
            textAreaValue: message
        });

        expect(result.state()).toEqual(mutatedState);

        result.setState({
            textAreaValue: ''
        });
    });

    test('textarea value should be empty initially', () => {
        expect(result.find('textarea').text()).toBe('');
    });

    test('textarea value should chang if text input provided', () => {
        result.find('textarea').simulate('change', {
            target: {
                value: message
            }
        });

        expect(result.find('textarea').text()).toBe(message);
    });

    test('component state and textarea value should reflect according changes if any text input provided', () => {
        result.find('textarea').simulate('change', {
            target: {
                value: message
            }
        });

        expect(result.state()).toEqual(mutatedState);
        expect(result.find('textarea').text()).toBe(message);
    });

    test('component state and textarea value should reflect according changes if the form is submitted', () => {
        result.find('form').simulate('submit');

        expect(result.state()).toEqual(state);
    });
});

// TODO: update generateHash, remove lastName from Composer

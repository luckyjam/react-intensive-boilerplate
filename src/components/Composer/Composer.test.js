// Core
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Composer from './';
import { options } from '../../containers/App';

Enzyme.configure({ adapter: new Adapter() });

const { firstName, lastName, avatar } = options;
const message = 'Merry christmas, ho-ho!';
const state = {
    textAreaValue:     '',
    avatarBorderColor: '#000'
};
const mutatedState = {
    textAreaValue:     message,
    avatarBorderColor: '#000'
};

const result = mount(<Composer createPost = { () => null } />, {
    context: {
        firstName,
        lastName,
        avatar
    }
});

describe('Composer component:', () => {
    test('Should have 1 \'section\' element', () => {
        expect(result.find('section')).toHaveLength(1);
    });

    test('Should have 1 \'form\' element', () => {
        expect(result.find('form')).toHaveLength(1);
    });

    test('Should have 1 \'textarea\' element', () => {
        expect(result.find('textarea')).toHaveLength(1);
    });

    test('Should have 1 \'input\' element', () => {
        expect(result.find('input')).toHaveLength(1);
    });

    test('Should have 1 \'img\' element', () => {
        expect(result.find('img')).toHaveLength(1);
    });

    test('Should have valid initial state', () => {
        expect(result.state()).toEqual(state);
    });

    test('textarea value should be empty initially', () => {
        expect(result.find('textarea').text()).toBe('');
    });

    test('Should respond to state change properly', () => {
        result.setState(() => ({
            textAreaValue: message
        }));

        expect(result.state()).toEqual(mutatedState);
        expect(result.find('textarea').text()).toBe(message);

        result.setState(() => ({
            textAreaValue: ''
        }));

        expect(result.state()).toEqual(state);
        expect(result.find('textarea').text()).toBe('');
    });

    test(`component state and textarea value should reflect according changes
        if any text input provided`, () => {
            result.find('textarea').simulate('change', {
                target: {
                    value: message
                }
            });

            expect(result.state()).toEqual(mutatedState);
            expect(result.find('textarea').text()).toBe(message);
        });

    test(`component state and textarea value should reflect according changes
        if the form is submitted`, () => {
            result.find('form').simulate('submit');

            expect(result.state()).toEqual(state);
        });
});

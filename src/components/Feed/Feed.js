// Core
import React from 'react';
import { shallow, mount } from 'enzyme';
import Feed from './';
import avatar from '../../theme/assets/homer.png';
import PropTypes from 'prop-types';

// const count = 1;
// const message = `Posts count: ${count}`;

const result = shallow(<Feed />, {
    options: {
        context: {
            avatar: 'lol'
        },
        childContextTypes: {
            avatar: PropTypes.string.isRequired
        }
    }
});

describe('Feed component:', () => {
    test('Counter component should have 1 \'section\' element', () => {
        expect(result.find('section').length).toBe(1);
    });

    test('Counter component should have valid html output', () => {
        expect(result.html()).toBe(`<section></section>`);
    });
    //
    // test('Counter component should children should have valid text value', () => {
    //     expect(result.text()).toBe(message);
    // });
});

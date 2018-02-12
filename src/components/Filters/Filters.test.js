// Core
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Filters from './';

configure({ adapter: new Adapter() });

const handleClick = jest.fn();

const result = shallow(
    <Filters
        handleClickFavoritesList = { handleClick }
        handleClickFilterNew = { handleClick }
        handleClickFilterPopular = { handleClick }
        handleClickFilterTop = { handleClick }
    />
);

describe('Component Filters:', () => {

    test('Should render once \'section\' element', () => {
        expect(result.find('section')).toHaveLength(1);
    });

    test('Should render one \'ul\' element', () => {
        expect(result.find('ul')).toHaveLength(1);
    });

    test('Should render four \'li\' elements', () => {
        expect(result.find('li')).toHaveLength(4);
    });

    test('Simulate click elevents on all \'li\' elements', () => {

        result.find('li').forEach((node) => {

            node.simulate('click');
        });
        expect(handleClick.mock.calls.length).toBe(4);
    });

});

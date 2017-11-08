// Core
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Movie from './';

Enzyme.configure({ adapter: new Adapter() });

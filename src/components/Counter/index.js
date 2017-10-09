// Core
import React from 'react';

// Instruments
import Styles from './styles.scss';
import PropTypes from 'prop-types';

const Counter = ({ count }) => (
    <section className = { Styles.counter }>Posts count: {count}</section>
);

Counter.propTypes = {
    count: PropTypes.number.isRequired
};

export default Counter;

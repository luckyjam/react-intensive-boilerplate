// Core
import React from 'react';

// Instruments
import Styles from './styles.scss';
import { string } from 'prop-types';

const Postman = (props, { avatar, firstName }) => (
    <section className = { Styles.postman }>
        <img src = { avatar } />
        <span>Welcome online, {firstName}</span>
    </section>
);

Postman.contextTypes = {
    avatar:    string.isRequired,
    firstName: string.isRequired
};

export default Postman;

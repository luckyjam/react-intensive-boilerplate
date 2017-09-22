// Core
import React, { Component } from 'react';

// Instruments
import PropTypes from 'prop-types';
import avatar from '../../theme/assets/homer.jpg';

// Components
import Feed from '../../components/Feed';

const options = {
    avatar,
    firstName: 'Homer',
    lastName:  'Simpson'
};

export default class App extends Component {
    static childContextTypes = {
        avatar:    PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName:  PropTypes.string.isRequired
    };

    getChildContext () {
        return options;
    }

    render () {
        return (
            <section>
                <Feed />
            </section>
        );
    }
}

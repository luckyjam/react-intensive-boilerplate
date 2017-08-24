// Core
import React, { Component } from 'react';

// Instruments
import PropTypes from 'prop-types';

// Components
import Feed from '../../components/Feed';

const lastName = 'Simpson';

export default class App extends Component {
    static childContextTypes = {
        firstName: PropTypes.string.isRequired
    };

    getChildContext () {
        return {
            firstName: 'Homer'
        };
    }

    render () {
        return (
            <section>
                <Feed lastName = { lastName } />
            </section>
        );
    }
}

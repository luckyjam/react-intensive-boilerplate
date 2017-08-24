// Core
import React, { Component } from 'react';

// Instruments
import PropTypes from 'prop-types';
import homer from '../../theme/assets/homer.png';

// Components
import Feed from '../../components/Feed';

const lastName = 'Simpson';

export default class App extends Component {
    static childContextTypes = {
        avatar:    PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName:  PropTypes.string.isRequired
    };

    getChildContext () {
        return {
            avatar:    homer,
            firstName: 'Homer',
            lastName:  'Simpson'
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

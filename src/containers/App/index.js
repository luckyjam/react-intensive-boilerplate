// Core
import React, { Component } from 'react';

// Instruments
import PropTypes from 'prop-types';

// Components
import Feed from '../../components/Feed';

const options = {
    firstName: 'Dima',
    lastName: 'Vakatsiienko'
}

export default class App extends Component {
    static childContextTypes = {
        firstName: PropTypes.string.isRequired
    }

    getChildContext () {
        return {
            firstName: options.firstName
        }
    }
    render () {

        return <Feed
            lastName = { options.lastName }
        />;
    }
}

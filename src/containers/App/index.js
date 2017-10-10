// Core
import React, { Component } from 'react';

// Instruments
import PropTypes from 'prop-types';
import avatar from '../../theme/assets/homer.jpg';

// Components
import Feed from '../../components/Feed';

const groupID = 'Group ID goes here.';
const options = {
    avatar,
    firstName: 'Homer',
    lastName:  'Simpson',
    api:       `https://lab.lectrum.io/feed/${groupID}`
};

export default class App extends Component {
    static childContextTypes = {
        api:       PropTypes.string.isRequired,
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

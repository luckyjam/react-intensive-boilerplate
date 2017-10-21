// Core
import React, { Component } from 'react';

// Instruments
import { string } from 'prop-types';
import avatar from '../../theme/assets/avatar.jpg';

// Components
import Feed from '../../components/Feed';
import Catcher from '../../components/Catcher';

const groupID = 'l1lz1az2m5';

const options = {
    firstName: 'Dima',
    lastName:  'Vakatsiienko',
    avatar,
    api:       `https://lab.lectrum.io/feed/${groupID}`
};

// DELETE POST:
// api:       `https://lab.lectrum.io/feed/${groupID}/${_id}`

// method: 'DELETE'

export default class App extends Component {
    static childContextTypes = {
        firstName: string.isRequired,
        lastName:  string.isRequired,
        avatar:    string.isRequired,
        api:       string.isRequired
    };

    getChildContext () {
        return options;
    }

    render () {
        return <Catcher><Feed /></Catcher>;
    }
}

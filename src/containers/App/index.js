// Core
import React, { Component } from 'react';

// Instruments
import { string } from 'prop-types';

// Components
import Feed from '../../components/Feed';
import Catcher from '../../components/Catcher';

const groupID = 'l1lz1az2m5';

const options = {
    firstName: 'Dima',
    lastName:  'Vakatsiienko',
    avatar:
        'https://scontent.fiev2-1.fna.fbcdn.net/v/t1.0-1/p320x320/13697178_1056674044419094_5187009261585858273_n.jpg?oh=9c470881aef82a6ce47c87e80d8dfd4b&oe=5A64FE00',
    api: `https://lab.lectrum.io/feed/${groupID}`
};

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
        return (
            <Catcher>
                <Feed />
            </Catcher>
        );
    }
}

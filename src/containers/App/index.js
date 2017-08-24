// Core
import React, { Component } from 'react';

// Instruments
import homer from '../../theme/assets/homer.png';

// Components
import Feed from '../../components/Feed';

const firstName = 'Homer';
const lastName = 'Simpson';

export default class App extends Component {
    render () {
        return (
            <section>
                <Feed
                    avatar = { homer }
                    firstName = { firstName }
                    lastName = { lastName }
                />
            </section>
        );
    }
}

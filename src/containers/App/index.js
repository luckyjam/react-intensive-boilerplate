// Core
import React, { Component } from 'react';

// Components
import Feed from '../../components/Feed';

const firstName = 'Homer';
const lastName = 'Simpson';


export default class App extends Component {
    render () {
        return (
            <section>
                <Feed firstName = { firstName } lastName = { lastName } />
            </section>
        );
    }
}

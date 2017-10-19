// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import avatar from '../../theme/assets/homer.jpg';

// Components
import Composer from '../../components/Composer';
import Post from '../../components/Post';

export default class App extends Component {
    render () {

        return (
            <section className = { Styles.app } >
                <Composer />
                <Post />
            </section>
        );
    }
}

// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';

// Components
import Composer from '../../components/Composer';
import Comment from '../../components/Comment';

export default class Feed extends Component {
    render () {
        return (
            <section className = { Styles.feed }>
                <Composer />
                <Comment />
            </section>
        );
    }
}

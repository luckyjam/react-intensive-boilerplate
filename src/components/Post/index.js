// Core
import React, { Component } from 'react';

// Instruments
import homer from '../../theme/assets/homer.png';
import Styles from './styles.scss';
import { getCurrentTime } from '../../helpers';

export default class Post extends Component {
    render () {
        return (
            <section className = { Styles.post }>
                <a>
                    <img alt = 'commenter' src = { homer } />
                </a>
                <a className = { Styles.name }>Homer Simpson</a>
                <a className = { Styles.time }>
                    {getCurrentTime()}
                </a>
                <p className = { Styles.message }>I fell perfect!</p>
            </section>
        );
    }
}

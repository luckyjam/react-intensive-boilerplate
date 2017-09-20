// Core
import React, { Component } from 'react';

// Instruments
import homer from '../../theme/assets/homer.png';
import Styles from './styles.scss';
import moment from 'moment';

export default class Post extends Component {
    render () {
        return (
            <section className = { Styles.post }>
                <a>
                    <img alt = 'commenter' src = { homer } />
                </a>
                <a className = { Styles.name }>{'Homer Simpson'}</a>
                <a className = { Styles.time }>
                    {moment().format('MMMM D h:mm:ss a')}
                </a>
                <p className = { Styles.message }>It is donuts time! Doh!</p>
            </section>
        );
    }
}

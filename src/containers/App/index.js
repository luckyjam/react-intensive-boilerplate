// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import avatar from '../../theme/assets/homer.jpg';

export default class App extends Component {
    render () {

        return (
            <section className = { Styles.app } >
                <img alt = 'commenter' src = { avatar } />
                <form>
                    <textarea placeholder = 'Dima Vakatsiienko' />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}

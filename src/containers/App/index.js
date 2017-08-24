import React, { Component } from 'react';
import Styles from './styles.scss';
import homer from '../../theme/assets/homer.png';

export default class App extends Component {
    render () {
        return (
            <section className = { Styles.app }>
                <img alt = 'commenter' src = { homer } />
                <form>
                    <textarea placeholder = 'Dima Vakatsiienko' />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}

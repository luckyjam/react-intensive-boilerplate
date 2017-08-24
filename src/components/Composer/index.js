// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import homer from '../../theme/assets/homer.png';

export default class Composer extends Component {
    render () {
        return (
            <section className = { Styles.composer }>
                <img alt = 'commenter' src = { homer } />
                <form>
                    <textarea
                        placeholder = { `What's on your mind, Homer?` }
                    />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}

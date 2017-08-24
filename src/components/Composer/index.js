// Core
import React, { Component } from 'react';

// Instruments
import homer from '../../theme/assets/homer.png';

export default class Composer extends Component {
    render () {
        return (
            <section>
                <img alt = 'commenter' src = { homer } />
                <form>
                    <textarea placeholder = 'Homer Simpson' />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}

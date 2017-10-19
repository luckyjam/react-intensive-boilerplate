// Core
import React, { Component } from 'react';

// Instruments
import avatar from '../../theme/assets/avatar.jpg';

export default class Composer extends Component {
    render () {
        return (
            <section>
                <img alt = 'commenter' src = { avatar } />
                <form>
                    <textarea placeholder = 'Dima Vakatsiienko' />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}

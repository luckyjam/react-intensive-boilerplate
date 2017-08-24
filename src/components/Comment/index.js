// Core
import React, { Component } from 'react';

// Instruments
import homer from '../../theme/assets/homer.png';
import { getCurrentTime } from '../../helpers';

export default class Comment extends Component {
    render () {
        return (
            <section>
                <img alt = 'commenter' src = { homer } />
                <span>Homer Simpson</span>
                <p>
                    It is {getCurrentTime()}.
                </p>
                <span>It is donuts time! Doh!</span>
            </section>
        );
    }
}

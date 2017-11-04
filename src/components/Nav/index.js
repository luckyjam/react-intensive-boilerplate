// Core
import React, { Component } from 'react';

// Instruments
// import Styles from './styles.scss';
import { func } from 'prop-types';

export default class Nav extends Component {

    static propTypes = {
        handleClickFilterNew:     func.isRequired,
        handleClickFilterPopular: func.isRequired,
        handleClickFilterTop:     func.isRequired
    }

    constructor () {
        super();
        this.handleClickFilterNew = ::this._handleClickFilterNew;
        this.handleClickFilterPopular = ::this._handleClickFilterPopular;
        this.handleClickFilterTop = ::this._handleClickFilterTop;
    }

    _handleClickFilterNew () {
        const { handleClickFilterNew } = this.props;

        handleClickFilterNew();
    }

    _handleClickFilterPopular () {
        const { handleClickFilterPopular } = this.props;

        handleClickFilterPopular();
    }

    _handleClickFilterTop () {
        const { handleClickFilterTop } = this.props;

        handleClickFilterTop();
    }


    render () {

        return (
            <div>
                <button onClick = { this.handleClickFilterPopular } >Popular Movies</button>
                <button onClick = { this.handleClickFilterNew }>New Movies</button>
                <button onClick = { this.handleClickFilterTop }>Top Movies</button>
            </div>
        );
    }
}

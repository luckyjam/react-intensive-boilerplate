// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import { func } from 'prop-types';

export default class Filters extends Component {

    static propTypes = {
        handleClickFavoritesList: func.isRequired,
        handleClickFilterNew:     func.isRequired,
        handleClickFilterPopular: func.isRequired,
        handleClickFilterTop:     func.isRequired
    }

    constructor () {
        super();
        this.handleClickFilterNew = ::this._handleClickFilterNew;
        this.handleClickFilterPopular = ::this._handleClickFilterPopular;
        this.handleClickFilterTop = ::this._handleClickFilterTop;
        this.handleClickFavoritesList = ::this._handleClickFavoritesList;
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

    _handleClickFavoritesList () {
        const { handleClickFavoritesList } = this.props;

        handleClickFavoritesList();
    }


    render () {

        return (
            <section className = { Styles.filters }>
                <ul>
                    <li onClick = { this.handleClickFilterPopular }>Popular Movies</li>
                    <li onClick = { this.handleClickFilterNew }>New Movies</li>
                    <li onClick = { this.handleClickFilterTop }>Top Movies</li>
                    <li className = { Styles.favoritesButton } onClick = { this.handleClickFavoritesList }>Favorites</li>
                </ul>
            </section>
        );
    }
}

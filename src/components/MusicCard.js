import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import * as favorites from '../services/favoriteSongsAPI';
import '../css/music-card.css';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      favorite: false,
      loading: false,
    };
  }

  handleFavorite = async ({ target }) => {
    const { trackName, previewUrl, trackId } = this.props;
    this.setState({
      loading: true,
      favorite: target.checked,
    });
    await favorites.addSong({ trackName, previewUrl, trackId });
    this.setState({
      loading: false,
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { favorite, loading } = this.state;
    return (
      !loading
        ? (
          <div className="track-line-container row">
            <div className="player-container">
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
            </div>
            <label htmlFor="favorite">
              <input
                data-testid={ `checkbox-music-${trackId}` }
                id="favorite"
                type="checkbox"
                checked={ favorite }
                onClick={ this.handleFavorite }
              />
            </label>
            <p>{ trackName }</p>
          </div>
        )
        : <Loading />
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
}.isRequired;

export default MusicCard;

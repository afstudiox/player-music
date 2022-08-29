import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HiOutlineHeart, HiHeart, HiPlay } from 'react-icons/hi';
import Loading from '../pages/Loading';
import * as favorites from '../services/favoriteSongsAPI';
import '../css/music-card.css';

class MusicCard extends Component {
  constructor(props) {
    super(props);

    const { isFavorite } = this.props;

    this.state = {
      favorite: isFavorite,
      loading: false,
    };
  }

  handleFavorite = async ({ target }) => {
    const { name, checked } = target;

    this.setState({
      [name]: checked,
      loading: true,
    }, async () => {
      const { favorite } = this.state;
      const { trackName, previewUrl, trackId, loadFavorites } = this.props;

      if (favorite) {
        await favorites.addSong({ trackName, previewUrl, trackId });
      } else {
        await favorites.removeSong({ trackName, previewUrl, trackId });
      }

      this.setState({ loading: false });
      loadFavorites();
    });
  };

  handlePlay({ target }) {
    const currentTarget = target.nodeName === 'path' ? target.parentNode : target;

    const currentActive = document.querySelector('.active');
    if (currentActive) {
      currentActive.classList.remove('active');
      currentActive.previousElementSibling.classList.remove('display-none');
      currentActive.pause();
    }

    currentTarget.classList.add('display-none');
    currentTarget.nextSibling.classList.add('active');
    currentTarget.nextSibling.play();
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, favorite } = this.state;
    const favIcon = favorite ? <HiHeart /> : <HiOutlineHeart />;

    return (
      !loading
        ? (
          <div className="track-line-container row">
            <div className="player-container">
              <HiPlay onClick={ (event) => this.handlePlay(event) } />
              <audio
                data-testid="audio-component"
                src={ previewUrl }
                controls
              >
                <track kind="captions" />
              </audio>
            </div>
            <label htmlFor={ trackId }>
              <input
                data-testid={ `checkbox-music-${trackId}` }
                id={ trackId }
                type="checkbox"
                name="favorite"
                checked={ favorite }
                onChange={ this.handleFavorite }
              />
            </label>
            <span>
              { favIcon }
            </span>
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
  isFavorite: PropTypes.bool,
  loadFavorites: PropTypes.func,
}.isRequired;

MusicCard.defaultProps = {
  loadFavorites: () => {},
};

export default MusicCard;

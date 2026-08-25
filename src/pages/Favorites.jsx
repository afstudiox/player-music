import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import * as favorites from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      tracks: [],
    };
  }

  componentDidMount() {
    this.loadFavorites();
  }

  loadFavorites = async () => {
    this.setState({
      loading: true,
    });

    const tracksFavorites = await favorites.getFavoriteSongs();
    this.setState({
      tracks: tracksFavorites,
      loading: false,
    });
  }

  render() {
    const { loading, tracks } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          !loading
            ? (
              <div className="album-container">
                <div className="album-container-tracks col">
                  {tracks
                    .map((track) => {
                      const isFavorite = tracks
                        .some((favorite) => favorite.trackId === track.trackId);
                      return (
                        <MusicCard
                          key={ track.trackId }
                          trackId={ track.trackId }
                          trackName={ track.trackName }
                          previewUrl={ track.previewUrl }
                          tracks={ tracks }
                          isFavorite={ isFavorite }
                          loadFavorites={ this.loadFavorites }
                        />);
                    })}
                </div>
              </div>)
            : <Loading />
        }
      </div>
    );
  }
}

export default Favorites;

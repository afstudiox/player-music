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
    const favorite = await favorites.getFavoriteSongs();
    // const local = localStorage.getItem('favorite_songs');
    this.setState({
      tracks: favorite,
      loading: false,
    });
  }

  render() {
    const { loading, tracks } = this.state;
    return (
      !loading
        ? (
          <div data-testid="page-favorites">
            <Header />
            <div className="album-container">
              <div className="album-container-tracks col">
                {tracks
                  .map((track) => (<MusicCard
                    key={ track.trackId }
                    trackId={ track.trackId }
                    trackName={ track.trackName }
                    previewUrl={ track.previewUrl }
                    tracks={ tracks }
                  />))}
              </div>
            </div>
          </div>
        )
        : <Loading />
    );
  }
}

export default Favorites;

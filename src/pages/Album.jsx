import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import '../css/album.css';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artistName: '',
      collectionName: '',
      artworkUrl100: '',
      tracks: [],
      loading: false,
      favoriteList: undefined,
    };
  }

  componentDidMount() {
    this.request();
    this.getFavoritesList();
  }

  getFavoritesList = async () => {
    const data = await getFavoriteSongs();
    this.setState({ favoriteList: data });
  }

  // função assincrona para chamar a API
  // desconstrução em profundidade orientada na monitoria por Diogo 11.03 13:30
  request = async () => {
    const { match: { params: { id } } } = this.props;
    const musicsForAlbum = await getMusics(id);
    const { artistName, collectionName, artworkUrl100 } = musicsForAlbum[0];
    this.setState({
      artistName,
      collectionName,
      artworkUrl100,
      tracks: musicsForAlbum
        .filter((_track, index) => index !== 0),
    });
  }

  render() {
    const { loading } = this.state;
    const {
      artistName,
      collectionName,
      artworkUrl100,
      tracks,
      favoriteList,
    } = this.state;

    return (

      !loading
        ? (
          <div data-testid="page-album">
            <Header />
            <div className="album-container">
              <div className="album-container-header row">
                <img src={ artworkUrl100 } alt="Foto do Album" />
                <div className="album-container-header-text">
                  <p data-testid="album-artist-name">{artistName}</p>
                  <p data-testid="album-name">{collectionName}</p>
                </div>
              </div>
              <div className="album-container-tracks col">
                {
                  (tracks && favoriteList)
                  && tracks
                    .map((track, index) => {
                      const isFavorite = favoriteList
                        .some((favorite) => favorite.trackId === track.trackId);
                      return (
                        <MusicCard
                          key={ index }
                          trackId={ track.trackId }
                          trackName={ track.trackName }
                          previewUrl={ track.previewUrl }
                          tracks={ tracks }
                          isFavorite={ isFavorite }
                        />);
                    })
                }
              </div>
            </div>
          </div>
        )
        : <Loading />
    );
  }
}
// usei essa referência para solucionar o erro de props missing

// https://stackoverflow.com/questions/47519612/eslint-match-is-missing-in-props-validation-react-prop-types

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      collectionName: '',
      tracks: [],
    };
  }

  componentDidMount() {
    this.request();
  }

  // função assincrona para chamar a API
  // desconstrução em profundidade orientada na monitoria por Diogo 11.03 13:30
  request = async () => {
    const { match: { params: { id } } } = this.props;
    const musicsForAlbum = await getMusics(id);
    const { artistName, collectionName } = musicsForAlbum[0];
    this.setState({
      artistName,
      collectionName,
      tracks: musicsForAlbum
        .filter((_track, index) => index !== 0),
    });
  }

  render() {
    const { artistName, collectionName, tracks } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div className="album-container">
          <p data-testid="artist-name">{artistName}</p>
          <p data-testid="album-name">{collectionName}</p>
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

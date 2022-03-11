import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      bandName: '',
      albumName: '',
      musicsAlbum: [],
    };
  }

  componentDidMount() {
    this.request();
  }

  // função assincrona para chamar a API
  request = async () => {
    const { musicsAlbum } = this.props.match.params;
    const { id } = musicsAlbum;
    const result = await getMusics(id);
    console.log(result);
  }

  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <div className="album-container">Em desenvolvimento</div>
      </div>
    );
  }
}

Album.propTypes = {
  musicsAlbum: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
export default Album;

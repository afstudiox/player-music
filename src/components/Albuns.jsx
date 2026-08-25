import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Albuns extends Component {
  render() {
    const { result } = this.props;
    const { artworkUrl100, collectionName, artistName, collectionId } = result;
    return (
      <Link
        to={ `/album/${collectionId}` }
        search={ collectionId }
      >
        <div className="album-item col" data-testid={ `link-to-album-${collectionId}` }>
          <img className="album-image" src={ artworkUrl100 } alt="" />
          <p className="album-artist">{ artistName }</p>
          <p className="album-name">{ collectionName }</p>
        </div>
      </Link>
    );
  }
}

Albuns.propTypes = {
  result: PropTypes.shape({
    artworkUrl100: PropTypes.string,
    collectionName: PropTypes.string,
    artistName: PropTypes.string,
    collectionId: PropTypes.string,
  }).isRequired,
};

export default Albuns;

// collectionName
// artistName
// artworkUrl100

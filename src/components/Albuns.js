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
        <div className="album-item" data-testid={ `link-to-album-${collectionId}` }>
          <img src={ artworkUrl100 } alt="" />
          <p>{ collectionName }</p>
          <p>{ artistName }</p>
        </div>
      </Link>
    );
  }
}

Albuns.propTypes = {
  result: PropTypes.shape({
    artworkUrl100: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired,
    collectionId: PropTypes.string.isRequired,
  }).isRequired,
};

export default Albuns;

// collectionName
// artistName
// artworkUrl100

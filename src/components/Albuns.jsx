import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Albuns({ result }) {
  const { artworkUrl100, collectionName, artistName, collectionId } = result;
  return (
    <Link to={`/album/${collectionId}`}>
      <div className="album-item col" data-testid={`link-to-album-${collectionId}`}>
        <img className="album-image" src={artworkUrl100} alt="" />
        <p className="album-artist">{artistName}</p>
        <p className="album-name">{collectionName}</p>
      </div>
    </Link>
  );
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
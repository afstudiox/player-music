import { Link } from 'react-router-dom';
import '../css/not-found.css';

function NotFound() {
  return (
    <div data-testid="page-not-found" className="not-found-container col">
      <p className="not-found-code">404</p>
      <p className="not-found-message">Ops! Essa página não existe.</p>
      <Link to="/search" className="not-found-button">
        Voltar para a busca
      </Link>
    </div>
  );
}

export default NotFound;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import '../css/header.css';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      hasUser: false,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      name: user.name,
      hasUser: true,
    });
  }

  render() {
    const { name, hasUser } = this.state;
    return (
      <header
        data-testid="header-component"
        className="header-container"
      >
        <div className="header-container-superior">
          <div className="logo" />
          {
            hasUser
              ? (
                <div className="user-container">
                  <div className="user" />
                  <p data-testid="header-user-name">{ name }</p>
                </div>)
              : <Loading />
          }
        </div>
        <nav className="nav-container">
          <Link
            className="link-nav"
            to="/search"
            data-testid="link-to-search"
          >
            Search
          </Link>
          <Link
            className="link-nav"
            to="/favorites"
            data-testid="link-to-favorites"
          >
            Favorites
          </Link>
          <Link
            className="link-nav"
            to="/profile"
            data-testid="link-to-profile"
          >
            Profile
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;

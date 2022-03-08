import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

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
      <header data-testid="header-component">
        <h1>HEADER COMPONENT</h1>
        <nav>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </nav>
        {
          hasUser
            ? <h2 data-testid="header-user-name">{ name }</h2>
            : <Loading />
        }
      </header>
    );
  }
}

export default Header;

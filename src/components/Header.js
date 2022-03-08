import React, { Component } from 'react';
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
        {
          hasUser
            ? <h1 data-testid="header-user-name">{ name }</h1>
            : <Loading />
        }
      </header>
    );
  }
}

export default Header;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../css/profile.css';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      user: undefined,
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    this.setState({ loading: true });

    const data = await getUser();
    this.setState({
      user: data,
      loading: false,
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <div className="profile-container col">
          {
            !loading && user
              ? (
                <>
                  <div className="profile-user-info col">
                    <img
                      src="https://www.business2community.com/wp-content/plugins/wp-user-avatars/wp-user-avatars/assets/images/mystery.jpg"
                      alt={ `Foto de ${user.name}` }
                    />
                    <p>{ user.name }</p>
                    <p>{ user.email }</p>
                    <p>{ user.description }</p>
                  </div>
                  <div className="profile-edit row">
                    <Link to="/profile/edit"> Editar Perfil </Link>
                  </div>
                </>
              )
              : <Loading />
          }
        </div>
      </div>
    );
  }
}

export default Profile;

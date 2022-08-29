import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';
import '../css/profileEdit.css';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      disableBtn: true,
      redirect: false,
      user: {
        name: undefined,
        email: undefined,
        description: undefined,
      },
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  handleChange = ({ target }) => {
    const { name: targetName, value } = target;

    this.setState((prevState) => ({
      user: { ...prevState.user, [targetName]: value },
    }), this.validateBtn);
  }

  handleClick = (event) => {
    event.preventDefault();

    this.setState({ loading: true }, async () => {
      const { user: { name, email, description } } = this.state;
      await updateUser({ name, email, description });
      this.setState({
        redirect: true,
        loading: false });
    });
  }

  getUserInfo = () => {
    this.setState({ loading: true }, async () => {
      const data = await getUser();
      const { name, email, description } = data;

      this.setState({
        user: {
          name,
          email,
          description,
        },
        loading: false,
      });
    });
  }

  validateBtn = () => {
    const { user: { name, email, description } } = this.state;
    const validateForm = name && email && description;
    this.setState({ disableBtn: !(validateForm) });
  }

  render() {
    const { loading, user, disableBtn, redirect } = this.state;
    const { name, email, description } = user;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <div className="profile-edit-container col">
          {
            !loading && user
              ? (
                <>
                  <div className="profile-edit-image">
                    <img
                      src="https://www.business2community.com/wp-content/plugins/wp-user-avatars/wp-user-avatars/assets/images/mystery.jpg"
                      alt="Foto do Perfil"
                    />
                  </div>
                  <form className="profile-edit-form col">
                    <label htmlFor="name">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={ name }
                        data-testid="edit-input-name"
                        placeholder="Nome"
                        onChange={ this.handleChange }
                      />
                    </label>

                    <label htmlFor="email">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={ email }
                        data-testid="edit-input-email"
                        placeholder="Email"
                        onChange={ this.handleChange }
                      />
                    </label>

                    <label htmlFor="description">
                      <input
                        type="text"
                        id="description"
                        name="description"
                        className="form-control"
                        value={ description }
                        data-testid="edit-input-description"
                        placeholder="Descrição"
                        onChange={ this.handleChange }
                      />
                    </label>
                    <button
                      type="submit"
                      data-testid="edit-button-save"
                      className="saveBtn"
                      disabled={ disableBtn }
                      onClick={ this.handleClick }
                    >
                      Enviar
                    </button>
                  </form>
                </>
              )
              : <Loading />
          }
        </div>
        { redirect && <Redirect exact to="/profile" /> }
      </div>
    );
  }
}

export default ProfileEdit;

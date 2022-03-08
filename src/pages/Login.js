import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      buttonState: true,
      inputName: '',
    };
  }

  // função genérica para redirecionamento usando history
  redirection = (path) => {
    const { history } = this.props;
    history.push(`/${path}`);
  }

  // função assincrona para chamar a API e priorizar os redirecionamentos
  authentication = async () => {
    const { inputName } = this.state;
    this.redirection('loading');
    await createUser({ name: inputName });
    this.redirection('search');
  }

  // funçao que monitora o input atualizado o state
  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    }, this.enableButton());
  }

  // funcao que habilita o botão condicionalmente
  enableButton = () => {
    const { inputName } = this.state;
    let validate = false;
    const min = 2;
    if (inputName.length < min) {
      validate = true;
    } else {
      validate = false;
    }
    return this.setState({ buttonState: validate });
  }

  render() {
    const { buttonState } = this.state;

    return (
      <div data-testid="page-login">
        <h1>FORM PAGE</h1>
        <form>
          <label htmlFor="input-nome">
            <input
              type="text"
              name="inputName"
              data-testid="login-name-input"
              placeholder="Nome"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            name="btn-submit"
            data-testid="login-submit-button"
            disabled={ buttonState }
            onClick={ this.authentication }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string.isRequired,
};

export default Login;

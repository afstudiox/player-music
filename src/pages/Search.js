import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      buttonState: true,
      inputName: '',
    };
  }

  // funcao que habilita o botão condicionalmente
  enableButton = () => {
    const { inputName } = this.state;
    let validate = false;
    const min = 1;
    if (inputName.length < min) {
      validate = true;
    } else {
      validate = false;
    }
    return this.setState({ buttonState: validate });
  }

  // funçao que monitora o input atualizado o state
  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    }, this.enableButton());
  }

  render() {
    const { buttonState } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>SEARCH PAGE</h1>
        <form>
          <label htmlFor="input-search">
            <input
              type="text"
              name="inputName"
              data-testid="search-artist-input"
              placeholder="Nome do Artista"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            name="btn-submit"
            data-testid="search-artist-button"
            disabled={ buttonState }
            onClick={ this.authentication }
          >
            Procurar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;

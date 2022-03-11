import React, { Component } from 'react';
import Albuns from '../components/Albuns';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import '../css/header.css';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      buttonState: true,
      inputArtist: '',
      loading: false,
      firstLoad: true,
      resultArtist: [],
      nameArtist: '',
    };
  }

  // função assincrona para chamar a API
  request = async () => {
    const { inputArtist } = this.state;
    this.setState({
      loading: true,
    });

    const result = await searchAlbumsAPI(inputArtist);
    this.setState({
      loading: false,
      resultArtist: result,
      firstLoad: false,
    });
    this.clearField();
  }

  // função que limpa o campo input
  clearField = () => {
    const { inputArtist } = this.state;
    this.setState({
      nameArtist: inputArtist,
      inputArtist: '',
    });
  }

    // funcao que habilita o botão condicionalmente
    enableButton = () => {
      const { inputArtist } = this.state;
      let validate = false;
      const min = 1;
      if (inputArtist.length < min) {
        validate = true;
      } else {
        validate = false;
      }
      return this.setState({ buttonState: validate });
    }

  renderCondiction = () => {
    const { buttonState, firstLoad, resultArtist, nameArtist } = this.state;
    if (firstLoad) {
      return (
        (
          <div className="search-form">
            <h1>SEARCH FORM</h1>
            <form>
              <label htmlFor="input-search">
                <input
                  type="text"
                  name="inputArtist"
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
                onClick={ this.request }
              >
                Procurar
              </button>
            </form>
          </div>
        )
      );
    }
    return (
      resultArtist.length !== 0
        ? (
          <div className="albuns-container">
            <h2>
              Resultado de álbuns de:
              {' '}
              { nameArtist }
            </h2>
            {resultArtist
              .map((item) => (<Albuns key={ item.collectionId } result={ item } />))}
          </div>
        )
        : (
          <div className="albuns-container">
            <p>
              Nenhum álbum foi encontrado
            </p>
          </div>
        )
    );
  }

  // funçao que monitora o input atualizado o state
  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    }, this.enableButton());
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          loading
            ? <Loading />
            : this.renderCondiction()
        }
      </div>);
  }
}

export default Search;

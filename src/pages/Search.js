import React, { Component } from 'react';
import Albuns from '../components/Albuns';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import '../css/header.css';
import '../css/search.css';

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
    return (
      resultArtist.length !== 0 || firstLoad
        ? (
          <div className="search-container col">
            <div className="search-form-container col">
              <h2>Encontre sua banda ou artista</h2>
              <form className="row">
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
                  type="submit"
                  name="btn-submit"
                  data-testid="search-artist-button"
                  disabled={ buttonState }
                  onClick={ this.request }
                >
                  Procurar
                </button>
              </form>
            </div>
            <div className="albuns-container col">
              <p>
                Resultado para :
                {' '}
                <span>{nameArtist}</span>
              </p>
              <div className="albuns-line row">
                {resultArtist
                  .map((item) => (<Albuns key={ item.collectionId } result={ item } />))}
              </div>
            </div>
          </div>
        )
        : (
          <div className="albuns-container row">
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

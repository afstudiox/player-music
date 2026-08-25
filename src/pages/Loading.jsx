import React, { Component } from 'react';
import '../css/loading.css';

class Loading extends Component {
  render() {
    return (
      <div className="loading-container">
        <div className="loading" />
      </div>
    );
  }
}

export default Loading;

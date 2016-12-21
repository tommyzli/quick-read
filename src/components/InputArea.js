import React, { Component, PropTypes } from 'react';

import '../styles/InputArea.css';

export default class InputArea extends Component {
  static propTypes = {
    boundActions: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired,
  };

  render() {
    const { boundActions, text } = this.props;
    return (
      <textarea
        className='input-area'
        cols='50'
        onChange={(event) => {boundActions.changedText(event.target.value)}}
        placeholder='Enter some text here!'
        rows='6'
        value={text}
        />
    );
  }
}

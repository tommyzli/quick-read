import { Map } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../styles/App.css';
import Actions from '../components/Actions';
import Reader from '../components/Reader';
import InputArea from '../components/InputArea';
import {
  changedText,
  changedWPM,
  play,
} from '../actions';

class App extends Component {
  static propTypes = {
    app: PropTypes.instanceOf(Map).isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  render() {
    const { app, dispatch } = this.props;

    const boundActions = bindActionCreators({
      changedText,
      changedWPM,
      play,
    }, dispatch);
    return (
      <div className="App">
        <div className="App-header">
          <h2>Quick Reader</h2>
        </div>
        <div>
          <Reader parsedText={app.get('parsedText')} wpm={app.get('wpm')} />
        </div>
        <div>
          <Actions
            boundActions={boundActions}
            wpm={app.get('wpm')}
            wpmOptions={app.get('wpmOptions')}
            />
        </div>
        <div>
          <InputArea boundActions={boundActions} text={app.get('text')} />
        </div>
      </div>
    );
  }
}

function select(state) {
  return state;
}

export default connect(select)(App);

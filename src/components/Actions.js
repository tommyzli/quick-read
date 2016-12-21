import { List } from 'immutable';
import React, { Component, PropTypes } from 'react';

import '../styles/Actions.css';

export default class Actions extends Component {
  static propTypes = {
    boundActions: PropTypes.object.isRequired,
    wpmOptions: PropTypes.instanceOf(List).isRequired,
  };

  render() {
    const { boundActions, wpmOptions } = this.props;
    return (
      <div className="actions">
        <button onClick={boundActions.play}>Start Reading</button>
        <select onChange={(event) => boundActions.changedWPM(event.target.value)}>
          {wpmOptions.map((val, index) => {
            return (
              <option key={index} value={val}>{val}</option>
            );
          })}
        </select>
      </div>
    );
  }
}

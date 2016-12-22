import { List } from 'immutable';
import React, { Component, PropTypes } from 'react';

import '../styles/Actions.css';

export default class Actions extends Component {
  static propTypes = {
    boundActions: PropTypes.object.isRequired,
    wpm: PropTypes.number.isRequired,
    wpmOptions: PropTypes.instanceOf(List).isRequired,
  };

  render() {
    const {
      boundActions,
      wpm,
      wpmOptions,
    } = this.props;

    return (
      <div className="actions">
        <button onClick={boundActions.play}>Start Reading</button>
        <select
          defaultValue={wpm}
          onChange={(event) => boundActions.changedWPM(event.target.value)}
          >
          {wpmOptions.map((val, index) => {
            return (
              <option
                key={index}
                value={val}
                >
                {val} WPM
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

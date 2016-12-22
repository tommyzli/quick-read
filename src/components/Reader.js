import { List } from 'immutable';
import React, { Component, PropTypes } from 'react';

import '../styles/Reader.css';

export default class Reader extends Component {
  static propTypes = {
    parsedText: PropTypes.instanceOf(List).isRequired,
    wpm: PropTypes.number.isRequired,
  };

  render() {
    return (
      <canvas id='reader' width='415' height='100'>
      </canvas>
    );
  }

  componentDidMount() {
    const canvas = document.getElementById('reader');
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;

    // TODO: LAYER THESE ON TOP
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, 10);
    ctx.stroke();

    ctx.moveTo(canvas.width/2, canvas.height - 10);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.parsedText === this.props.parsedText) {
      return;
    }
    const interval = this.getInterval(nextProps.wpm);
    this.playThrough(nextProps.parsedText, 0, interval, interval + 200);
  }

  getInterval(wpm) {
    // interval in ms
    return 60 / wpm * 1000;
  }

  playThrough(parsedText, index, regularInterval, pauseInterval) {

    function displayString(string) {
      const strippedString = string.replace(/\s{2,}/g," ");  // remove all punctuation
      let middleIndex = Math.floor(strippedString.length / 2);
      if (middleIndex > 0 && strippedString.length > 4) {
        middleIndex--;
      }
      const section1 = string.substring(0, middleIndex);
      const section2 = string[middleIndex];
      const section3 = string.substring(middleIndex + 1, string.length);

      const canvas = document.getElementById('reader');
      const ctx = canvas.getContext('2d');

      // clear out the canvas
      ctx.clearRect(0, 10, canvas.width, canvas.height - 11);

      const height = (canvas.height / 2) + 15;

      ctx.font = '50px Times New Roman';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'red';
      ctx.fillText(section2, canvas.width/2, height);
      ctx.fillStyle = 'black';
      ctx.textAlign = 'left';
      ctx.fillText(section1, canvas.width/2 - ctx.measureText(section1).width - ctx.measureText(section2).width + 10, height);
      ctx.textAlign = 'right';
      ctx.fillText(section3, canvas.width/2 + ctx.measureText(section3).width + ctx.measureText(section2).width - 10, height);
    }

    if (index === parsedText.size) {
      return;
    }

    const stringToDisplay = parsedText.get(index);
    let interval = regularInterval;
    if (['.', ',', '?', ';', ':'].indexOf(stringToDisplay.slice(-1)) !== -1) {
      // word ends in punctiation that causes a pause
      interval = pauseInterval;
    }

    displayString(stringToDisplay);

    setTimeout(() => {
      this.playThrough(parsedText, index + 1, regularInterval, pauseInterval);
    }, interval)
  }
}

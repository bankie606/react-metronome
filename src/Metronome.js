import React, { Component } from "react";
import "./Metronome.css";
import click1 from "./click1.wav";
import click2 from "./click2.wav";
import mtbd from "./MTbd1.wav";
import mtsd from "./MTsd1.wav";
import rtcl from "./RTclave1.WAV";
import rthhop from "./RThhop1.WAV";

class Metronome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      count: 0,
      bpm: 100,
      beatsPerMeasure: 4
    };
    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }

  handleBpmChange = event => {
    const bpm = event.target.value;

    if (this.state.playing) {
      //stop the old timer and start a new one
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

      // Set the new BPM, and reset the beat counter
      this.setState({
        count: 0,
        bpm
      });
    } else {
      //otherwise just update the bpm
      this.setState({ bpm });
    }
  };

  startStop = () => {
    if (this.state.playing) {
      //stop the timer
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      //start a timer with the current BPM
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);

      this.setState(
        {
          count: 0,
          playing: true
          //play a click "immediately" (after setState finishes)
        },
        this.playClick
      );
    }
  };

  acetoneSound = () => {
    this.click1 = new Audio(rtcl);
    this.click2 = new Audio(rthhop);
  };

  defaultSound = () => {
    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  };

  korgSound = () => {
    this.click1 = new Audio(mtsd);
    this.click2 = new Audio(mtbd);
  };

  playClick = () => {
    const { count, beatsPerMeasure } = this.state;

    // the first beat will have a different sound than the others
    if (count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }

    //keep track of which beat we're on
    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  };

  render() {
    const { playing, bpm } = this.state;

    return (
      <div className="metronome">
        <div className="bpm-slider">
          <div> {bpm} BPM </div>
          <input
            type="range"
            min="50"
            max="300"
            value={bpm}
            onChange={this.handleBpmChange}
          />
        </div>
        <button onClick={this.startStop}>{playing ? "Stop" : "Start"}</button>
        <div class="buttonGroup">
          <h3>Sound Selector</h3>
          <button onClick={this.acetoneSound}>Rhythm Tone Ace</button>
          <button onClick={this.korgSound}>Korg Monotribe</button>
          <button onClick={this.defaultSound}>Default Metronome</button>
        </div>
      </div>
    );
  }
}

export default Metronome;

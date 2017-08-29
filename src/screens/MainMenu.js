import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeScreen } from '../store/actions/screen';
import {
  SET_GENERATION_VALUES,
  SHOW_GENERATION_VALUES,
  RUN_MODEL,
  EXPORT_DATA,
} from '../store/constants';

class MainMenu extends Component {

  constructor(props) {
    super(props);
  }

  setGenValues() {
    this.props.changeScreen(SET_GENERATION_VALUES);
  }

  showGenValues() {
    this.props.changeScreen(SHOW_GENERATION_VALUES);
  }

  runModel() {
    this.props.changeScreen(RUN_MODEL);
  }

  exportData() {
    this.props.changeScreen(EXPORT_DATA);
  }

  render() {
    return (
      <div className="text-center">
        <img src="images/crest.png" className="twgsb-logo image-center" alt="TWGSB logo" height="150"/>
        <h1>TWGSB: A Population Scenario</h1>
        <h3>Main Menu</h3>
        <div className="mm-button-grid">
          <div className="button-item">
            <button className="button button-red button-block" onClick={() => this.setGenValues()}>Set the Generation 0 Values</button>
          </div>
          <div className="button-item">
            <button className="button button-red button-block" onClick={() => this.showGenValues()}>Display the Generation 0 Values</button>
          </div>
          <div className="button-item">
            <button className="button button-red button-block" onClick={() => this.runModel()}>Run the model</button>
          </div>
          <div className="button-item">
            <button className="button button-red button-block" onClick={() => this.exportData()}>Export data</button>
          </div>
        </div>
      </div>
    );
  }

};

export default connect(s=>({}), { changeScreen })(MainMenu);

import React, { Component } from 'react';
import { changeScreen } from '../store/actions/screen';
import { setValues } from '../store/actions/generationValues';
import { MAIN_MENU } from '../store/constants';
import { connect } from 'react-redux';

class SetGenerationValues extends Component {

  state = {
    errors: {},
  };

  errorMsgs = {
    noData: 'Please fill in this field.',
    tooHigh: 'Value must be between 5 and 25.',
    betweenZeroAndOne: 'Value must be between 0 and 1. Decimals allowed.',
  };

  constructor(props) {
    super(props);
  }

  processData = (sendData) => {
    console.log(sendData);
    this.props.setValues(sendData);
    this.props.changeScreen(MAIN_MENU);
  }

  _onSubmit = e => {
    e.preventDefault();
    let errors = {};
    let fieldsToCheckValid = [
      'juvenilesPopulation',
      'juvenilesSurvival',
      'adultPopulation',
      'adultSurvival',
      'senilePopulation',
      'senileSurvival',
      'birthRate',
      'newGenerations',
    ];
    let fieldsToCheckSurvivalRates = {
      juvenilesSurvival: {},
      adultSurvival: {},
      senileSurvival: {},
    };
    let sendData = {};
    fieldsToCheckValid.forEach((field, i) => {
      let value = this.refs[field].value;
      if (!value) {
        errors[field] = this.errorMsgs.noData;
      } else if (fieldsToCheckSurvivalRates[field] && (value > 1 || value < 0)) {
        errors[field] = this.errorMsgs.betweenZeroAndOne;
      } else if (value == 'newGenerations' && (value > 25 || value < 5)) {
        errors[field] = this.errorMsgs.tooHigh;
      }
      sendData[field] = value;
    });
    if (Object.keys(errors).length === 0) {
      this.processData(sendData);
    }
    this.setState({ errors });
  }

  renderError(index) {
    let error = this.state.errors[index];
    if (!error) {
      return null;
    }
    return (
      <span className="float-right form-error">{error}</span>
    );
  }

  render() {
    let { errors } = this.state;
    let { genData } = this.props.genValues;
    return (
      <form onSubmit={this._onSubmit} method="post">
        <h1>Set Generation Values</h1>
        <h4>Juveniles</h4>
        <div className="form-group">
          <label>Population number for juveniles.{this.renderError('juvenilesPopulation')}</label>
          <input type="number" className={`form-input${errors.juvenilesPopulation ? ' form-input-errored' : ''}`} defaultValue={genData.juvenilesPopulation} ref="juvenilesPopulation" autoFocus />
        </div>
        <div className="form-group">
          <label>Survival rate for juveniles.{this.renderError('juvenilesSurvival')}</label>
          <input type="number" className={`form-input${errors.juvenilesSurvival ? ' form-input-errored' : ''}`} defaultValue={genData.juvenilesSurvival} ref="juvenilesSurvival" />
        </div>
        <h4>Adults</h4>
        <div className="form-group">
          <label>Population number for adults.{this.renderError('adultPopulation')}</label>
          <input type="number" className={`form-input${errors.adultPopulation ? ' form-input-errored' : ''}`} defaultValue={genData.adultPopulation} ref="adultPopulation" />
        </div>
        <div className="form-group">
          <label>Survival rate for adults.{this.renderError('adultSurvival')}</label>
          <input type="number" className={`form-input${errors.adultSurvival ? ' form-input-errored' : ''}`} defaultValue={genData.adultSurvival} ref="adultSurvival" />
        </div>
        <h4>Seniles</h4>
        <div className="form-group">
          <label>Population number for seniles.{this.renderError('senilePopulation')}</label>
          <input type="number" className={`form-input${errors.senilePopulation ? ' form-input-errored' : ''}`} defaultValue={genData.senilePopulation} ref="senilePopulation" />
        </div>
        <div className="form-group">
          <label>Survival rate for seniles.{this.renderError('senileSurvival')}</label>
          <input type="number" className={`form-input${errors.senileSurvival ? ' form-input-errored' : ''}`} defaultValue={genData.senileSurvival} ref="senileSurvival" />
        </div>
        <h4>Other</h4>
        <div className="form-group">
          <label>Birth rate.{this.renderError('birthRate')}</label>
          <input type="number"  className={`form-input${errors.birthRate ? ' form-input-errored' : ''}`} defaultValue={genData.birthRate} ref="birthRate" />
        </div>
        <div className="form-group">
          <label>Number of new generations to model.{this.renderError('newGenerations')}</label>
          <input type="number"  className={`form-input${errors.newGenerations ? ' form-input-errored' : ''}`} defaultValue={genData.newGenerations} placeholder="Between 5 and 25" ref="newGenerations" />
        </div>
        <div className="form-group">
          <button type="submit" className="button button-red">Save Values</button>
        </div>
      </form>
    );
  }

};

const mapStateToProps = state => ({
  genValues: state.generationValues,
});

export default connect(mapStateToProps, { changeScreen, setValues })(SetGenerationValues);

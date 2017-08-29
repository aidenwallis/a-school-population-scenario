import React, { Component } from 'react';
import { changeScreen } from '../store/actions/screen';
import { MAIN_MENU } from '../store/constants';
import { connect } from 'react-redux';

class ShowGenerationValues extends Component {

  mainMenu = () => {
    this.props.changeScreen(MAIN_MENU);
  }

  render() {
    let { genData } = this.props.genValues;
    return (
      <div>
        <h1>Generation Values</h1>
        <br />
        <p><strong>Juveniles Population (in 1000s):</strong> {genData.juvenilePopulation || 'Not set'}</p>
        <p><strong>Juveniles Survival:</strong> {genData.juvenileSurvival || 'Not set'}</p>
        <br />
        <p><strong>Adults Population (in 1000s):</strong> {genData.adultPopulation || 'Not set'}</p>
        <p><strong>Adults Survival:</strong> {genData.adultSurvival || 'Not set'}</p>
        <br />
        <p><strong>Seniles Population (in 1000s):</strong> {genData.senilePopulation || 'Not set'}</p>
        <p><strong>Seniles Survival:</strong> {genData.senileSurvival || 'Not set'}</p>
        <br />
        <p><strong>Birth Rate:</strong> {genData.birthRate || 'Not set'}</p>
        <p><strong>New Generations:</strong> {genData.newGenerations || 'Not set'}</p>
        <br />
        <button type="button" className="button button-red" onClick={() => this.mainMenu()}>Back to Main Menu</button>
      </div>
    );
  }

};

const mapStateToProps = state => ({
  genValues: state.generationValues,
});

export default connect(mapStateToProps, { changeScreen })(ShowGenerationValues);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeScreen } from '../store/actions/screen';
import { MAIN_MENU } from '../store/constants';

class RunModel extends Component {

  state = {
    result: [],
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.genValues.genData.birthRate) {
      this.runModel();
    }
  }

  runModel = () => {
    let { genData } = this.props.genValues;
    let result = [{
      juveniles: parseInt(genData.juvenilesPopulation),
      adults: parseInt(genData.adultPopulation),
      seniles: parseInt(genData.senilePopulation),
    }];
    for (let i=0; i < genData.newGenerations; i++) {
      let currentJuveniles = result[i].juveniles;
      let currentAdults = result[i].adults;
      let currentSeniles = result[i].seniles;
      console.log(result[i]);
      let juveniles = currentAdults * genData.birthRate;
      let adults = currentJuveniles;
      let seniles = (currentSeniles * genData.senileSurvival) + currentAdults;
      let generationResult = {
        juveniles: juveniles,
        adults: adults,
        seniles: seniles,
      };
      result = [...result, generationResult];
    }
    this.setState({ result });
  }

  mainMenu = () => {
    this.props.changeScreen(MAIN_MENU);
  }

  render() {
    let { genData } = this.props.genValues;
    if (!genData.birthRate) {
      return (
        <div>
          <h1>Population Model</h1>
          <p>You have not yet added your values, please click on the button in the top left of the main menu to do that.</p>
          <button type="button" className="button button-red" onClick={() => this.mainMenu()}>Back to Main Menu</button>
        </div>
      );
    }
    return (
      <div>
        <h1>Population Model</h1>
        <table cellSpacing="0">
          <thead>
            <tr>
              <td>Generation</td>
              <td>Juveniles</td>
              <td>Adults</td>
              <td>Seniles</td>
              <td>Total</td>
            </tr>
          </thead>
          <tbody>
            {this.state.result.map((generation, i) => (
              <tr key={i}>
                <td>{i}</td>
                <td>{generation.juveniles}</td>
                <td>{generation.adults}</td>
                <td>{generation.seniles}</td>
                <td>{generation.juveniles + generation.adults + generation.seniles}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" className="button button-red" onClick={() => this.mainMenu()}>Back to Main Menu</button>
      </div>
    );
  }

};

const mapStateToProps = state => ({
  genValues: state.generationValues,
});

export default connect(mapStateToProps, { changeScreen })(RunModel);

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
    let dataContent = result.map((generation, i) => [
      i,
      generation.juveniles,
      generation.seniles,
      generation.juveniles + generation.adults + generation.seniles,
    ]);
    let content = [['Generation', 'Juveniles', 'Seniles', 'Total'], ...dataContent];
    console.log(content);
    let data = content.map((infoArray, i) => infoArray.join(','));
    let csvContent = data.join("\n");
    console.log(csvContent);
    this.download(csvContent, 'text/csv;encoding:utf-8');
    this.mainMenu();
  }

  download(content, mimeType = 'application/octect-stream') {

    let a = document.createElement('a');
    let filename = 'export.csv';
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(new Blob([content], {
        type: mimeType,
      }), filename);
    } else if (URL && 'download' in a) {
      a.href = URL.createObjectURL(new Blob([content], {
        mimeType: mimeType,
      }));
      a.setAttribute('download', filename);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      location.href = `data:application/octect-stream,${encodeURIComponent(content)}`;
    }
  }

  mainMenu = () => {
    this.props.changeScreen(MAIN_MENU);
  }

  render() {
    let { genData } = this.props.genValues;
    if (!genData.birthRate) {
      return (
        <div>
          <h1>Export Data</h1>
          <p>You have not yet added your values, please click on the button in the top left of the main menu to do that.</p>
          <button type="button" className="button button-red" onClick={() => this.mainMenu()}>Back to Main Menu</button>
        </div>
      );
    }
    return <p>Exporting model...</p>;
  }

};

const mapStateToProps = state => ({
  genValues: state.generationValues,
});

export default connect(mapStateToProps, { changeScreen })(RunModel);

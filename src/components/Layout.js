import React from 'react';
import { connect } from 'react-redux';

import {
  MAIN_MENU,
  SET_GENERATION_VALUES,
  SHOW_GENERATION_VALUES,
  RUN_MODEL,
  EXPORT_DATA,
} from '../store/constants';

import MainMenu from '../screens/MainMenu';
import SetGenerationValues from '../screens/SetGenerationValues';
import ShowGenerationValues from '../screens/ShowGenerationValues';
import RunModel from '../screens/RunModel';
import ExportData from '../screens/ExportData';

const Layout =  ({screen}) => {
  const renderScreen = _ => {
    switch(screen.currentScreen) {
      case MAIN_MENU:
        return <MainMenu />;
      case SET_GENERATION_VALUES:
        return <SetGenerationValues />;
      case SHOW_GENERATION_VALUES:
        return <ShowGenerationValues />;
      case RUN_MODEL:
        return <RunModel />;
      case EXPORT_DATA:
        return <ExportData />;
      default:
        return null;
    };
  };
  return (
    <div className="shell">
      {renderScreen()}
    </div>
  );
};

const mapStateToProps = state => ({
  screen: state.screen,
});

export default connect(mapStateToProps)(Layout);

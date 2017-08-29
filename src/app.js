import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import LayoutMechanism from './components/Layout';
import './app.scss';

render(<Provider store={store}><LayoutMechanism /></Provider>, document.getElementById('react-mount'));

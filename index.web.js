
import React, { Component } from 'react';
import {
    AppRegistry,
} from 'react-native';
import { injectGlobal } from 'styled-components';
import cursive from './assets/fonts/Cursive_standard.ttf';
import patrick from './assets/fonts/Patrick_Hand_SC/PatrickHandSC-Regular.ttf';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  @font-face {
    font-family: 'CursiveStandard';
    src: url(${cursive}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Patrick Hand SC';
    src: url(${patrick}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  body {
    font-family: sans-serif;
  }

`;

import App from './src/App'

export default class Lecture extends Component {
  render() {
    return (
      <App/>
    );
  }
}


AppRegistry.registerComponent('Lecture', () => Lecture);
AppRegistry.runApplication('Lecture', {
  initialProps: {},
  rootTag: document.getElementById('react-root')
});
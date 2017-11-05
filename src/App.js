import React, { Component } from 'react';
import firebase from 'firebase';

import Navigator from './js/components/navigation/Navigator';

export default class App extends Component {

  componentWillMount() {
    var config = {
      apiKey: "AIzaSyBA3jlV0MY0tFOFxkkq7mE4U_rxUAQbaEA",
      authDomain: "to-do-d7a44.firebaseapp.com",
      databaseURL: "https://to-do-d7a44.firebaseio.com",
      projectId: "to-do-d7a44",
      storageBucket: "to-do-d7a44.appspot.com",
      messagingSenderId: "1014137598000"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <Navigator />
      // <Drawer ref={(ref) => { this.drawer = ref }} content={<Sidebar navigator={this.navigator} />}
      //   onClose={() => this.closeDrawer()}>

      // </Drawer>
    );
  }
}

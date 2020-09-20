import React, {Component} from 'react';
import $ from 'jquery'
import firebase from 'firebase'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Redirect} from 'react-router';
// impoer app,base from 'rebase'
import '../Css/App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      user:{}
    }
  }

  componentDidMount(){

  }

  render(){
    return (
      <div className="App">
       <header> 
        <p> Insta Gram </p> 
      </header>
      </div>
    );
  }
}

export default App;

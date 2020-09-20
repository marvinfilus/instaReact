import React, {Component} from 'react';
import $ from 'jquery'
import firebase from 'firebase'
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

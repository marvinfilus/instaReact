import React, {Component} from 'react';
import $ from 'jquery'
import firebase from 'firebase'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import {Redirect} from 'react-router';
import {app,base} from './rebase';
import '../Css/App.css';
import Header from './Header';
import Home from './Home';
import Login from './Login';

class App extends Component {
  constructor(){
    super()
    this.state = {
      createdUser:{},
      user:{}
    }
  }

  componentDidMount(){
    const that = this;
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
       this.setState({ user: {email: user.email, uid:user.uid, postedImg:[]}});
        // console.log(this.state)
        if (Object.keys(this.state.createdUser).length > 0){
          base.update(`users/${user.uid}`,{
            data: {...this.state.createdUser , uid : user.uid}
          })
        }
        base.fetch(`users/${user.uid}`,{
          context:this,
          asArray:false,
          then(data){
            console.log(data);
            this.setState({user: {...data}});
            // console.log(this.state)
          }
        })
      }
    });

  }

  createUser(data){
    this.setState({createdUser:{...data}})
    console.log(data);
    let email = data.email;
    let password = data.pass;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('code' + errorCode, 'message' + errorMessage);
    });
  }

  logIn(data){
    let email = data.email;
    let password = data.pass;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }

  logOut(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

  render(){
    return (
      <Router>
          <div className="App">
            <Header logOut={this.logOut.bind(this)}/>
            <Route exact path="/" render={({match}) => (this.state.user.uid ? (<Redirect to={`/${this.state.user.uid}`}/>):(<Login logIn={this.logIn.bind(this)} createUser={this.createUser.bind(this)}/> ))} />
            <Route path ="/:uid" render={({match}) => <Home user={this.state.user} id={match.params.uid}/> } />
          </div>
      </Router>
    );
  }
}

export default App;

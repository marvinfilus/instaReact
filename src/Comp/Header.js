import React, {Component} from 'react';
import $ from 'jquery'
import firebase from 'firebase'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Redirect} from 'react-router';
import {app,base} from './rebase';
import '../Css/header.css';

class Header extends Component {

	logOut(){
    	firebase.auth().signOut().then(function() {
    	}).catch(function(error) {
    	});
    }

	render(){
		return(
			<div className="Header-div">
				<nav className="nav-header">
					<ul className="ul-Header">
						<img className="" src="#" />
						<li className="Header-li">Home</li>
						<li className="Header-li">Main</li>
						<li className="Header-li">About</li>
						<li className="Header-li">Settings</li>
					<li className="Header-li" onClick={this.logOut.bind(this)}> <Link to="/">Log Out</Link> </li>
					</ul>
				</nav>
			</div>
		)
	}
}


export default Header

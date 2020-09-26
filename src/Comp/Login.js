import React, {Component} from 'react';
import $ from 'jquery'
import firebase from 'firebase'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Redirect} from 'react-router';
import '../Css/login.css'

class Login extends Component {
	constructor(){
		super()
		this.state = {

		}
	}

	componentDidMount(){
		const that = this;
		$('.signin-card-form').hide();
		$('.signin-card-div').hide();
		$('.hide-login').on('click',function(){
			$('.login-card-form').hide();
			$('.signin-card-form').show();
		});
		$('.hide-signin').on('click',function(){
			$('.login-card-form').show();
			$('.signin-card-form').hide();
		});
		$('.submit-signin-button').on('click',function(){
			let user = that.refs.user.value;
			let pass = that.refs.pass1.value;
			let pass2 = that.refs.pass2.value;
			console.log(user ,pass, pass2)
			if( user && pass === pass2){
				$('.card-container-div').css('flex-direction', 'row');
				$('.card-container-div').css('justify-content', 'space-around');
				$('.signin-card-div').show();
			}
		})
	}

	logIn(e){
		e.preventDefault();
		let email = this.refs.userL.value;
		let pass = this.refs.passL.value;
		let data = "";
		if (email && pass ) {
			data = {email,pass}
			this.props.logIn(data)
		}
	}

	signIn(e){
		e.preventDefault();
		let email = this.refs.user.value;
		let pass = this.refs.pass1.value;
		let pass2 = this.refs.pass2.value;
		let fname = this.refs.fname.value;
		let lname = this.refs.lname.value;
		let birth = this.refs.birth.value;
		let data = {};
		console.log(email,pass, pass2);

		if(email && pass && pass2 && fname && lname && birth ){
			data =  {email,pass,fname,lname,birth};
			this.props.createUser(data);
		}
	}

	render(){
		return(
			<div className="div-login">
				<div className="card-container-div">
					<div className="card-div">
						<form className="login-card-form card-form-login" onSubmit={this.logIn.bind(this)}>
							<header className="card-form-header">
								<h1> Log In </h1>
							</header>
							<div className="card-form-div">
								<p>Username</p>
								<input className="card-user-input" type='text' ref="userL" name="username"/>
							</div>
							<div className="card-form-div">
								<p> Password </p>
								<input className="card-pass-input" type='password' ref="passL" name="password"/>
							</div>
							<div className="submit-button-div">
								<button className="submit-signin-button">Submit </button>
							</div>
							<div className="social-auth-div">
								<div className="social-auth-card">
									<button className="social-auth-button">Facebook</button>
								</div>
								<div className="social-auth-card">
									<button className="social-auth-button">Google</button>
								</div>
							</div>
							<div>
								<button className="hide-login"> Click here to sign in for the first time </button>
							</div>
						</form>
						<form className="signin-card-form card-form-login" onSubmit={this.signIn.bind(this)}>
							<header className="card-form-header">
								<h1> Sign In </h1>
							</header>
							<div className="card-form-div">
								<p>Username</p>
								<input className="card-user-input" type='text' ref="user" name="username"/>
							</div>
							<div className="card-form-div">
								<p> Password </p>
								<input className="card-pass-input" type='password' ref="pass1" name="password"/>
							</div>
							<div className="card-form-div">
								<p> Please confirm your password </p>
								<input className="card-pass2-input" type='password' ref="pass2" name="password"/>
							</div>
							<div className="submit-button-div">
								<button className="submit-signin-button">Submit </button>
							</div>
							<div className="social-auth-div">
								<div className="social-auth-card">
									<button className="social-auth-button">Facebook</button>
								</div>
								<div className="social-auth-card">
									<button className="social-auth-button">Google</button>
								</div>
							</div>
							<div>
								<button className="hide-signin"> Click here to log in </button>
							</div>
						</form>
					</div>
					<div className="card-div signin-card-div">
						<form className="first-time">
							<div className=" fname-div signin-info">
								<h2> First Name</h2>
								<input className="fname-input signin-input" type="text" ref="fname" name="fname"/>
							</div>
							<div className=" lname-div signin-info">
								<h2> Last Name</h2>
								<input className="lname-input signin-input" type="text" ref="lname" name="fname"/>
							</div>
							<div className=" birth-div signin-info">
								<h2> Birthdate</h2>
								<input className="birth-input signin-input" type="text" ref="birth" name="fname"/>
							</div>
							<div>
								<button className="create-account" onClick={this.signIn.bind(this)}> Create your account </button>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default Login
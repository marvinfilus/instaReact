import React, {Component} from 'react';
import $ from 'jquery';
import {app,base} from './rebase';
import firebase from 'firebase';
import '../Css/img.css';


class ImgPost extends Component{
	constructor(){
		super();
		this.state = {
			pic:"",
			user : {}
		}
	}

	componentDidUpdate(){

	}

	componentDidMount(){
		console.log(this.props)
		let string = String(this.props.img.downloadURL);
		console.log(string)
		this.setState({ pic:string})
		console.log(this.state);
	}

	render(){
		// console.log(this.state)
		return(
			<div className="div-hm">
				<img className="image-post" src={this.state.pic} />
			</div>
		)
	}
}

export default ImgPost
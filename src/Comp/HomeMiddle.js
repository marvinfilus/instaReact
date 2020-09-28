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
		// console.log(this.props)
		// let string = String(this.props.img.downloadURL);
		// console.log(string)
		// this.setState({ 
		// 	pic:string,
		// 	user:this.props.img
		// })
		// console.log(this.state);
	}

	componentDidMount(){
		// this.stateSet.bind(this);
			console.log(this.props)
		let string = String(this.props.img.downloadURL);
		console.log(string)
		this.setState({ 
			pic:string,
			user:this.props.img
		})
		console.log(this.state);
	}

	stateSet = () => {
			console.log(this.props)
		let string = String(this.props.img.downloadURL);
		console.log(string)
		this.setState({ 
			pic:string,
			user:this.props.img
		})
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
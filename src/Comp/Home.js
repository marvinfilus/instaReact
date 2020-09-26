import React, {Component} from 'react';
import $ from 'jquery';
import {app,base} from './rebase';
import firebase from 'firebase'
import '../Css/home.css'
import '../Css/img.css'
import Header from './Header';
import ImgPost from './HomeMiddle';


const that = this;



class Home extends Component {
	constructor(){
		super()
		this.state = {
			profilePic:"",
			profilePicImg:"",
			postedImg:[],
			updated:false,
			user:{}
		}
	}
	

	componentDidMount = (props) => {
		const that = this;
		let profilePicImg = this.state.profilePicImg;
		that.setUser();
		if(profilePicImg === ""){
			that.profileInfo();
			// console.log('hello')
			var storageRef = firebase.storage().ref();
			let profile = storageRef.child('/profile/');
			// var uploadTask = profile.put('../img/profilepic.jpg');
		}
		if(that.state.profilePic === ""){
			that.getImage();
		} else{
			// console.log(that.state)
		}

	}

	componentDidUpdate(){
		// console.log(this.state.user);

		if(this.state.updated === false){
			this.setUser();
			this.setState({ updated : true});
			// console.log(this.state)
		}
		var user = firebase.auth().currentUser;
		if (user) {
		  // console.log(user.uid);
		  
		} else {
		  // No user is signed in.
		}
		// console.log(this.state)
	}

	clickImg = (event) => {
		this.click.click();
	}

	getImage(){
		var storageRef = firebase.storage().ref();
		let uid = this.state.user.uid;
		console.log(uid)
		let yiiRef = storageRef.child('yii-ah.jpg');
		yiiRef.getDownloadURL().then(function(url) {
			let string = String(url)
			// console.log(string);
				base.update(`users/${uid}/pictures/`,{
					profilePic:string
				})
				this.setState({ profilePic:url});
				// console.log(this.state.profilePic)
			}).catch(function(error) {

			  // A full list of error codes is available at
			  // https://firebase.google.com/docs/storage/web/handle-errors
			  switch (error.code) {
			    case 'storage/object-not-found':
			      // File doesn't exist
			      console.log(error.code);
			      break;

			    case 'storage/unauthorized':
			      // User doesn't have permission to access the object
			      console.log(error.code);
			      break;

			    case 'storage/canceled':
			      // User canceled the upload
			      console.log(error.code);
			      break;

			    case 'storage/unknown':
			      // Unknown error occurred, inspect the server response
			      console.log(error.code);
			      break;
			  }
			});
	}

	img = () =>{
		
	}

	profileInfo = () => {
		console.log('hello');
		var storageRef = firebase.storage()
		let profile = storageRef.ref('profile/profilepic.jpg');
		profile.getDownloadURL().then((downloadURL)=>{
		this.setState({ profilePicImg:downloadURL});
			// console.log(downloadURL);
		})
	}


	setUser = () => {
		var user = firebase.auth().currentUser;
		if (user) {
		  console.log(user.uid);
		  base.fetch(`users/${user.uid}`,{
		  	context:this,
		  	asArray:false,
		  	then(data){
		  		// console.log(data);
		  		for (var i = 0; i < data.postedImg.length; i++) {
					data.postedImg[i].id = [i];
					console.log(data.postedImg[i])
				}
		  		this.setState({
		  			user:{...data},
		  			profilePic:data.profilePic,
		  			postedImg:data.postedImg
		  		});
		  	}
		  })
		} else {
		  // No user is signed in.
		}
	}
		uploadFile = (event) => {
		const that = this;
	    var input = event.target;
	    let file = input.files[0];
	    var storageRef = firebase.storage().ref();
		let profilePic = storageRef.child('profilePic');
		var metadata = {
		  contentType: 'image/jpeg'
		};
		// Upload file and metadata to the object 'images/mountains.jpg'
		var uploadTask = profilePic.child('images/' + file.name).put(file);
		// Listen for state changes, errors, and completion of the upload.
		uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
		  (snapshot) =>  {
		  	let that = this;
		  	console.log(that.state)
		    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
		    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		    console.log('Upload is ' + progress + '% done');
		    switch (snapshot.state) {
		      case firebase.storage.TaskState.PAUSED: // or 'paused'
		        console.log('Upload is paused');
		        break;
		      case firebase.storage.TaskState.RUNNING: // or 'running'
		        console.log('Upload is running');
		        break;
		    }
		  }, function(error) {
		  switch (error.code) {
		    case 'storage/unauthorized':
		      // User doesn't have permission to access the object
		      break;
		    case 'storage/canceled':
		      // User canceled the upload
		      break;
		    case 'storage/unknown':
		      // Unknown error occurred, inspect error.serverResponse
		      break;
		  }
		}, () => {
			let that = this;
			let uid = this.state.user.uid;
			let posted = this.state.postedImg;
			// console.log(that.state)
		  // Upload completed successfully, now we can get the download URL
			uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
				that.setState({ profilePic: downloadURL});
				base.update(`users/${uid}`,{
					data : {
						profilePic: downloadURL
					}
				})
	    		console.log(that.state);
    		});
		});
	}

	uploadPost = (event) => {
		var input = event.target;
		let name = this.name.value;
		let location = this.location.value;
		let description = this.description.value;
	    let file = input.files[0];
	    var storageRef = firebase.storage().ref();
		let postedPic = storageRef.child('postedPic');
		var metadata = {contentType: 'image/jpeg'};
		// Upload file and metadata to the object 'images/mountains.jpg'
		var uploadTask = postedPic.child('images/' + file.name).put(file);
		// Listen for state changes, errors, and completion of the upload.
		uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
		  (snapshot) =>  {
		  	let that = this;
		  	// console.log(that.state)
		    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
		    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		    console.log('Upload is ' + progress + '% done');
		    switch (snapshot.state) {
		      case firebase.storage.TaskState.PAUSED: // or 'paused'
		        console.log('Upload is paused');
		        break;
		      case firebase.storage.TaskState.RUNNING: // or 'running'
		        console.log('Upload is running');
		        break;
		    }
		  }, function(error) {
		  switch (error.code) {
		    case 'storage/unauthorized':
		      // User doesn't have permission to access the object
		      break;
		    case 'storage/canceled':
		      // User canceled the upload
		      break;
		    case 'storage/unknown':
		      // Unknown error occurred, inspect error.serverResponse
		      break;
		  }
		}, () => {
			let that = this;
			let uid = this.state.user.uid;
			let posted = this.state.postedImg;
			console.log(that.state)
		  // Upload completed successfully, now we can get the download URL
			uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>  {
				let postedO = {name,location,description, file, downloadURL}
				posted.push(postedO);
				that.setState({ postedImg:posted});
				// console.log(posted)

				base.update(`users/${uid}`,{
					data : {
						postedImg: posted
					}
				})
	    		// console.log(that.state);
    		});
		});
	}

	render(){

		let user = this.state.user;
		let postedImg = this.state.postedImg;
		return (
			<div className="container-home">
				<nav className="nav-home">
					<ul>
						<li className=""> hello</li>
						<li className=""> hello</li>
						<li className=""> hello</li>
						<li className=""> hello</li>
					</ul>
				</nav>
				<section className="section-home">
					<header className="user-info-header">
						<div className="header-div-home"> 
							<img className="img" src={this.state.profilePic}/>
							<div className="change-profile-pic"> 
								<input type="file" className="file-id" name="file_name" accept=".jpg, .png, .jpeg" ref={(c)=> this.click = c} onChange={this.uploadFile.bind(this)}/>
								<img className="profilepicimg" src={this.state.profilePicImg} onClick={this.clickImg.bind(this)}/>
							</div>
						</div>
					</header>
					<div className="middle-div-home">
						<p> Name </p>
						<input type="text" className="postName" name="postName" ref={(c)=> this.name = c}/>
						<br/>
						<p> Location </p>
						<input type="text" className="postLocation" name="postLocation" ref={(c)=> this.location = c}/>
						<br/>
						<p> Description </p>
						<textarea type="text" className="postDescription" name="postDescription" ref={(c)=> this.description = c}/>
						<br/>
						<input type='file' className="post-file" name="post-file" accept=" .jpg, .png,.jpeg " onChange={this.uploadPost.bind(this)} />
						<div className="Imgpost">
							{postedImg.map((img) => {
								return <ImgPost key={img.id} img={img} />
							})}
						</div>
					</div>
				</section>
			</div>
		)
	}
}

export default Home
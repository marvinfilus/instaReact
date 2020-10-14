import React, {Component} from 'react';
import $ from 'jquery';
import {app,base} from './rebase';
import firebase from 'firebase'
import '../Css/home.css'
import '../Css/img.css'
import Header from './Header';
import ImgPost from './Imgpost';
import PicAdd from './PicAdd';

class Home extends Component {
	constructor(){
		super()
		this.state = {
			previewPic:{downloadURL:""},
			profilePic:"",
			profilePicImg:"",
			postedImg:[],
      show:false,
			updated:false,
			user:{}
		}
	}

	componentDidMount = (props) => {
		const that = this;
    let posted = that.state.postedImg;
    console.log(posted)
		let profilePicImg = this.state.profilePicImg;
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // console.log(user)
      base.fetch(`users/${user.uid}`,{
        context:this,
        asArray:false,
        then(data){
          // console.log(data);
          if(data.postedImg){ that.setState({ postedImg: data.postedImg})} else { that.setState({postedImg:[]}) }
          that.setState({
      			profilePic:data.profilePic,
            user: {...data}
          });
        }
      })
        console.log(that.state);
    } else {
      // No user is signed in.
    }
  })

    $('.post-info-div').hide();
    $('.add-photo').on('click', ()=> {
      $('.post-info-div').show();
    });
    $('.add-post').on('click',()=>{
      $('.post-info-div').hide();
    })

		  // base.fetch(`users/${this.state.user.uid}`,{
		  // 	context:this,
		  // 	asArray:false,
		  // 	then(data){
		  // 		console.log(data);
      //
			//   		this.setState({
			//   			user:{...data},
			//   			profilePic:data.profilePic,
			//   			postedImg:data.postedImg
			//   		});
		  // 		}
		  // 	})

		// if(profilePicImg === ""){
		// 	that.profileInfo();
		// }
		// if(this.state.profilePic === ""){
		// 	that.getImage();
		// }
	}

	// componentDidUpdate(){
	// 	// console.log(this.state.user);
  //
	// 	if(this.state.updated === false){
	// 		this.setUser();
	// 		this.setState({ updated : true});
	// 		// console.log(this.state)
	// 	}
  //
	// 	// console.log(this.state)
	// }

  addPost = () => {
    let post = this.state.previewPic;
    let uid = this.state.user.uid;
    let posted = this.state.postedImg;
    posted.push(post);

    if(post !== {}){
      this.setState({ postedImg:posted , previewPic : {downloadURL: "#"} });
      console.log(posted)
      base.update(`users/${uid}`,{
        data : {
          postedImg: posted
        }
      });
      // console.log(document.getElementsByClassName('post-info-div'))

    }
  }

  delPost= () => {
    let post = this.state.previewPic;
    let uid = this.state.user.uid;
    console.log(post);
    this.setState({ previewPic : {downloadURL: "#"} })
  }

  clicked = () => {
    this.setState({ show : true })

  }

	clickImg = (event) => {
		this.click.click();
	}

	getImage =() => {
		var storageRef = firebase.storage().ref();
		let uid = this.state.uid;
		console.log(this.state.uid)
		let profilePic = storageRef.child(uid);
		profilePic.child('profilePic/' + 'profilePic').getDownloadURL().then((url)=> {
			let string = String(url)
			this.setState({ profilePic:string});
			console.log(this.state.profilePic)
			console.log(string);
				base.update(`users/${uid}/pictures/`,{
					profilePic:string
				})

			}).catch(function(error) {
			  switch (error.code) {
			    case 'storage/object-not-found':
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

	previewFile = (event) => {
		let file = URL.createObjectURL(event.target.files[0])
	    // var image = document.getElementById('output');
	    console.log(String(file))
		this.setState({ previewFile: file});
		console.log(this.state.previewFile)
	}

	profileInfo = () => {
		console.log('hello');
		let uid = this.state.uid;
		var storageRef = firebase.storage()
		let profile = storageRef.ref('profilePic');
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
		  		console.log(data);
		  		this.setState({ user : {...data}})
		  		if(data.postedImg){
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
		  	}
		  })
		} else {
		  // No user is signed in.
		}
	}
		uploadProfile = (event) => {
		const that = this;
		let uid = this.state.user.uid;
	    var input = event.target;
	    let file = input.files[0];
	    var storageRef = firebase.storage().ref();
		let profilePic = storageRef.child(uid );
		console.log(uid)
		var metadata = {
		  contentType: 'image/jpeg'
		};
		// Upload file and metadata to the object 'images/mountains.jpg'
		var uploadTask = profilePic.child('profilePic/' + 'profilePic').put(file);
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
		      			      console.log(error.code);

		      break;
		    case 'storage/canceled':
		      // User canceled the upload
			      console.log(error.code);

		      break;
		    case 'storage/unknown':
		      // Unknown error occurred, inspect error.serverResponse
			      console.log(error.code);

		      break;
		  }
		}, () => {
			let that = this;
			let uid = this.state.user.uid;
			let posted = this.state.postedImg;
			// console.log(that.state)
		  // Upload completed successfully, now we can get the download URL
			uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
				console.log(downloadURL)
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
		let uid = this.state.user.uid;
		let name = this.name.value;
		let location = this.location.value;
		let description = this.description.value;
	    let file = input.files[0];
	    console.log(uid)
	    var storageRef = firebase.storage().ref();
		let postedPic = storageRef.child(uid);
		console.log(uid);
		// Upload file and metadata to the object 'images/mountains.jpg'
		var uploadTask = postedPic.child('posts/' + file.name).put(file);
    console.log(file.name);
		// Listen for state changes, errors, and completion of the upload.
		uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
		  (snapshot) =>  {

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
			console.log(that.state);
		  // Upload completed successfully, now we can get the download URL
			uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>  {
				let postedO = {name,location,description, file, downloadURL}
        this.setState({ previewPic : postedO})
			// this.postPic(postedO);
	    		console.log(that.state);
	    		name = "";
	    		location = "";
	    		description = "";
    		});
		});
	}


	render(){
    let user = this.state.user;
		let postedImg = this.state.postedImg;
    let show = this.state.show;
    let previewPic = this.state.previewPic;
		return (
			<div className="container-home">
				<section className="section-home">
					<header className="user-info-header">
						<div className="header-div-home">
							<img className="img" src={this.state.profilePic}/>
							<div className="change-profile-pic">
								<input type="file" className="file-id" name="file_name" accept=".jpg, .png, .jpeg" ref={(c)=> this.click = c} onChange={this.uploadProfile.bind(this)}/>
								<img className="profilepicimg" src={this.state.profilePicImg} onClick={this.clickImg.bind(this)}/>
							</div>
						</div>
					</header>
					<div className="middle-div-home">
            <div className="post-info-div">
							<div className="post-info ">
                <p> Name of Picture </p>
                <input type="text" className="postName" name="postName" ref={(c)=> this.name = c} />
                <p> Location Of Picture </p>
                <input type="text" className="postLocation" name="postLocation" ref={(c)=> this.location = c} />
                <p> Description Of Picture </p>
                <textarea type="text" className="postDescription" name="postDescription" ref={(c)=> this.description = c}/>
                <input type='file' className="post-file" name="post-file" accept=" .jpg, .png,.jpeg " onChange={this.uploadPost.bind(this)} />
              </div>
              <div className="preview-div">
                {previewPic ? (<p> {previewPic.location}</p> ) : null }
                <img src={previewPic.downloadURL} className="preview-pic" alt="Preview Image"/>
                {previewPic ? (<p> {previewPic.name}</p> ) : null }
                {previewPic ? (<p> {previewPic.description}</p> ) : null }
                <button className="add-post" onClick={this.addPost} > Add Post </button>
                <button className="delete-post" onClick={this.delPost}> Delete Post </button>
              </div>
						</div>
						<button className="add-photo" onClick={this.clicked.bind(this)}> Add New Photo </button>
						<div className="Imgpost">
							{ postedImg ? (postedImg.map((img) => {
								return <ImgPost key={img.id} img={img} />
							})) : null }
						</div>
					</div>
				</section>
			</div>
		)
	}
}

export default Home

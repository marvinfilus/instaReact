import React ,{Component} from 'react';

class PicAdd extends Component {
  constructor(){
    super();
    this.state = {

    }
  }
  componentDidMount(){}

  render(){
    return(
      <div>
        <p> Name of Picture </p>
        <input type="text" className="postName" name="postName" ref={(c)=> this.name = c} />
        <p> Location Of Picture </p>
        <input type="text" className="postLocation" name="postLocation" ref={(c)=> this.location = c} />
        <p> Description Of Picture </p>
        <textarea type="text" className="postDescription" name="postDescription" ref={(c)=> this.description = c}/>
        <input type='file' className="post-file" name="post-file" accept=" .jpg, .png,.jpeg " onChange={this.uploadPost.bind(this)} />
      </div>
    )
  }
}

export default PicAdd

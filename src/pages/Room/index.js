import React, { Component } from 'react';
import Sidebar from '../../common/Sidebar';
import { StreamChat } from 'stream-chat';
import { Link } from 'react-router-dom';

var url_string = window.location.href;
 var urls = new URL(url_string);
 var tokens = urls.searchParams.get("streamtoken");
 var userid = urls.searchParams.get("uname");
var userMainid = urls.searchParams.get("uid");


class Room extends Component {
  constructor() {
  super()

  this.state = {
    tokendata : "",
    users : [],
    roomName : "",
    invite : "",
    firstMessage : "",
    dropdowndata : "",
    error : {},
    selectedOption: null,
    value: [],
    images: [],
    imageUrls: [],
    message: '',
    newUrl:"",
    imagek: "",
    list: [],
    val:[],
    selected: [],
    values:'',
    totallengthval : "",
   };

    
}

componentDidMount() {

const id = this.props.location.search;
this.setState({tokendata:id})
}


  render() {

    return (
       <div className="container-fluid" style={{background: "#263b66" , color : "#fff"}}>  
          <div className="row" style={{background: "#263b66"}}>
            <div className="col-md-3">
              <Sidebar history={this.props.history} />
            </div>
            <div className="col-md-9 mx-auto" style={{height : "800px"}}>
         
            <br/>
            <h2><b>Chat Room One</b></h2>
            <br/>
            <ul style={{listStyle : "none"}}>
             <li><h5><b>1. We believe</b> in personal rights and freedom.</h5> </li>
             <br/>
             <li><h5><b>2. This space</b> is for sharing winning trades and investing strategies, and yes to speak your mind.</h5> </li>
             <br/>
             <li><h5><b>3. The app</b> was designed to help anyone make money and beat the market. So, as long as you don’t stand in the way of that ... we are good to go.</h5> </li>
            </ul>
             <br/>
              <Link to={`/sendbirdchat`}>
                 <input type="button" value="Enter Room" className="nav-link"/>
              </Link>
               <br></br>
             
          </div>
          </div>
        </div>
    )
  }
}

export default Room  
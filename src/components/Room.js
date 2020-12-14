import React, { Component }  from 'react';
import { Chat, Channel, ChannelList, Window } from 'stream-chat-react';
import { ChannelHeader, MessageList } from 'stream-chat-react';
import { MessageInput, Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import Select from 'react-select';
import ImageUploader from 'react-images-upload';
import MultiSelect from "@khanacademy/react-multi-select";

import 'stream-chat-react/dist/css/index.css';
import axios from 'axios';

const BASE_URL = '';



var url_string = window.location.href;
 var urls = new URL(url_string);
 var tokens = urls.searchParams.get("streamtoken");
 var userid = urls.searchParams.get("uname");
var userMainid = urls.searchParams.get("uid");

const chatClient = new StreamChat('g8yfg5w2yd32');
const userToken = tokens;
// alert(userToken);

if(userToken){
  chatClient.setUser(
  {
    id: userid,
    name: userid,
    image: 'https://apis.tradetipsapp.com/api/appUser/getImageByAppUserId?appUserId='+userMainid
  },
  userToken,
)
} else {


}


// const filters = {};
//your room
// .equal("invite", to:"accepted") | .equal("created_by_id", to: User.current.id)
//invite
//(.equal("type", to: "mentorprivate") & .equal("invite", to:"pending"))
//(.equal("type", to: "mentorpublic") & .notIn("members", [User.current.id]))
//public
//equal("type", to: "public")
// const sort = { last_message_at: -1 };
// const channels = chatClient.queryChannels(filters, sort);
// console.log(channels);

const filters = { members: { $nin: [userid] }};

const response = chatClient.queryUsers(filters);


// const response = chatClient.queryUsers({ name: { $autocomplete: 'pan' } });

// console.log(response[0]);

// var p = Promise.resolve([response]);
// p.then(function(v) {
//   console.log(v); // 1
// });


// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ];

const options = response.users;

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


   this.onChange = this.onChange.bind(this)
   this.onSubmit = this.onSubmit.bind(this)
   // this.handleChange = this.handleChange.bind(this)
  
}

// handleChange(e) {
//         //this.setState({value: event.option});
//         this.setState({value: Array.from(e.target.selectedOptions, (item) => item.value)});
//     }


 onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
   }


    selectImages = (e) => {
    let images = []
    for (var i = 0; i < e.target.files.length; i++) {
    images[i] = e.target.files.item(i);
    }
    images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
    let message = `${images.length} valid image(s) selected`
    this.setState({ images, message })
    }

    uploadImages = () => {
    const uploaders = this.state.images.map(image => {
    const data = new FormData();
    data.append("image", image, image.name);
    // Make an AJAX upload request using Axios
    // alert(data);
    return axios.post('http://admin.tradetipsapp.com:5555/upload', data)
    .then(response => {
    // alert(JSON.stringify(response));
    // alert(response.data.imageUrls);
    this.setState({
    imageUrls: [ response.data.imageUrl, ...this.state.imageUrls ]
    });
    })
    });

    axios.all(uploaders).then(() => {
    console.log('done');
    }).catch(err => alert(err.message));
    }

  onSubmit(e) {
     e.preventDefault();

    // console.log(response);

    const filters = { members: { $nin: [userid] }};

    const response = chatClient.queryUsers(filters);

    var promise = Promise.resolve(response); 

    var data = [];
    var roomName  = this.state.roomName;
    // alert(roomName);
    var invite = this.state.selected;
    // alert(invite);
   
     promise.then(function(val) { 

       // alert(val.users.length);

    var selectedlength = invite.length;
    // alert(selectedlength);

    var totallength = val.users.length - 1;
    // alert(totallength);
    // var msg = this.state.firstMessage;
    // alert(msg);
    var data = invite;
    // alert(userid);
    // alert([userid]);
    // var finvite = invite + "," + userid;
    var finvite = invite;
    // alert(finvite);
    var randomNo = new Date().getTime();
    // alert(randomNo);
    // var imagedata = this.state.images;
    // alert(imagedata);
    // var filenames = Array.from(imagedata).map(function(f) {
    // return f.name;
    //  });
    // alert(filenames);

    // var newUrl = "http://admin.tradetipsapp.com:5555/uploads/consults/"+filenames;
    // var imagek = this.state.imageUrls;
    // alert(imagek);
    // const response = await channel.sendMessage({
    //     text: 'Check out what I have uploaded in parallel',
    //     attachments,
    // });

    // expect(response.message.attachments).to.equal(attachments);


    if(selectedlength == totallength){

     // const text = msg;

    const conversation = chatClient.channel("mentorpublic", 'test'+randomNo , {
    name: roomName,
    image: 'http://bit.ly/2O35mws'

    // image: newUrl,
    // text
    });

    conversation.create();

    // console.log(conversation);

// const channel = chatClient.channel('mentorpublic', 'test'+randomNo, {
//     name: roomName,
// });

// const response = channel.create();

// const text = msg;
// const message = {
//     text,
//     user: {id: "aditi", name: "Aditi"},
// }

// channel.sendMessage(message);
                    
//  console.log(channel);   
    // const channel = chatClient.channel('mentorpublic', 'test'+randomNo, {
    //   // image: 'https://cdn.chrisshort.net/testing-certificate-chains-in-go/GOPHER_MIC_DROP.png',
    //   name: roomName,
    //   // attachments: newUrl,
    //   // text: message,
    // });

    //   channel.watch();

    //   return channel;

    // const attachments = [{
    //   url:  newUrl,
    //   image: newUrl,
    // }];

    // const msg = channel.sendMessage({
    //   text: message,
    //   attachments: attachments,
    // });

    // return msg ;

    // console.log(channel);

     // alert(conversation);

     alert("Room created successfully..Public Channel created !!");
      
     // window.location.reload();

     document.getElementById("datamodel").style.display = "none";
 


    } else {

    // const filters = { members: { $nin: [userid] }};

    // const response = chatClient.queryUsers(filters);

    // var promise = Promise.resolve(response); 
  
    //  promise.then(function(val) { 

    //   var newinvite = [];

    //   for (var i = 0; i < val.users.length; i++) {

    //     // console.log(val.users[i].id);

    //      // alert(val.users[i].id);

    //       newinvite.push(val.users[i].id);

    //     }


    const invited = chatClient.channel("mentorprivate", 'trans'+randomNo , {
    name: roomName,
    members: finvite,
    invites: invite
    });

    invited.create();

        
     alert("Room created successfully..Invitation sent !!");

     document.getElementById("datamodel").style.display = "none";


     // });
      
    }

      
      });


  }  


componentDidMount() {

// document.title = 'Content Page | DBC'
const id = this.props.location.search;
this.setState({tokendata:id })

var promise = Promise.resolve(response);

     promise.then(val => {
       
       var newres = val.users;

       var users = [];

      for (var i = 0; i < newres.length; i++) {    

       if (newres[i].name != userid) {

         users.push({ "label" : newres[i].name, "value" : newres[i].name });

       } else {

       }
             
     }
     this.setState({
       values: users
     })



     });

      
      // Create and append the options
      

      // alert(users);

     //   this.setState({
     //    value: users
     // })



//     var select = document.getElementById("mySelect");
// select.onchange = function(){
//     var selectedString = select.options[select.selectedIndex].value;
//     alert(selectedString);
//     // document.getElementById('selectedval').value=selectedString;
//     document.getElementById("selectedval").value = selectedString;

// }

 // }); 

 
}




  render() {

    const {selected} = this.state;
    // alert(selected)

    return (
    <div className="container-fluid" style={{background: "#263b66" , color : "#fff"}}>  
          <div className="row" style={{background: "#263b66"}}>
            <div className="col-md-3">
              <nav id="sidebar" className="sidebar-wrapper" style={{marginTop : "-8px" , marginLeft : "-15px"}}>
                <div className="sidebar-content">
                   <div className="sidebar-menu">
                      <ul style={{background: "#202842",height: "100%" , width : "300px" , fontSize : "larger" , position : "fixed"}}>
                       <li className="sidebar-dropdown" style={{padding: "10px", display: "inherit"}}>
                          
                            &nbsp;
                            <h1 style={{color: "white"}}><b>TradeTips</b></h1>
                                      
                        </li>
                        <li class="sidebar-dropdown" style={{padding: "10px" , display: "inherit"}}>
                          <a href={`/home${this.state.tokendata}`}>
                            &nbsp;
                            <span style={{color: "white"}}><b>Dashboard</b></span>
                          </a>              
                        </li>            
                        <li style={{padding: "10px", display: "inherit"}}>
                          <a href={`/tip${this.state.tokendata}`}>
                           &nbsp;
                            <span style={{color: "white"}}><b>Make a Tip</b></span>
                          </a>
                        </li>
                        <li style={{padding: "10px", display: "inherit"}}>
                          <a href={`/room${this.state.tokendata}`}>
                           &nbsp;
                            <span style={{color: "white"}}><b>Chat Managment</b></span>
                          </a>
                        </li>
                        <li style={{padding: "10px", display: "inherit"}}>
                          <a href="/">
                           &nbsp;
                            <span style={{color: "white"}}><b>Logout</b></span>
                          </a>
                        </li>
                     </ul>
                   </div>
                </div>
              </nav>
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
              <a href={`/chatmanage${this.state.tokendata}`}>
                 <input type="button" value="Enter Room" className="nav-link"/>
              </a>
               <br></br>
              <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content" id="datamodel">
                   <form noValidate onSubmit={this.onSubmit} method="post">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Create Room</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">

                     <div class="form-group">
                       <label for="email">Room Name:</label>
                       <input type="text" class="form-control" name="roomName" placeholder="Enter room"
                         value={this.state.roomName} onChange={(event) => { this.setState({ roomName: event.target.value })}} />
                     </div>

                     <div class="form-group">
                       <label for="email">Select User:</label>
                     <MultiSelect options={this.state.values} selected={selected} onChange={this.handleChange} onSelectedChanged={selected => this.setState({selected})} />              
                     </div>
                    </div>
                    
                    <div class="modal-footer">
                      <button type="reset" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="submit" class="btn btn-primary">Save changes</button>
                    </div>
                   </form>
                  </div>
                <div className="row col-lg-12">
                  { 
                  this.state.imageUrls.map((url, i) => (
                  <div className="col-lg-2" key={i}>
                  <img src={BASE_URL + url} className="img-rounded img-responsive"
                  alt="not available"/><br/>
                  </div>
                  ))
                  }
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Room  
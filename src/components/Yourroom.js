import React, { Component }  from 'react';
import { Chat, Channel, ChannelList, Window } from 'stream-chat-react';
import { ChannelHeader, MessageList } from 'stream-chat-react';
import { MessageInput, Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import MultiSelect from "@khanacademy/react-multi-select";

import 'stream-chat-react/dist/css/index.css';

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

//your room
// (filter: .notEqual("type", to: "public") & (.equal("invite", to:"accepted") | .equal("created_by_id", to: User.current.id)))



const filters = {
   "type": { $ne: "public" },
    $and : [
        { $or : [ { "invite" : "accepted" }, { "created_by_id" : userid } ] }
    ]
};
const sort = { last_message_at: -1 };
const channels = chatClient.queryChannels(filters,sort);
console.log(channels);

 class Yourroom extends Component {
  constructor() {
  super()

   this.state = {
    tokendata : "",
    users : [],
    roomName : "",
    invite : "",
    dropdowndata : "",
    error : {},
    selectedOption: null,
    value: [],
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


     alert("Room created successfully..Public Channel created !!");
      

     document.getElementById("datamodel").style.display = "none";
 


    } else {

  

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
this.setState({tokendata:id})
// console.log(id, 'hgffgh')

const filters = { members: { $nin: [userid] }};

const response = chatClient.queryUsers(filters);

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

}


  render() {

      const {selected} = this.state;

    return (
    <div className="container-fluid">  
        <h1 className="text-center make" style={{background: "#007bff",color: "white"}}>TradeTips</h1>        
          <div className="row">
          <div className="col-md-3">
    <nav id="sidebar" class="sidebar-wrapper">
      <div class="sidebar-content">
         <div class="sidebar-menu">
           <ul style={{background: "#007bff",height: "600px"}}>
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
          <div className="col-md-9 mx-auto">
              <nav className="navbar navbar-expand-lg ">
        <div className="collapse navbar-collapse justify-content-md-left"
            id="navbarsExample10">        
          <ul className="navbar-nav">
           <li className="nav-item">
              <a href={`/room${this.state.tokendata}`} className="nav-link">
                Public Room
              </a>
            </li>
            <li className="nav-item active" style={{background: "#007bff"}}>
               <a href={`/yourroom${this.state.tokendata}`} className="nav-link" style={{color: "#fff"}}>
                Your Rooms
              </a>
            </li>
            <li className="nav-item">
              <a href={`/invite${this.state.tokendata}`} className="nav-link">
                Invitation
              </a>
            </li>
            <li className="nav-item">
            <a href={`#`} className="nav-link" data-toggle="modal" data-target="#exampleModal">
                Create Room
            </a>
            </li>
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
               
                </div>
              </div>
          </ul>
        </div>
      </nav>
  <Chat client={chatClient} theme={'messaging light'}>
    <ChannelList filters={filters}
    />
    <Channel>
      <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
      </Window>
      <Thread />
    </Channel>
  </Chat>

          </div>
        </div>
      </div>
    )
  }
}

export default Yourroom  
import React, { Component }  from 'react';
import { Chat, Channel, ChannelList, Window } from 'stream-chat-react';
import { ChannelHeader, MessageList } from 'stream-chat-react';
import { MessageInput, Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import MultiSelect from "@khanacademy/react-multi-select";
import { AnyResource, AnyRole, Allow, Deny} from 'stream-chat';


import 'stream-chat-react/dist/css/index.css';

var url_string = window.location.href;
var urls = new URL(url_string);
var tokens = urls.searchParams.get("streamtoken");
var userid = urls.searchParams.get("uname");
var userMainid =  urls.searchParams.get("uid");


const chatClient = new StreamChat('g8yfg5w2yd32');
// const userToken = tokens;
// alert(userToken);
var userStramData = urls.searchParams.get("streamdatatoken");
// alert(userStramData);
const userToken = userStramData;


if(userToken){
  chatClient.setUser(
  {
    id: userMainid,
    name: userid,
    role: 'channel_member', 
    image: 'https://apis.tradetipsapp.com/api/appUser/getImageByAppUserId?appUserId='+userMainid
  },
  userToken,
)
} else {


}


const filters = { type: 'public'};
const sort = { last_message_at: -1 };

 const channels = chatClient.queryChannels('messaging', 'godevs' , filters, sort );

 console.log(channels);


//your room
// .equal("invite", to:"accepted") | .equal("created_by_id", to: User.current.id)
//invite
//(.equal("type", to: "mentorprivate") & .equal("invite", to:"pending"))
//(.equal("type", to: "mentorpublic") & .notIn("members", [User.current.id]))
//public
//equal("type", to: "public")

// const conversation = chatClient.channel('public', 'test', {
//     name: 'General',
//     image: 'http://bit.ly/2O35mws'
// });

// conversation.create();

// const invite = chatClient.channel('mentorprivate', 'awesome-chat', {
//     name: 'Chating Group',
//     members: ['kratika', 'aditi' , 'govinda'],
//     invites: ['govinda'],
// });

// invite.create();

// console.log(invite);

 class ChatManage extends Component {
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

    const conversation = chatClient.channel("mentorAll", 'test'+randomNo , {
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
    // console.log(this.props.location.search);

      const {selected} = this.state;

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
          <div className="col-md-9 mx-auto">

           <div className="row" style={{marginTop : "20px" , overflow : "hidden"}}>
          

  <Chat client={chatClient} theme={'messaging light'}>

    <ChannelList
      filters={filters}
      sort={sort}
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
      </div>
    )
  }
}

export default ChatManage  
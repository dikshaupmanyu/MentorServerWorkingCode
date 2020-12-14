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
var tokensdata = urls.searchParams.get("tokendata");

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


const filters = { members: { $nin: [userid] }};

const response = chatClient.queryUsers(filters);


// const response = chatClient.queryUsers({ name: { $autocomplete: 'pan' } });

// console.log(response[0]);


// const options = response.users;

console.log(response);

 class ChatSetting extends Component {
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
    values:[],
    totallengthval : "",
   };


   // this.onChange = this.onChange.bind(this)
   // this.onSubmit = this.onSubmit.bind(this)
   // this.handleChange = this.handleChange.bind(this)
  
}


 

componentDidMount() {




// document.title = 'Content Page | DBC'
const id = this.props.location.search;
this.setState({tokendata:id })

var promise = Promise.resolve(response);

     promise.then(val => {
       
       var newres = val.users;

        // alert(JSON.stringify(newres));

       var users = [];

      for (var i = 0; i < newres.length; i++) {    

      

         users.push({ "role" : newres[i].role, "banned" : newres[i].banned , "id" : newres[i].id });

             
     }

      // alert(JSON.stringify(users));

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

 handleResult = e => { 
      // alert(e);


let data = chatClient.banUser('govinda', {
    timeout: 60,
    reason: 'Banned for one hour',
});

  console.log(data);
 //  const banned = chatClient.queryUsers({ id: 'akash' , banned: true });


 //  alert(banned);

 //  const updateResponse = chatClient.updateUsers([{ 
 //    id: 'akash', 
 //    banned: true
 // }]);

 //  alert(updateResponse);


     //    var myHeaders = new Headers();
     //    myHeaders.append("Authorization", `Bearer ${tokensdata}`);

     //    var formdata = new FormData();
     //    formdata.append("tipId", e);

     //    var requestOptions = {
     //      method: 'POST',
     //      headers: myHeaders,
     //      body: formdata,
     //      redirect: 'follow'
     //    };


     //  fetch("https://apis.tradetipsapp.com/api/tipFeature/tipUnPinForUser", requestOptions)
     //  .then(response => response.json())
     //  .then(result => {

     //    // alert(JSON.stringify(result));

     //     window.location.reload();

     // });




  }




  render() {

    const {selected} = this.state;
    // alert(selected)

    return (
    <div className="container-fluid" style={{background: "#263b66" , color : "#fff"}}>  
          <div className="row" style={{background: "#263b66"}}>
            <div className="col-md-3">
              <nav id="sidebar" className="sidebar-wrapper" style={{marginTop : "-8px"}}>
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
            {
                          userid == "seano" ?
                        <li style={{padding: "10px", display: "inherit"}}>
                          <a href={`/chatsetting${this.state.tokendata}`}>
                           &nbsp;
                            <span style={{color: "white"}}><b>Chat Settings</b></span>
                          </a>
                        </li>
                        :  userid == "JakeCatskill" ?
                         <li style={{padding: "10px", display: "inherit"}}>
                          <a href={`/chatsetting${this.state.tokendata}`}>
                           &nbsp;
                            <span style={{color: "white"}}><b>Chat Settings</b></span>
                          </a>
                        </li>
                        : null
                        }

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
            <h2><b>User List</b></h2>
            <br/>
            <table class="table" style={{color: "white"}}>
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Role</th>
      <th scope="col">Username</th>
      <th scope="col">Banned Status</th>
    </tr>
  </thead>
  <tbody>

   {this.state.values.map((itemd, i) =>

    <tr>
      <th scope="row">{i + 1}</th>
      <td>{itemd.role}</td>
      <td>{itemd.id}</td>
      {
        itemd.banned == false ?

        <td><button onClick={this.handleResult.bind(this, itemd.id)}>False</button></td> :

        <td><button onClick={this.handleResult.bind(this, itemd.id)}>True</button></td>

      }
      
    </tr>
    )}
  </tbody>
</table>
          </div>
        </div>
      </div>
    )
  }
}

export default ChatSetting  
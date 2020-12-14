import React, { Component } from 'react';
import Sidebar from '../../common/Sidebar';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelList, Window } from 'stream-chat-react';
import { ChannelHeader, MessageList } from 'stream-chat-react';
import { MessageInput, Thread } from 'stream-chat-react';
import { AnyResource, AnyRole, Allow, Deny} from 'stream-chat';
import 'stream-chat-react/dist/css/index.css';

const chatClient = new StreamChat('g8yfg5w2yd32');
const storageData = localStorage.getItem('allTokenData');
let filters = [];

if(storageData){
  const parsedStorageData = JSON.parse(storageData);
  console.log('===========parsedStorageData==============', parsedStorageData);

  if (parsedStorageData.streamtoken) {

    //alert(parsedStorageData.streamtoken);

    chatClient.setUser(
      {
        id: parsedStorageData.uname,
        name: '',
        image: 'https://getstream.io/random_svg/?id=holy-mud-2&name=Holy+mud'
      },
      parsedStorageData.streamtoken,
    );

 
    filters = { type: 'public' };


    const sort = { last_message_at: -1 };

     const channels = chatClient.queryChannels('messaging', 'godevs' , filters, sort );

   // console.log(channels);


  //  filters = { members: { $in: [parsedStorageData.uname] } };
 

}

}

const sort = { last_message_at: -1 };
const channels = chatClient.queryChannels(filters, sort);


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
    )
  }
}

export default ChatManage  
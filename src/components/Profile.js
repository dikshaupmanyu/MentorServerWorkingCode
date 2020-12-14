import React, { Component }  from 'react';
import { Chat, Channel, ChannelList, Window } from 'stream-chat-react';
import { ChannelHeader, MessageList } from 'stream-chat-react';
import { MessageInput, Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';

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
    name: '',
    image: 'https://getstream.io/random_svg/?id=holy-mud-2&name=Holy+mud'
  },
  userToken,
)
} else {


}

const filters = { members: { $in: [userid] } };

// const filters = { type: 'public'};
const sort = { last_message_at: -1 };
const channels = chatClient.queryChannels(filters, sort);

const Profile = () => (
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
);

export default Profile; 
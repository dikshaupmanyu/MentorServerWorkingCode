import React, { Component } from 'react';
import Sidebar from '../../common/Sidebar';
import axios from 'axios';
import { SendBirdAction } from './SendBirdAction';
import { SendBirdConnection } from './SendBirdConnection';
import { timestampToTime } from './utils';
import ImageUploader from 'react-images-upload';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';


const screenHeight = window.innerHeight;

const sb = new SendBirdAction();

class SendbirdChat extends Component {
    constructor(props) {
      super(props)
      this.state = {
        isLoading: true,
        user: {},
        tokendata: "",
        channelList: [],
        messageList: [],
        storageData: {},
        message: '',
        channel: '',
        scrollTop: 0,
        selectedMessageId: '',
        scrollToBottomHeight: '',
        //resData : [],
      }
      this.onImageDrop = this.onImageDrop.bind(this);
      this.myRef = React.createRef();
      this.onDateEnter = this.onDateEnter.bind(this);
    }

    onScroll = () => {
      this.messagesEnd = null;
      const scrollTop = this.myRef.current.scrollTop;
      if (scrollTop < 10) {
        this._connectSendbird();
      }
    }

    componentDidMount() {
      const sData = localStorage.getItem('allTokenData');
      if (sData !== null) {
        this.setState({
            storageData: JSON.parse(sData),
            scrollToBottomHeight: this.myRef.current.scrollHeight
        }, () => {
          this._connectSendbird();
          this.scrollToBottom();
        })
      }
    }

    componentDidUpdate () {
      this.scrollToBottom();
    }

    scrollToBottom = () => {
      this.myRef.current.scrollTop = this.state.scrollToBottomHeight;
    }

    _connectSendbird = () => {
      sb.connect(this.state.storageData.uname, this.state.storageData.uname).then(user => {
        this._getOpenChannelList();
      });
    }

    _getOpenChannelList(isInit = false, urlKeyword = '') {
      if (urlKeyword !== this.searchKeyword) {
        this.searchKeyword = urlKeyword;
        isInit = true;
      }
 
      SendBirdAction.getInstance()
        .getOpenChannelList(isInit, urlKeyword)
        .then(openChannelList => {
          this.setState({
            channel: openChannelList[0]
          }, () => {
            SendBirdAction.getInstance()
            .getMessageList(openChannelList[0])
            .then(msgList => {
              console.log('++++++++msgList+++++++', msgList);
              this.setState({
                messageList: [...msgList, ...this.state.messageList],
              })
            });
          })
        });
    }

    handleMessageChange = event => {
      this.setState({
        message: event.target.value,
        scrollToBottomHeight: this.myRef.current.scrollHeight
      })
    }

    sendMessage = () => {
      if(this.state.message != ""){
        axios({
          method: 'POST',
          headers: {
            'Api-Token': '71c717ba89d6ff310f997f7f731c87db2901364d'
          },
          url: 'https://api-30ac907b-4526-46cc-884f-14880440ca82.sendbird.com/v3/open_channels/TradeTipsPublicTest/messages',
          data: {
            channel: this.state.channel,
            user_id: this.state.storageData.uname,
            message: this.state.message
          }
        }).then(response => {
          console.log(response.data);
          let resData = {
            messageId: response.data.message_id,
            _sender: {
              nickname: response.data.user.nickname
            },
            message: response.data.message,
            createdAt: response.data.created_at,
          }
          console.log(this.state.messageList);
           //this._getOpenChannelList();
           console.log(resData);
           //let fdata = this.state.messageList.push(resData);
           //console.log(fdata);
          this.setState({
            messageList: [...this.state.messageList, resData],
            message: ''
          })
        }, (error) => {
          console.log(error);
        });
      } else {
        alert("Message not send Empty")
      } 
    }

    onImageDrop(picture) {
      const sendFile = picture[0];
      var formdata = new FormData();
      formdata.append("message_type", "File");
      formdata.append("user_id", this.state.storageData.uname);
      formdata.append("file", sendFile);
        var requestOptions = {
        method: 'POST',
        headers: {
                'Api-Token': '71c717ba89d6ff310f997f7f731c87db2901364d'
              },
        body: formdata,
        redirect: 'follow'
      };

      fetch(`https://api-30ac907b-4526-46cc-884f-14880440ca82.sendbird.com/v3/open_channels/TradeTipsPublicTest/messages`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result) {
          console.log(result);
          let resData = {
            messageId: result.message_id,
            _sender: {
              nickname: result.user.nickname
            },
            url: result.file.url,
            createdAt: result.created_at,
          }
          this.setState({
            messageList: [...this.state.messageList, resData],
            message: ''
          })
        }
      });
    }

    onDateEnter = message => {
      this.setState({
        selectedMessageId: message.messageId
      })
    }

    onDateLeave = message => {
      this.setState({
        selectedMessageId: ''
      })
    }

    deleteMessage = () => {
      confirmAlert({
        title: 'Please Confirm',
        message: 'Are you sure to do delete this?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              axios({
                method: 'DELETE',
                headers: {
                  'Api-Token': '71c717ba89d6ff310f997f7f731c87db2901364d'
                },
                url: `https://api-30ac907b-4526-46cc-884f-14880440ca82.sendbird.com/v3/open_channels/TradeTipsPublicTest/messages/${this.state.selectedMessageId}`,
              }).then(response => {
                console.log(response.data);
              }, (error) => {
                console.log(error);
              });
            }
          },
          {
            label: 'No',
          }
        ]
      })
    }

    render() {
      return (
          <div className="container-fluid" style={{background: "#263b66" , color : "#fff"}}>  
             <div className="row" style={{background: "#263b66"}}>
                  <div className="col-md-3">
                      <Sidebar history={this.props.history} />
                  </div>
                  <div className="col-md-9 mx-auto" style={{height : "650px"}}>
                    <div class="chat-main-root" style={{border: '0.5px solid #898989'}}>
                      <div class="chat-main">
                        <div class="chat-body"
                          ref={this.myRef}
                          onScroll={this.onScroll}
                        >
                          {this.state.messageList.length > 0 && this.state.messageList.map((message, key) => {
                            return (
                              <div id={message.messageId} class="chat-message" data-req-id={message.messageId} key={key}>
                                <div class="message-content">
                                  <div class="message-nickname">
                                    { message._sender.nickname} :
                                  </div>
                                  {message.name &&
                                    <div class="message-content is-file">
                                      { message.name}
                                    </div>
                                  }
                                  {message.message &&
                                    <div class="message-content">
                                      {` ${message.message}`}
                                    </div>
                                  }
                                  <div class="time">
                                    {timestampToTime(message.createdAt)}
                                  </div>
                                  {/* {(message.messageId !== this.state.selectedMessageId) ? 
                                    <div class="time" onMouseEnter={() => this.onDateEnter(message)} onMouseLeave={() => this.onDateLeave(message)}>
                                      {timestampToTime(message.createdAt)}
                                    </div>
                                  :
                                    <div class="time" onClick={() => this.deleteMessage()} onMouseEnter={() => this.onDateEnter(message)} onMouseLeave={() => this.onDateLeave(message)}>
                                      Delete
                                    </div>
                                  } */}
                                  {message.url &&
                                    <div class="image-content">
                                      <img class="image-render" src={message.url} />
                                    </div>
                                  }
                                </div>
                              </div>
                            )
                          })}
                          <div style={{ float:"left", clear: "both" }}
                              ref={(el) => { this.messagesEnd = el; }}>
                          </div>
                        </div>

                        <div class="chat-input">
                          <div class="typing-field"></div>
                          <label class="input-file">
                            <ImageUploader
                              withIcon={true}
                              withLabel={false}
                              onChange={this.onImageDrop}
                              imgExtension={['.jpg', '.gif', '.png', '.gif']}
                              maxFileSize={5242880}
                              singleImage={true}
                            />
                          </label>
                          <div class="input-text">
                            <textarea
                              class="input-text-area"
                              placeholder="Type a message ..."
                              value={this.state.message}
                              onChange={this.handleMessageChange} required="required"
                            />
                            <button onClick={this.sendMessage}>Send</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
      )
  }
}

export default SendbirdChat;


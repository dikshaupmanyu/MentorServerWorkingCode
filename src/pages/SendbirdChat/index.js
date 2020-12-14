import React, { Component } from 'react';
import Sidebar from '../../common/Sidebar';
import axios from 'axios';
import { SendBirdAction } from './SendBirdAction';
import { SendBirdConnection } from './SendBirdConnection';
import { timestampToTime } from './utils';
import ImageUploader from 'react-images-upload';

const screenHeight = window.innerHeight;

const sb = new SendBirdAction();
// const chat = new Chat();

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
        scrollTop: 0
      }
      this.onImageDrop = this.onImageDrop.bind(this);
      this.myRef = React.createRef();
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
        }, () => {
          this._connectSendbird();
        })
      }
    }

    componentDidUpdate () {
      this.scrollToBottom();
    }

    scrollToBottom = () => {
      this.messagesEnd.scrollIntoView({block: "end"})
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

    goToChannel = channel => {
      SendBirdAction.getInstance()
      .getMessageList(channel)
      .then(messageList => {
        console.log('++++++++++++++++messageList++++++++++++++++++', messageList);
      });
    }

    handleMessageChange = event => {
      this.setState({
        message: event.target.value
      })
    }

    sendMessage = () => {
      SendBirdAction.getInstance().sendUserMessage({
        channel: this.state.channel,
        message: this.state.message,
        handler: (messageData, error) => {
          this.setState({
            messageList: [...this.state.messageList, messageData],
            message: ''
          })
        }
      });
    }

    onImageDrop(picture) {
      const sendFile = picture[0];
      if (sendFile) {
        const tempMessage = SendBirdAction.getInstance().sendFileMessage({
          channel: this.state.channel,
          file: sendFile,
          handler: (message, error) => {
            this.setState({
              messageList: [...this.state.messageList, message]
            })
          }
        });
      }
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
                              <div id={message.messageId} class="chat-message" data-req-id={message.messageId}>
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
                                  {message.plainUrl &&
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
                              placeholder="Write a chat..." 
                              value={this.state.message} 
                              onChange={this.handleMessageChange}
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
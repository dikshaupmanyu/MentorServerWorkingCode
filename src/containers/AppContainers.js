import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Landing from '../pages/Landing';
// import Profile from './components/Profile';
import Home from '../pages/Home';
import Tip from '../pages/Tip';
import ChatManage from '../pages/ChatManage';
// import Yourroom from './components/Yourroom';
// import Invite from './components/Invite';
import Room from '../pages/Room';
import SendbirdChat from '../pages/SendbirdChat';
// import ChatSetting from './components/ChatSetting';

class AppContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            user: {},
            tokendata: ""
        }
    }

    componentWillMount() {
        const storageData = localStorage.getItem('allTokenData');
        if (storageData !== null) {
            const parsedStorageData = JSON.parse(storageData);
            this.setState({
                tokendata: parsedStorageData.tokendata,
                isLoading: false
            })
        } else {
            this.setState({
                isLoading: false
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.isLoading &&
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/login" component={Landing} />
                            <Route exact path="/home" component={Home} {...this.props}/>
                            <Route exact path="/tip" component={Tip} {...this.props}/>
                            <Route exact path="/room" component={Room} {...this.props}/>
                            <Route exact path="/chatmanage" component={ChatManage} {...this.props}/>
                            <Route exact path="/sendbirdchat" component={SendbirdChat} {...this.props}/>
                            <Route exact path="/">
                                {this.state.tokendata ? 
                                    <Redirect to="/home" />
                                : 
                                    <Redirect to="/login" />
                                }
                            </Route>
                        </Switch>
                    </BrowserRouter>
                }
            </div>
        )
    }
}

export default AppContainer;
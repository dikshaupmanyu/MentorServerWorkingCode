import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


class Sidebar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
        }
    }

    logoutUser = () => {
        localStorage.clear();
        this.props.history.push(`/login`);
    }

    render() {
        return (
            <nav id="sidebar" className="sidebar-wrapper" style={{marginTop : "-8px" , marginLeft : "-15px"}}>
                <div className="sidebar-content">
                    <div className="sidebar-menu">
                        <ul style={{background: "#202842",height: "100%" , width : "300px" , fontSize : "larger" , position : "fixed"}}>
                            <li className="sidebar-dropdown" style={{padding: "10px", display: "inherit"}}>
                                <h1 style={{color: "white"}}><b>TradeTips</b></h1>
                            </li>
                            <li className="sidebar-dropdown" style={{padding: "10px", display: "inherit"}}>
                                <Link to={`/home`}>
                                    <span style={{color: "white"}}><b>Dashboard</b></span>
                                </Link>              
                            </li>            
                            <li style={{padding: "10px", display: "inherit"}}>
                                <Link to={`/tip`}>
                                    <span style={{color: "white"}}><b>Make a Tip</b></span>
                                </Link>
                            </li>
                            <li style={{padding: "10px", display: "inherit"}}>
                                <Link to={`/room`}>
                                    <span style={{color: "white"}}><b>Sendbird Chat</b></span>
                                </Link>
                            </li>
                            <li style={{padding: "10px", display: "inherit"}}>
                                <a onClick={this.logoutUser}>
                                    <span style={{color: "white"}}><b>Logout</b></span>
                                </a>
                            </li>
                           
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Sidebar;
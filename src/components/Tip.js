import React, { Component } from 'react'

var FormData = require('form-data');
var url_string = window.location.href;
var urls = new URL(url_string);
var tokens = urls.searchParams.get("accessToken");
var tokensdata = urls.searchParams.get("tokendata");
var userid = urls.searchParams.get("uname");
var userMainid = urls.searchParams.get("uid");


class Tip extends Component {
  constructor() {
  super()

   this.state = {
    tokendata : ""
   };
    
}

componentDidMount() {

const id = this.props.location.search;
this.setState({tokendata:id})
}


  render() {

    return (
       <div className="container-fluid" style={{background: "#263b66"}}>  
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
            <div id="my-div">            
             <iframe width="800" height="600" src={`https://admin.tradetipsapp.com:5555/addMentor${this.state.tokendata}`} id="my-iframe" scrolling="yes"></iframe>
           </div>
           </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Tip  
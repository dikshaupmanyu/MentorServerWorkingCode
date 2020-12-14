import React, {Input, PureComponent, Fragment, Component,useState, useEffect } from 'react';
import datalink from 'react';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import Player from './player';
import HomeTwo from './HomeTwo';
import Stock from './Stock';

import 'bootstrap/dist/css/bootstrap.min.css';

var FormData = require('form-data');
var url_string = window.location.href;
var urls = new URL(url_string);
var tokens = urls.searchParams.get("accessToken");
var tokensdata = urls.searchParams.get("tokendata");
var userid = urls.searchParams.get("uname");
var userMainid = urls.searchParams.get("uid");
var userStramData = urls.searchParams.get("streamdatatoken");
// alert(userStramData);

  class Home extends Component {
    constructor() {
      super()
      this.state = {
          contacts: [],
          tokendata : "",
          tokensdata : "",
          list: [],
          stocklist: null,
          dataaa : [],
          tipval : [],
          show : true
      };    
    }

    async demaoFun(){

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${tokensdata}`);

      var formdata = new FormData();
      formdata.append("offset", "0");
      formdata.append("limit", "100");

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      const responseone = await fetch("https://apis.tradetipsapp.com/api/tip/getAllTipFeaturePaginationForUser", requestOptions)
     
      const responsetwo = await responseone.json();
       
        if(responsetwo.length >= 0){

          this.setState({ contacts: responsetwo })

        } else {

          this.setState({contacts: null })
        }

        const id = this.props.location.search;

      this.setState({tokendata:id})

    }

    componentDidMount() {

      this.demaoFun();
     
    }

    afun = () =>{
     
      this.demaoFun();

    }

    render() {

      const a = null

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

                     <li className="sidebar-dropdown" style={{padding: "10px", display: "inherit"}}>
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
   
            <div className="col-md-9">

              <div className="row" style={{marginTop : "20px" , overflow : "hidden"}}>

                <div className="col-md-7" style={{overflowY: "none" , height: "100%" }}>

                  {

                    this.state.contacts ?
                 
                      <div>

                        {
                         
                          this.state.contacts.filter(person => person.entryPoint != 0).map((item, i) =>                  
                           
                            <HomeTwo item={item} afun ={this.afun} />
                           
                        )}

                      </div>

                    :<div className="card text-white mb-3 testtoo">
                      <div className="card-header">
                      </div>
                      <div className="card-body" style={{padding:"4px"}}>
                        <h5 style={{color : "black"}}>No Data Found</h5>
                      </div>
                    </div>

                  }            

                </div>      
             
                <div className="col-md-5">
                 
                  <div className="container-fluid">

                      <span><Player /></span>

                      <div className="card heading" style={{background: "#263b66" , color : "white" , border : "none"}}>

                        <table>
                          <td className="nname">Company Name</td>
                          <td>Price</td>
                          <td>Change</td>
                        </table>
                       
                      </div>


                    <Stock />
                 
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        )

      }

  }

export default Home
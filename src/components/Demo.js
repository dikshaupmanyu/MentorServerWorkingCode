import React, {Input, PureComponent, Fragment, Component, useState, useEffect } from 'react';
import datalink from 'react';
import axios from 'axios';
import Model from './Model';
import { Button, Modal } from 'react-bootstrap';
import { MDBIcon } from "mdbreact";
import 'bootstrap/dist/css/bootstrap.min.css';

var FormData = require('form-data');
var url_string = window.location.href;
var urls = new URL(url_string);
var tokens = urls.searchParams.get("accessToken");
var tokensdata = urls.searchParams.get("tokendata");
var userid = urls.searchParams.get("uname");


  class Demo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tokendata : "",
            tokensdata : "",
            selectedTeam: "",
            list: [],
            stocklist: null,
            stocklistF : [],
            showHide : false,
            name: null,
            item: this.props.item,
            stocklistitmedetail:null
        };    
    }

    async componentDidMount() {

      if(this.state.item){

        var myHeaders = new Headers();
        myHeaders.append("Cookie", "ctoken=dd44d368ddc944ddb0cf27de108f0e56");

        var myHeaders1 = new Headers();
        myHeaders1.append("Authorization", `Bearer ${tokensdata}`);    

        var requestOp = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        let usersdata = [];

        var formdata = new FormData();
        formdata.append("stockSymbol", this.state.item.stockSymbol);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders1,
          body: formdata,
          redirect: 'follow'
        };

        const responseone = await fetch(`https://cloud.iexapis.com/stable/stock/market/batch?types=quote&token=pk_dd324da3fb5f4428a47b05ab12f23ce2&symbols=${this.state.item.stockSymbol}`, requestOp);
        // console.log(responseone);   
        const responsetwo = await responseone.json();
   
       if(responsetwo){

          this.setState({

            stocklistitmedetail: responsetwo[this.state.item.stockSymbol].quote,

          })  

        }

      }

    }

    async delete(id){
       
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${tokensdata}`);

      var formdata = new FormData();
      formdata.append("stockId", id);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      var deletedata = await fetch("https://apis.tradetipsapp.com/api/stockDetail/deleteStock", requestOptions)

      var deletedatatwo = await deletedata.json();

      if(deletedatatwo[0].status == true){

       
        window.location.reload(false);

      } else {

        alert("Something went wrong")

      }

    }

    render() {

      const {item} = this.props;

      return(

        item?<div className="card" style={{marginBottom :"20px"}}>
 
            <div className="table-responsive">
           
              <table className="table main">
                <thead>
                  <tr>
                    <td>{item.stockSymbol}</td>
                    <td></td>
                   
                    <td><a style={{marginLeft :"80px"}} onClick={() => this.delete(item.id)}><MDBIcon far icon="trash-alt" /></a></td>
                  </tr>
                </thead>
                  {
                    this.state.stocklistitmedetail?<tbody>
                      <tr>
                        <td className="tableone">{this.state.stocklistitmedetail.companyName}</td>
                        <td className="tabletwo"><span>$</span>{parseFloat(this.state.stocklistitmedetail.latestPrice).toFixed(2)}</td>          
                          {
                            this.state.stocklistitmedetail.change > 0 ?
                            <td className="tablethree green"><span>{(this.state.stocklistitmedetail.change).toFixed(2)}</span><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
                              <path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8 3.707 5.354 6.354a.5.5 0 1 1-.708-.708l3-3z"/>
                              </svg>
                            </td> :
                            <td className="tablefour red">{Math.abs(this.state.stocklistitmedetail.change).toFixed(2)}<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" d="M4.646 9.646a.5.5 0 0 1 .708 0L8 12.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"/>
                              <path fill-rule="evenodd" d="M8 2.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V3a.5.5 0 0 1 .5-.5z"/>
                              </svg>
                            </td>
                          }  
                      </tr>        
                 </tbody>:null}

              </table>

            </div>

          </div>:null

        )

    }

}              


export default Demo


///////////////////////////////////////////////////////////////////////////////////////
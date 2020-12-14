import React, {Input, PureComponent, Fragment, Component, useState, useEffect } from 'react';
import datalink from 'react';
import Demo from './Demo';
import { Button, Modal } from 'react-bootstrap';
import { MDBIcon } from "mdbreact";
import 'bootstrap/dist/css/bootstrap.min.css';

var FormData = require('form-data');
var url_string = window.location.href;
var urls = new URL(url_string);
var tokens = urls.searchParams.get("accessToken");
var tokensdata = urls.searchParams.get("tokendata");
var userid = urls.searchParams.get("uname");

  class Stock extends Component {
    constructor() {
      super()
        this.state = {
          tokendata : "",
          tokensdata : "",
          contacts: [],
          list: [],
          stocklist: [],
          items: [],
          deletList:[],
          showHide : false,
          display : ""

        };

      this.delete = this.delete.bind(this);

    }

    componentDidMount() {

      this.getData()            
       
    }

    async getData(id){

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${tokensdata}`);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch(`https://apis.tradetipsapp.com/api/stockDetail/getAllStockOfUserByUserName?userName=${userid}`, requestOptions)

      const result = await response.json();

        if(result.length > 0){

            let users = [];

        for(var i= result.length - 1; i >= 0 ; i--){

          users.push(result[i].stockSymbol);
             
        }

          let deletdata = [];

        for(var j= 0; j < result.length ; j++){

          deletdata.push({"stockSymbol" : result[j].stockSymbol, "id" : result[j].id});
             
        }

        this.setState({deletList: deletdata})

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
          formdata.append("stockSymbol", users);

          var requestOptions = {
            method: 'POST',
            headers: myHeaders1,
            body: formdata,
            redirect: 'follow'
          };

          const responseone = await fetch(`https://cloud.iexapis.com/stable/stock/market/batch?types=quote&token=pk_dd324da3fb5f4428a47b05ab12f23ce2&symbols=${users}`, requestOp);

          const responsetwo = await responseone.json();

        if(id != undefined){

          document.getElementById(id).style.display = "block";

        } else {


        }

        this.setState({stocklist:responsetwo})


      } else {

        this.setState({ stocklist: null })

      }

    }


    async delete(stockName ,key){

      document.getElementById(key).style.display = "none";
       
      var stockId = this.state.deletList.filter(function (obj, key) {

          if(obj.stockSymbol==stockName){

            return obj.id;

          }

        })[0];
     
      var delteid = JSON.stringify(stockId.id).replace(/"/g, "");
     
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${tokensdata}`);

      var formdata = new FormData();
      formdata.append("stockId", delteid);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      var deletedata = await fetch("https://apis.tradetipsapp.com/api/stockDetail/deleteStock", requestOptions);

      var deletedatatwo = await deletedata.json();

      if(deletedatatwo[0].status == true){
   
        this.getData(key)

      } else {

        alert("Something went wrong")

      }

    }
       
    render() {

      return(

          <div>

            {

              this.state.stocklist?

                <div style={{overflow: "hidden" , height: "100%"}}>
             
                  {
                   
                    Object.keys(this.state.stocklist).map((keyName, key) => (

                      <div className="card" id={key} style={{display: this.state.display}}>
                        <div className="table-responsive">          
                          <table className="table main">
                            <thead>
                              <tr>
                                <td>{keyName}</td>
                                <td></td>                            
                                <td><a style={{marginLeft :"80px", cursor: "pointer"}} onClick={() => this.delete(keyName, key)}><MDBIcon far icon="trash-alt" /></a></td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="tableone">{this.state.stocklist[keyName].quote.companyName}</td>
                                <td className="tabletwo"><span>$</span>{parseFloat(this.state.stocklist[keyName].quote.latestPrice).toFixed(2)}</td>          
                                  {
                                    this.state.stocklist[keyName].quote.change > 0 ?
                                    <td className="tablethree green"><span>{(this.state.stocklist[keyName].quote.change).toFixed(2)}</span><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                      <path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
                                      <path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8 3.707 5.354 6.354a.5.5 0 1 1-.708-.708l3-3z"/>
                                      </svg>
                                    </td> :
                                    <td className="tablefour red">{Math.abs(this.state.stocklist[keyName].quote.change).toFixed(2)}<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                      <path fill-rule="evenodd" d="M4.646 9.646a.5.5 0 0 1 .708 0L8 12.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"/>
                                      <path fill-rule="evenodd" d="M8 2.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V3a.5.5 0 0 1 .5-.5z"/>
                                      </svg>
                                    </td>
                                  }  
                              </tr>        
                            </tbody>
                          </table>
                        </div>
                      </div>                
                 
                  ))}

                </div>

              : <h2>No Stock Added</h2>

            }

          </div>

        )

    }

}              


export default Stock 
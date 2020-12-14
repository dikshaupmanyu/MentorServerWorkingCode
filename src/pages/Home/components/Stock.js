import React, {Input, PureComponent, Fragment, Component, useState, useEffect } from 'react';
import datalink from 'react';
import { Button, Modal } from 'react-bootstrap';
import { MDBIcon } from "mdbreact";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {BASE_URL} from '../../../constants/constants';

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
        display : "",
        storageData: {},

      };

    this.delete = this.delete.bind(this);

  }

  componentDidMount() {
    const sData = localStorage.getItem('allTokenData');
     if (sData !== null) {
        this.setState({
          storageData: JSON.parse(sData),
        });
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

    axios({
      headers: { 
          'Authorization': `Bearer ${this.state.storageData.tokendata}`,
      },
      method: 'post',
      url: `${BASE_URL}/stockDetail/deleteStock`,
      params: {
        stockId: delteid,
      }
    })
    .then((response) => {
      if (response.status === 200) {
      // this.props.afun(true);
        this.getData(key)
      }
    }) 
    .catch((error) => {
      console.log("+++++++++65++++++++++++", error);
    });
  }
      
  render() {
    const {stocklist, deleteStock} = this.props;
    return(
      <div>
        {
          stocklist?
            <div style={{overflow: "hidden" , height: "100%"}}>
              {
                Object.keys(stocklist).map((keyName, key) => {
                  return (
                    <div className="card" id={key} style={{display: this.state.display}}>
                      <div className="table-responsive">          
                        <table className="table main">
                          <thead>
                            <tr>
                              <td>{keyName}</td>
                              <td></td>                            
                              <td><a style={{marginLeft :"80px", cursor: "pointer"}} onClick={() => deleteStock(keyName, key)}><img src="delete.jpg" width="20" height="20" /></a></td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="tableone">{stocklist[keyName].quote.companyName}</td>
                              <td className="tabletwo"><span>$</span>{parseFloat(stocklist[keyName].quote.latestPrice).toFixed(2)}</td>          
                                {
                                  stocklist[keyName].quote.change > 0 ?
                                  <td className="tablethree green">
                                    <span>{(stocklist[keyName].quote.change).toFixed(2)}</span>
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                      <path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
                                      <path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8 3.707 5.354 6.354a.5.5 0 1 1-.708-.708l3-3z"/>
                                    </svg>
                                  </td> :
                                  <td className="tablefour red">
                                    <span>{(stocklist[keyName].quote.change)}</span>
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
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
                  )
                })
              }
            </div>
          : <h2>No Stock Added</h2>
        }
      </div>
    )
  }
}              

export default Stock;
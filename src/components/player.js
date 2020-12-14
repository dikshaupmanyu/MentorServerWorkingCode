import React, {Component} from 'react';
import Select from 'react-select';
import { Multiselect } from 'multiselect-react-dropdown';

var FormData = require('form-data');
var url_string = window.location.href;
var urls = new URL(url_string);
var tokens = urls.searchParams.get("accessToken");
var tokensdata = urls.searchParams.get("tokendata");
var userid = urls.searchParams.get("uname");


class player extends React.Component {

    constructor(props) {
      super(props);

        this.state = {
          options: [],
          datas: []
        };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {

        if(event == null){

        } else {

          let users = [];

        for(var i=0; i< event.length; i++){

          users.push({ "stockSymbol" : event[i].label, "stockName" : event[i].value });
             
        }

        this.setState({datas: users});

      }  

    }

   handleSubmit(event) {

      var multi = this.state.datas;

      if(multi == ""){
          alert('Please select Stock');
      } else {

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${tokensdata}`);

      var raw = JSON.stringify({"stocks":multi});

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("https://apis.tradetipsapp.com/api/stockDetail/addMultipleStock", requestOptions)
        .then(response => response.text())
          .then(result => {
            if(result.length > 0){
              // alert('Stock Added Succesfully');
              window.location.reload();
            } else {
              alert('Somthing went wroung');                          
            }}).catch(error => console.log('error', error));  
        }

      event.preventDefault();

    }

    onKeyUp = async(e) => {

      var data = e.target.value;
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${tokensdata}`);
      myHeaders.append("Content-Type", "text/plain");

      var raw = {'stockSymbol' : data};

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      var datahere = await fetch(`https://apis.tradetipsapp.com/api/stocksearchdetails/searchStockSymbol?stockSymbol=${data}`, requestOptions)
      const resdata = await datahere.json();

          var users = [];
         
        for(var i=0; i< resdata.length; i++){  

          users.push({ "label" : resdata[i].stockSymbol, "value" : resdata[i].stockName });
                 
        }

    this.setState({options: users})

  }

  render() {

    let options = this.state.options

      return (
       
        <form onSubmit={this.handleSubmit}>
           <div onKeyUp={this.onKeyUp} className="row">
               <Select isMulti className="basic-multi-select" classNamePrefix="select" id="make" options={options} onChange={this.handleChange} />
           <span> </span>
               <input className="btn btn-info" type="submit" value="ADD" />
           </div>
       </form>
      );

    }
   
  }

export default player;
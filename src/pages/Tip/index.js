import React, { Component } from 'react';
import Sidebar from '../../common/Sidebar';
import axios from 'axios';
import {BASE_URL} from '../../constants/constants';
import SnackBar from 'my-react-snackbar';

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
      tokendata : "",
      setEntry : "",
      setExit: "",
      setStop: "",
      companySearchText: "" ,
      storageData: {},
      companyList: [],
      createTipPrice: "",
      status: "",
      timeFrame : "",
      stockSuggestion : "",
      imageDetails : "",
      tipComment : "",
      userId : "",
      alertMessageStatus: false,
      alertMessage: "",
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.myChangeHandler = this.myChangeHandler.bind(this);
  }

  myChangeHandler = (event) => {
    let name = event.target.name;
    let val = event.target.value;
    let file = document.getElementById("file").files[0];
   // alert(JSON.stringify(file));
    let fullPath = document.getElementById("file").value;    
    let filename = fullPath.replace(/^.*[\\\/]/, '');
    this.setState({[name]: val});
  }

  componentDidMount() {
    const sData = localStorage.getItem('allTokenData');
    console.log(sData);
    const id = this.props.location.search;
    this.setState({
      tokendata:id,
      storageData: JSON.parse(sData),
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.setEntry < this.state.setExit){
      this.state.stockSuggestion = "Buy";
    } else if (this.state.setEntry > this.state.setExit) {
      this.state.stockSuggestion = "Sell";
    } else {
      this.state.stockSuggestion = "Avoid";
    }

   // alert(this.state.setEntry);
   // alert(this.state.setExit);


    let file = document.getElementById("file").files[0];
    let fullPath = document.getElementById("file").value;   
    let filename = fullPath.replace(/^.*[\\\/]/, ''); 


    if(this.state.setEntry == this.state.setExit || this.state.setEntry == this.state.setStop){

      alert("Your entryPoint or exitPoint will not be same");


  }else{

    var formdata = new FormData();

    formdata.append("tipComment", this.state.tipComment);
    formdata.append("entryPoint", this.state.setEntry);
    formdata.append("exitPoint", this.state.setExit);
    formdata.append("stopPoint", this.state.setStop);
    formdata.append("stockName", this.state.stockName);
    formdata.append("stockSuggestion", this.state.stockSuggestion);

    // if(this.state.setEntry < this.state. setExit) {

    //     //  alert("Buy");

    //   formdata.append("stockSuggestion", "Buy");

    // } else {

    //    //  alert("Sell");

    //   formdata.append("stockSuggestion", "Sell");

  
    // } 

   
    formdata.append("status", "Approved");

    if(filename == ""){
    // alert("null");
      formdata.append("imageDetails", "");

    }else{
    // alert("not null");
      formdata.append("imageDetails", file , filename);

    }
    formdata.append("timeFrame", "15 days");
    formdata.append("createTipPrice", this.state.createTipPrice);
    formdata.append("userId", this.state.storageData.uid);

    var requestOptions = {
      method: 'POST',
      headers: {
              Authorization: 'Bearer '+ this.state.storageData.tokendata
            },
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${BASE_URL}/tip/addTip`, requestOptions)
      .then(response => response.json())
      .then(result => {

                var datak = JSON.stringify(result);
                //alert(datak);
                var dataResultp = JSON.parse(datak);               

                // alert(dataResultp.stockName);
               // alert("Your tip for "+dataResultp.stockName+" was submitted successfully");
                //window.location.reload();
              document.querySelector('#file').value="";
              this.setState({
              alertMessageStatus: true,
              alertMessage: "New Tip added Successfully",
                  setEntry : '',
                  setExit: '',
                  setStop: '',
                  stockName: '',
                  tipComment: '',
                  createTipPrice: '',
                  status : '',
                  timeFrame : '',
                  stockSuggestion: '',
                  userId : '',
                  name : '',
                  companyList: [],
          
            }, () => {
              setTimeout(() => {
                this.setState({
                  alertMessageStatus: false,
                  alertMessage: ""
                })
              }, 2000)
            })

       })
      .catch(error => console.log('error', error));
  }

  }

  companySearch = (event) => {
    this.setState({
      companyList: [],
      companySearchText: event.target.value
    }, () => {
      setTimeout(() => {
         axios({
        headers: { 
          'Authorization': `Bearer ${this.state.storageData.tokendata}`,
        },
        method: 'post',
        url: `${BASE_URL}/stocksearchdetails/searchStockSymbol`,
        data:'stockSymbol='+this.state.companySearchText,
      })
      .then((response) => {
        // alert(response)
        if (response.status === 200) {
          this.setState({
            companyList: [...response.data]
          })
        }
      });
      },1000);
     
    })
  }

  onCompanySelect = (event) => {
    const param = event.target.value;
    axios({
      method: 'get',
      url: `https://cloud.iexapis.com/stable/stock/market/batch?token=pk_dd324da3fb5f4428a47b05ab12f23ce2&types=quote&symbols=${param}`
    })
    .then((response) => {
      if (response.status === 200) {
        const result = response.data;
        // alert(result);
        if (this.state.setEntry < this.state.setExit){
            // this.value = "Buy";
            //alert("Buy");
          }
          else if (this.state.setEntry > this.state.setExit) {
            // this.value = "Sell";
            //alert("Sell");
          }
          else {
            // this.value = "Avoid";
            //alert("Avoid");
          }

        this.setState({
          stockName : param,
          setEntry: result[param].quote.latestPrice,
          setStop: result[param].quote.latestPrice,
          setExit: result[param].quote.latestPrice,
          createTipPrice: result[param].quote.latestPrice,
          status : "Pending",
          timeFrame : "15 days",
          stockSuggestion: "",
          userId : this.state.storageData.uid,
        })
      }
    });
  }

  render() {
    return (
       <div className="container-fluid" style={{background: "#263b66"}}>  
          <div className="row" style={{background: "#263b66"}}>
            <div className="col-md-3">
              <Sidebar history={this.props.history} />
            </div>
            <div className="col-md-9 mx-auto">   
             
              <div className="row" style={{marginTop : "20px" , overflow : "hidden" , background : "#263b66" , color : "#fff" }}> 
                <form enctype="multipart/form-data" onSubmit={this.handleSubmit} method="POST">
                   <h6 class="m-0 font-weight-bold">Make A Tip</h6>
                 
                  <br/>

                  <div class="form-group">
                    <label for="exampleInputEmail1">Enter Company Name or Symbol Name</label>
                    <input type="text" id="search-box" class="form-control" placeholder="Company Name or Symbol Name" readonly onChange={this.companySearch} required/>
                    {(this.state.companySearchText && this.state.companyList.length > 0) ?
                      <ul id="suggesstion-box" style={{overflowY: 'scroll', maxHeight: '200px'}}>
                        {this.state.companyList.map((company, key) => {
                          return(
                            <li style={{listStyle: 'none'}} value={company.stockSymbol}>
                              <input id={"radiobtn"+company.stockSymbol} type="radio" name="symbolName" value={company.stockSymbol} onChange={this.onCompanySelect} required/>
                               {company.stockSymbol}
                            </li>
                          )
                        })}
                      </ul>
                      : 
                      <div>
                        Company Not Found
                      </div>
                    }
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Set Entry</label>
                    <input value={this.state.setEntry} type="text" class="form-control" id="setEntry" placeholder="Set Entry" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" name="setEntry" onChange={this.myChangeHandler} required/>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Set Exit</label>
                    <input value={this.state.setExit} type="text" class="form-control" id="" placeholder="Set Exit" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" name="setExit" onChange={this.myChangeHandler} required/>
                    <input type="hidden" id="createprice"/>
                    <input type="hidden" id="loginId"/>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Set Stop</label>
                    <input value={this.state.setStop} type="text" class="form-control" id="setStop" placeholder="Set Stop" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" name="setStop" onChange={this.myChangeHandler} required/>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Enter Comment</label>
                    <textarea value={this.state.tipComment} class="form-control" id="tipComment" placeholder="Enter Comment" name="tipComment" onChange={this.myChangeHandler}></textarea>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">File</label>  
                    <input name="imageDetails" id="file" type="file" accepts="image/*" onChange={this.myChangeHandler}/><br />
                    <label for="file"></label>
                    <img id="preview" />
                  </div>
                  <input type="submit" id="datasubmit" class="btn btn-primary" value="Submit"/> &nbsp;
                  <input type="reset" class="btn btn-primary" value="Cancel"/>
                </form>
              </div>
          </div>
        </div>
        <SnackBar 
          open={this.state.alertMessageStatus} 
          message={this.state.alertMessage} 
          containerStyle= {{
              background: 'green'
          }}
        />
      </div>
    )
  }
}

export default Tip  
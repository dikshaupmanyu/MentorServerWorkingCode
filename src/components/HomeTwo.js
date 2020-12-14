import React, {Input, PureComponent, Fragment, Component, useState, useEffect } from 'react';
import datalink from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import Select from 'react-select';
import Player from './player';
import Stock from './Stock';
import 'bootstrap/dist/css/bootstrap.min.css';

var FormData = require('form-data');
var url_string = window.location.href;
var urls = new URL(url_string);
var tokens = urls.searchParams.get("accessToken");
var tokensdata = urls.searchParams.get("tokendata");
var userid = urls.searchParams.get("uname");
var userMainid = urls.searchParams.get("uid");


const imagesPath = {
  minus: "like.jpeg",
  plus: "unnamed.png"
}

  class HomeTwo extends Component {
    constructor(props) {
      super(props)
      this.state = {
          contacts: [],
          tokendata : "",
          tokensdata : "",
          list: null,
          stocklist: null,
          tipLatestprice: null,
          dataaa : [],
          tipval : [],
          tipId : "",
          item: this.props.item,
          show : true,
          tipval : [],
          tipId : "",
          userid : "",
          status : "",
          commentDetails : "",
          open: true,
          showHide: false,
      };    
    }

    toggleImage = () => {

      this.setState(state => ({ open: !state.open }))

    }

    getImageName = () => this.state.open ? 'plus' : 'minus'


    addDefaultSrc(ev){

      ev.target.src = '133-1332476_crowd-of-users-transparent-user-icon-png-clipart.png'
     
    }

    addDefaultTip(ev){

      ev.target.src = 'white.jpg'
     
    }



    async componentDidMount() {


      var myHeaders = new Headers();
      myHeaders.append("Cookie", "ctoken=dd44d368ddc944ddb0cf27de108f0e56");

      var myHeaders1 = new Headers();
      myHeaders1.append("Authorization", `Bearer ${tokensdata}`);    

      var requestOp = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      var formdata = new FormData();
      formdata.append("stockSymbol", this.state.item.tip.stockName);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders1,
        body: formdata,
        redirect: 'follow'
      };

      const responseone = await fetch(`https://cloud.iexapis.com/stable/stock/market/batch?types=quote&token=pk_dd324da3fb5f4428a47b05ab12f23ce2&symbols=${this.state.item.tip.stockName}`, requestOp);

      const responsetwo = await responseone.json();

      // console.log(responsetwo);
     
      this.setState({

        stocklist: responsetwo[this.state.item.tip.stockName].quote,
        tipLatestprice : responsetwo[this.state.item.tip.stockName].quote.latestPrice

      })

    }


    copyClipboard = e => {
      // alert(e);


      var copyText = document.getElementById("divClipboard"+e);
      var textArea = document.createElement("textarea");
      textArea.value = copyText.textContent;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("Copy");
      textArea.remove();
      // alert("Copied !!")
 

      // var elm = document.getElementById("divClipboard");
     
      // if(document.body.createTextRange) {
      //   var range = document.body.createTextRange();
      //   range.moveToElementText(elm);
      //   range.select();
      //   document.execCommand("Copy");
      //   alert("Copied div content to clipboard");
      // }
      // else if(window.getSelection) {
      //   // other browsers

      //   var selection = window.getSelection();
      //   var range = document.createRange();
      //   range.selectNodeContents(elm);
      //   selection.removeAllRanges();
      //   selection.addRange(range);
      //   document.execCommand("Copy");
      //   alert("Copied div content to clipboard");
      // }
    }


    handleResult = e => {

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${tokensdata}`);

      var formdata = new FormData();
      formdata.append("tipId", e);
      formdata.append("limit", "100");
      formdata.append("offset", "0");

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };


      fetch("https://apis.tradetipsapp.com/api/comment/getCommentsByTipIdPagination", requestOptions)
      .then(response => response.json())
      .then(response => {
       // alert(response);
          var newtip = [];

       for(var i=0; i< response.length; i++){

          newtip.push(response[i]);
             
        }

        this.setState({
          tipval: newtip
        });

     });
   
    }

    newhandlelikeResult = e => {

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${tokensdata}`);

      var formdata = new FormData();
      formdata.append("tipId", e);

      var requestOptionsf = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch("https://apis.tradetipsapp.com/api/tipFeature/tipLikeForUser", requestOptionsf)
        .then(response => response.json())
          .then(result => {
       
        this.props.afun(true);

    });
   
  }

    newhandleunlikeResult = e => {
   
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${tokensdata}`);

      var formdata = new FormData();
      formdata.append("tipId", e);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch("https://apis.tradetipsapp.com/api/tipFeature/tipUnLikeForUser", requestOptions)
        .then(response => response.json())
          .then(result => {

        this.props.afun(true);

     });
 
  }

  newhandlePinResult = e => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${tokensdata}`);

    var formdata = new FormData();
    formdata.append("tipId", e);

    var requestOptionsf = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://apis.tradetipsapp.com/api/tipFeature/tipPinForUser", requestOptionsf)
      .then(response => response.json())
        .then(result => {

        this.props.afun(true);

    });
   
  }

   newhandleunPinResult = e => {

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${tokensdata}`);

      var formdata = new FormData();
      formdata.append("tipId", e);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch("https://apis.tradetipsapp.com/api/tipFeature/tipUnPinForUser", requestOptions)
        .then(response => response.json())
          .then(result => {

        this.props.afun(true);

    });

  }

  flagCommnetrue = e => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${tokensdata}`);

    var formdata = new FormData();
    formdata.append("commentId", e);
    formdata.append("userId", this.currntIdUser.value);
    formdata.append("isFlag", "true");
    formdata.append("flagReason", "");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://apis.tradetipsapp.com/api/tipCommentFlag/addCommentFlag", requestOptions)
      .then(response => response.json())
        .then(result => {
       
       alert(JSON.stringify(result.message));

     });

  }

  newhandleRemoveTipResult = e => {

        this.setState({showHide:true})

     
    }


    newhandleRemoveTipResultData = e => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${tokensdata}`);

        var formdata = new FormData();
        formdata.append("tipId", e);

        var requestOptionsf = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };

      fetch("https://apis.tradetipsapp.com/api/tipFeature/tipHideForUser", requestOptionsf)
        .then(response => response.json())
          .then(result => {

          window.location.reload();

      });

     
    }

 
    onSubmit = e => {

      e.preventDefault()

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${tokensdata}`);

      var formdata = new FormData();
      formdata.append("tipId", this.id.value);
      formdata.append("commentDetails", this.state.commentDetails);
      formdata.append("status", "Pending");
      formdata.append("userid", this.currntIdUser.value);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch("https://apis.tradetipsapp.com/api/comment/addCommentOnTip", requestOptions)
        .then(response => response.json())
        .then(result => {

         var formdata = new FormData();
          formdata.append("tipId", result.tipId);
          formdata.append("limit", "100");
          formdata.append("offset", "0");

          var requestOptionst = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
          };


        fetch("https://apis.tradetipsapp.com/api/comment/getCommentsByTipIdPagination", requestOptionst)
          .then(response => response.json())
            .then(response => {
           
            var newtip = [];


          for(var i=0; i< response.length; i++){

            newtip.push(response[i]);
               
          }

            this.setState({ tipval: newtip});

            this.setState({ commentDetails: ""});

        });

      });

    }

    handleModalShowHide(){

      this.setState({showHide:false})

    }

   
    render() {

      const {item} = this.props;

      const imageName = this.getImageName();

      var minusValues = this.state.tipLatestprice - item.tip.createTipPrice;

      var values = Number(minusValues).toFixed(2);

      return (
       
        item?<div className="card text-white mb-3 testtoo">

          {
            this.state.stocklist?

            <div>
            <div>
                 
              <div className="card-header">      

                <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}} onClick={this.handleResult.bind(this, item.tip.id)} data-toggle="modal" data-target={`#exampleModal${item.tip.id}`}>
                 
                  <li><img src={`https://apis.tradetipsapp.com/api/appUser/getImageByAppUserId?appUserId=${item.tip.appUser.id}`} onError={this.addDefaultSrc} alt="pic" width="50" height="50" class="rounded-circle" />&nbsp;&nbsp;<span>{item.tip.appUser.userName}</span></li>
                  {
                   item.tip.stockSuggestion == "Buy" ?
                   <li className="suggestion"><span className="Buy">BUY</span></li>
                   :  item.tip.stockSuggestion == "Sell" ?
                   <li className="suggestion"><span className="Sell">SELL</span></li>
                   :<li className="suggestion"><span className="Avoid">AVOID</span></li>
                 }

                </ul>
                           
                <div class="modal fade bs-example-modal-xl custom-modal" id={`exampleModal${item.tip.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-xl" role="document">
                    <div class="modal-content modal-xl" id="datamodel">
                      <div class="card-header modal-xl">
                        <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>
                           <li><img src={`https://apis.tradetipsapp.com/api/appUser/getImageByAppUserId?appUserId=${item.tip.appUser.id}`} onError={this.addDefaultSrc} alt="pic" width="50" height="50" class="rounded-circle" />&nbsp;&nbsp;<span>{item.tip.appUser.userName}</span></li>
                             {
                               item.tip.stockSuggestion == "Buy" ?
                               <li className="suggestion"><span className="Buy">BUY</span></li>
                               :  item.tip.stockSuggestion == "Sell" ?
                               <li className="suggestion"><span className="Sell">SELL</span></li>
                               :<li className="suggestion"><span className="Avoid">AVOID</span></li>
                             }
                       
                        </ul>
                     
                      </div>
                      <div class="modal-body modal-xl">
                        <div className="card-header" style={{background : "white" , border : "none"}}>  
                          <div className="row">
                            <div className="col-md-6">
                                <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>
                                  <li><h5 style={{color: "black"}}>{item.tip.stockName}</h5>{this.state.stocklist.companyName}</li>

                                  <li>CURRENT PRICE<br/><h6 className="hclass"><span>$</span>{parseFloat( this.state.stocklist.latestPrice).toFixed(2)}</h6></li>  
                                </ul>

                                <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>
                                  <li>ENTRY<br/>
                                    {
                                      item.tip.entryPoint <=  this.state.stocklist.latestPrice && item.tip.stockSuggestion == "Buy" ?
                                    <h6 style={{color : "green"}}><span>$</span>{parseFloat(item.tip.entryPoint).toFixed(2)}</h6>
                                    :  item.tip.entryPoint >= this.state.stocklist.latestPrice && item.tip.stockSuggestion == "Sell" ?
                                     <h6 style={{color : "green"}}><span>$</span>{parseFloat(item.tip.entryPoint).toFixed(2)}</h6>
                                    :<h6 style={{color : "black"}}><span>$</span>{parseFloat(item.tip.entryPoint).toFixed(2)}</h6>
                                    }
                                    </li>
                                    <li>EXIT<br/>
                                    {
                                      item.tip.entryPoint <= this.state.stocklist.latestPrice && item.tip.stockSuggestion == "Buy" ?
                                    <h6 style={{color : "green"}}><span>$</span>{parseFloat(item.tip.exitPoint).toFixed(2)}</h6>
                                    :  item.tip.entryPoint >= this.state.stocklist.latestPrice && item.tip.stockSuggestion == "Sell" ?
                                     <h6 style={{color : "green"}}><span>$</span>{parseFloat(item.tip.exitPoint).toFixed(2)}</h6>
                                    :<h6 style={{color : "black"}}><span>$</span>{parseFloat(item.tip.exitPoint).toFixed(2)}</h6>
                                    }
                                    </li>
                                    <li>STOP<br/>
                                    {
                                      item.tip.stockSuggestion == "Buy" && this.state.stocklist.latestPrice < item.tip.createTipPrice && this.state.stocklist.latestPrice <= item.tip.stopPoint ?
                                    <h6 style={{color : "red"}}><span>$</span>{parseFloat(item.tip.stopPoint).toFixed(2)}</h6>
                                    :  item.tip.stockSuggestion == "Sell"  && item.tip.createTipPrice < this.state.stocklist.latestPrice && this.state.stocklist.latestPrice >= item.tip.stopPoint ?
                                     <h6 style={{color : "black"}}><span>$</span>{parseFloat(item.tip.stopPoint).toFixed(2)}</h6>
                                    :<h6 style={{color : "black"}}><span>$</span>{parseFloat(item.tip.stopPoint).toFixed(2)}</h6>
                                    }  
                                    </li>
                                    <li className="tip">AT TIME OF TIP<br/><h6 className="hclass"><span>$</span>{Number(item.tip.createTipPrice).toFixed(2)}</h6></li>  
                                    </ul>
                                    <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>
                                    <li style={{width : "65%"}}><h6>{item.tip.comment}</h6></li>
                                    <li>CHANGE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>

                                    {
                                     values > "0" ?

                                     <h6 className="hclass green"><span>$</span>{values}</h6>  
                                     :<h6 className="hclass red"><span>$</span>{values}</h6>
                                    }
                                  </li>                          
                                </ul>

                                <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>
                                  <li><img src={`https://apis.tradetipsapp.com/api/appUser/getImageByTipId?tipId=${item.tip.id}`} alt="pic" width="250" height="150" onError={this.addDefaultTip} class="img-responsive"/></li>
                                </ul>
                                 
                                  </div>
                                <div className="col-md-6">
                                  <ul class="list-group" style={{overflowY : "scroll" , height : "300px"}}>
                                               

                                    {this.state.tipval.reverse().map((itemd, i) =>

                                     <li class="list-group-item">
                                        <div class="row">
                                          <div class="col-xs-2 col-md-2">
                                            <img src={`https://apis.tradetipsapp.com/api/appUser/getImageByAppUserId?appUserId=${itemd.userId}`} onError={this.addDefaultSrc} alt="pic" width="50" height="50" class="rounded-circle" /></div>
                                          <div class="col-xs-9 col-md-9">
                                            <div style={{color : "blue"}}>
                                              {itemd.appUser.userName}
                                            </div>
                                            <div class="comment-text" style={{color: "black"}}>
                                              {itemd.commentDetails}
                                            </div>                    
                                          </div>
                                          <div class="col-xs-1 col-md-1">
                                            <input type="hidden" name="secondId" value={itemd.userId} id="secondId" ref={(input) => { this.secondId = input }} />
                                            <input type="hidden" name="fristid" value={itemd.id} id="fristid" ref={(input) => { this.fristid = input }} />
                                           
                                            <a onClick={this.flagCommnetrue.bind(itemd.userId,itemd.id)} ><img src="flag.png" width="20" height="20" /></a>
                                         
                                          </div>
                                        </div>
                                      </li>

                               
                                    )}
                                  </ul>  
                                  <form noValidate onSubmit={this.onSubmit}>
                                    <input type="hidden" name="id" value={item.tip.id} ref={(input) => { this.id = input }} />
                                    <input type="hidden" name="userId" value={item.tip.userId} id="currntIdUser" ref={(input) => { this.currntIdUser = input }} />
                                    <input type="hidden" name="status" value="Pending"/>
                                    <textarea className="form-control" name="commentDetails" value={this.state.commentDetails} placeholder="Enter Comment" onChange={(event) => { this.setState({ commentDetails: event.target.value }) }}></textarea>
                                    <br></br>
                                    <input type="submit" className="btn btn-primary" value="Add"/>
                                  </form>                                        
                                </div>
                            </div>                                    
                          </div>
                        </div>
                        <div class="modal-footer modal-xl">
                          <button type="reset" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                      </div>                      
                    </div>
                  </div>
                </div>

                <div className="card-body" style={{padding:"4px"}}>
                 
                  <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}} onClick={this.handleResult.bind(this, item.tip.id)} data-toggle="modal" data-target={`#exampleModal${item.tip.id}`}>
                    <li><h5 style={{color: "black"}}>{item.tip.stockName}</h5>{this.state.stocklist.companyName}</li>

                    <li>CURRENT PRICE<br/><h6 className="hclass"><span>$</span>{parseFloat( this.state.stocklist.latestPrice).toFixed(2)}</h6></li>  
                  </ul>

                  <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}} onClick={this.handleResult.bind(this, item.tip.id)} data-toggle="modal" data-target={`#exampleModal${item.tip.id}`}>
                    <li>ENTRY<br/>
                    {
                      item.tip.entryPoint <=  this.state.stocklist.latestPrice && item.tip.stockSuggestion == "Buy" ?
                    <h6 style={{color : "green"}}><span>$</span>{parseFloat(item.tip.entryPoint).toFixed(2)}</h6>
                    :  item.tip.entryPoint >= this.state.stocklist.latestPrice && item.tip.stockSuggestion == "Sell" ?
                     <h6 style={{color : "green"}}><span>$</span>{parseFloat(item.tip.entryPoint).toFixed(2)}</h6>
                    :<h6 style={{color : "black"}}><span>$</span>{parseFloat(item.tip.entryPoint).toFixed(2)}</h6>
                    }
                    </li>
                    <li>EXIT<br/>
                    {
                      item.tip.entryPoint <= this.state.stocklist.latestPrice && item.tip.stockSuggestion == "Buy" ?
                    <h6 style={{color : "green"}}><span>$</span>{parseFloat(item.tip.exitPoint).toFixed(2)}</h6>
                    :  item.tip.entryPoint >= this.state.stocklist.latestPrice && item.tip.stockSuggestion == "Sell" ?
                     <h6 style={{color : "green"}}><span>$</span>{parseFloat(item.tip.exitPoint).toFixed(2)}</h6>
                    :<h6 style={{color : "black"}}><span>$</span>{parseFloat(item.tip.exitPoint).toFixed(2)}</h6>
                    }
                    </li>
                    <li>STOP<br/>
                    {
                      item.tip.stockSuggestion == "Buy" && this.state.stocklist.latestPrice < item.tip.createTipPrice && this.state.stocklist.latestPrice <= item.tip.stopPoint ?
                    <h6 style={{color : "red"}}><span>$</span>{parseFloat(item.tip.stopPoint).toFixed(2)}</h6>
                    :  item.tip.stockSuggestion == "Sell"  && item.tip.createTipPrice < this.state.stocklist.latestPrice && this.state.stocklist.latestPrice >= item.tip.stopPoint ?
                     <h6 style={{color : "black"}}><span>$</span>{parseFloat(item.tip.stopPoint).toFixed(2)}</h6>
                    :<h6 style={{color : "black"}}><span>$</span>{parseFloat(item.tip.stopPoint).toFixed(2)}</h6>
                    }  
                    </li>
                    <li className="tip">AT TIME OF TIP<br/><h6 className="hclass"><span>$</span>{Number(item.tip.createTipPrice).toFixed(2)}</h6></li>  
                  </ul>

                  <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}} onClick={this.handleResult.bind(this, item.tip.id)} data-toggle="modal" data-target={`#exampleModal${item.tip.id}`}>
                  <li style={{width : "65%"}}><h6>{item.tip.comment}</h6></li>
                    <li>CHANGE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                    {
                       values > "0" ?

                       <h6 className="hclass green"><span>$</span>{values}</h6>  
                       :<h6 className="hclass red"><span>$</span>{values}</h6>
                     }
                    </li>                          
                  </ul>
                 
                  <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>

                    <li onClick={this.handleResult.bind(this, item.tip.id)} data-toggle="modal" data-target={`#exampleModal${item.tip.id}`}><img src={process.env.PUBLIC_URL + '/comment.jpeg'} style={{cursor: "pointer"}} className="image-responsive" height="18" width="20"/>&nbsp;<span>{item.commentCount}</span></li>
                                       
                   {
                      item.userPinStatus === true ?
                      <li onClick={this.newhandleunPinResult.bind(this, item.tip.id)}><img src={process.env.PUBLIC_URL + '/savetip.png'} style={{height : "15px", cursor: "pointer"}} />&nbsp;{item.pinCount}</li>
                     :<li onClick={this.newhandlePinResult.bind(this, item.tip.id)}><img src={process.env.PUBLIC_URL + '/show.jpeg'} style={{height : "15px", cursor: "pointer"}} />&nbsp;{item.pinCount}</li>
                    }    

                    {
                      item.userLikeStatus === true ?
                      <li onClick={this.newhandleunlikeResult.bind(this, item.tip.id)}><img src={process.env.PUBLIC_URL + '/unnamed.png'} style={{height : "15px", cursor: "pointer"}} />&nbsp;{item.likeCount}</li>  
                     :<li onClick={this.newhandlelikeResult.bind(this, item.tip.id)}><img src={process.env.PUBLIC_URL + '/like.jpeg'} style={{height : "15px", cursor: "pointer"}} />&nbsp;{item.likeCount}</li>
                    }  

                  <li data-toggle="modal" data-target={`#myModalinfo${item.tip.id}`}><img src={process.env.PUBLIC_URL + '/info.jpeg'} style={{height : "15px", cursor: "pointer"}} />&nbsp;</li>                  
                    <div id={`myModalinfo${item.tip.id}`} class="modal fade" role="dialog" tabindex="-1">
                      <div class="modal-dialog">
                        <div class="modal-content">
                         <div class="modal-body">
                            <li style={{textAlign: "center" , border: "1px solid #0000007a" , color : "#007bffc4" , height : "50px" , paddingTop : "5px"}}><img src="/IMG-20200819-WA0007.jpg" class="img-responsive" width="12"/> Share Tip      <button onClick={this.copyClipboard.bind(this, item.tip.id)}  type="button" class="btn btn-primary" data-toggle="modal"  data-target="#myModalclipdata" data-dismiss="modal">Copy to Clipboard</button></li>
                            <span id={`divClipboard${item.tip.id}`}  style={{position : "absolute" , opacity : ".01" , height : "0" , overflow : "hidden"}}>
                              ${item.tip.stockName} Current price: ${parseFloat( this.state.stocklist.latestPrice).toFixed(2)} Suggested entry: ${parseFloat(item.tip.entryPoint).toFixed(2)} exit: ${parseFloat(item.tip.exitPoint).toFixed(2)} stop: ${parseFloat(item.tip.stopPoint).toFixed(2)} Stock tip by {item.tip.appUser.userName} on TradeTips. Download at TradeTipsApp.com
                             </span>
                             
                            <li style={{color: "red" , textAlign: "center" , border: "1px solid #0000007a" , height : "50px" , paddingTop : "12px"}} onClick={this.newhandleRemoveTipResult.bind(this, item.tip.id)}><i class="fa fa-trash" aria-hidden="true"></i> Remove Tip</li>
                            <li data-dismiss="modal" style={{textAlign: "center" , border: "1px solid #0000007a" , color : "#007bffc4" , height : "50px" , paddingTop : "12px"}}> Cancel</li>
                          </div>
                       </div>
                     </div>
                    </div>

                    <div id="myModalclipdata" class="modal fade" role="dialog"  tabindex="-1">
                      <div class="modal-dialog">
                        <div class="modal-content">
                         <div class="modal-body">
                            <li style={{textAlign: "center" , border: "1px solid #0000007a" , color : "#007bffc4" , height : "50px" , paddingTop : "5px"}}><i class="fa fa-share" aria-hidden="true"></i> Share Tip      <button class="btn btn-success">Copied</button></li>
                            <li data-dismiss="modal" style={{textAlign: "center" , border: "1px solid #0000007a" , color : "#007bffc4" , height : "50px" , paddingTop : "12px"}}> Cancel</li>
                          </div>
                         </div>
                       </div>
                    </div>
                    <Modal size="sm" show={this.state.showHide}>
                      <Modal.Body><center><h4><b>Remove Tip</b></h4></center><br/><center><h6><b>It'll be gone forever</b></h6></center><br/>
                       <Modal.Footer style={{display: "inline" , marginLeft : "4.5rem" , padding : "0px"}}>
                        <Button className="btn btn-primary" variant="secondary" onClick={this.newhandleRemoveTipResultData.bind(this, item.tip.id)}>
                          Ok
                        </Button>
                        <Button className="btn btn-primary" variant="secondary" onClick={() => this.handleModalShowHide()}>
                          Cancel
                        </Button>
                        </Modal.Footer>
                      </Modal.Body>
                    </Modal>
                 </ul>

                </div>

              </div>

            </div>:null}

          </div>:null


        )

      }

  }

export default HomeTwo
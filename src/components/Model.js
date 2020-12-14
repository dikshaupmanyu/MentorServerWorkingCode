import React, {Input, PureComponent, Fragment, Component, useState, useEffect } from 'react';

import { Button, Modal } from 'react-bootstrap';
import { MDBIcon } from "mdbreact";
import 'bootstrap/dist/css/bootstrap.min.css';

var FormData = require('form-data');
var url_string = window.location.href;
var urls = new URL(url_string);
var tokens = urls.searchParams.get("accessToken");
var tokensdata = urls.searchParams.get("tokendata");
var userid = urls.searchParams.get("uname");


  class Model extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tokendata : "",
            tokensdata : "",
            showHide : false,
            name: null,
            id:null
        };    
    }


    async delete(){
       
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${tokensdata}`);

      var formdata = new FormData();
      formdata.append("stockId", this.state.id);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      var deletedata = await fetch("https://apis.tradetipsapp.com/api/stockDetail/deleteStock", requestOptions)

      var deletedatatwo = await deletedata.json();

      if(deletedatatwo[0].status == true){

        this.setState({ showHide: !this.state.showHide })
       
        window.location.reload(false);

      } else {

        alert("Something went wrong")
       
        this.setState({ showHide: !this.state.showHide })

      }


    }

    handleModalShowHide(e, id) {  

      this.setState({ name: e ,id : id})

      this.setState({ showHide: !this.state.showHide })

    }


    render() {

      const {item} = this.props;

      return (

        <div>

          <a onClick={() => this.handleModalShowHide(item.stockSymbol, item.id)}><MDBIcon far icon="trash-alt" /></a>
     
          <Modal show={this.state.showHide}>
              <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
              <Modal.Title>Delete Confirmation</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to Delete Stock <b>{item.stockSymbol}</b></Modal.Body>
              <input type="hidden" value={item.id} className="form-control" />
              <Modal.Footer>
              <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
                  Close
              </Button>
              <Button variant="danger" onClick={() => this.delete()}>
                  Delete
              </Button>
              </Modal.Footer>
          </Modal>

        </div>

        )

    }

}              


export default Model 

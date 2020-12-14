import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

class Landing extends Component {
  constructor() {
    super()
    this.state = {
      userName: '',
      password: '',
      showHide: false,
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {

    this.setState({ [e.target.name]: e.target.value })

  }

  handleModalShowHide(){

    this.setState({showHide:false})

  }

  onSubmit(e) {

    e.preventDefault()

    var formdata = new FormData();
    formdata.append("userName", this.state.userName);
    formdata.append("password", this.state.password);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://apis.tradetipsapp.com/api/auth/appSignIn", requestOptions)
      .then(response => response.json())
      .then(response => {
      var datak = JSON.stringify(response);
      var dataResult = JSON.parse(datak);

      // alert(JSON.stringify(dataResult));

      if(dataResult.accessToken){

          if(dataResult.userName != "admin" && dataResult.isMentor != "false"){
               
            var tdss = dataResult.accessToken;
            var tds1 = dataResult.accessTokenStreamIO;
            var tds2 = dataResult.userName;
            var tds3 = dataResult.id;
            var tds4 = dataResult.accessTokenStreamIOWithID;
            window.location.href = "/home?tokendata="+tdss+"&streamtoken="+tds1+"&uname="+tds2+"&uid="+tds3+"&streamdatatoken="+tds4;  

          } else {

            this.setState({showHide:true})

          }

       } else {

        this.setState({showHide:true})

      }
   
     }).catch(err => {

      this.setState({showHide:true})

    });

  }

  render() {
    return (
      <div className="container-fluid">  
      <h1 className="text-center make" style={{background: "#202842",color: "white"}}>TradeTips</h1>
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
              <div className="form-group">
                <label htmlFor="email">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="userName"
                  placeholder="Enter userName"
                  value={this.state.userName}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block" style={{background: "#202842",color: "white" , border : "#202842"}}
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
       
        <Modal size="sm" show={this.state.showHide}>
          <Modal.Body><center>Please enter a valid username and password.</center><br/>
             
            <Button className="btn-sm loginbtn" variant="secondary" onClick={() => this.handleModalShowHide()} style={{display: "block" , margin: "0 auto"}}>
              Ok
            </Button>
   
          </Modal.Body>
        </Modal>

      </div>
    )
  }
}

export default Landing  
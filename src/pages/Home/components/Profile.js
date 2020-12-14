import React, {Component} from 'react';
import Select from 'react-select';
import { Multiselect } from 'multiselect-react-dropdown';
import axios from 'axios';
import {BASE_URL} from '../../../constants/constants';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      datas: [],
      storageData: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const sData = localStorage.getItem('allTokenData');
    if (sData !== null) {
      this.setState({
        storageData: JSON.parse(sData),
      })
    }
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
    event.preventDefault();
    const multi = this.state.datas;
    this.props.handleStockddFunction(multi);

    setTimeout(() => {
      this.setState({
        options: []
      })
    }, 2000)
  }

  onKeyUp = async(e) => {
    let data = e.target.value;
    axios({
      headers: { 
        'Authorization': `Bearer ${this.state.storageData.tokendata}`,
        'Content-Type': "text/plain"
      },
      method: 'post',
      url: `${BASE_URL}/stocksearchdetails/searchStockSymbol?stockSymbol=${data}`,
    })
    .then((response) => {
        if (response.status === 200) {
          const dataResult = response.data;
          console.log('+++++++++dataResult++++++++', dataResult);
          let users = [];
          for(let i=0; i< dataResult.length; i++){  
            users.push({ "label" : dataResult[i].stockSymbol, "value" : dataResult[i].stockName });
          }
          this.setState({options: users})
        }
    }) 
    .catch((error) => {
        console.log("+++++++++64++++++++++++", error);
    });
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
export default Profile;
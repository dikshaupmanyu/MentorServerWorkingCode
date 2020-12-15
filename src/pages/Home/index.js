import React, {Input, PureComponent, Fragment, Component,useState, useEffect } from 'react';
import datalink from 'react';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import axios from 'axios';
import {BASE_URL} from '../../constants/constants';
import Sidebar from '../../common/Sidebar';
import Player from './components/Profile';
import HomeTwo from './components/HomeTwo';
import Stock from './components/Stock';
import 'bootstrap/dist/css/bootstrap.min.css';
import SnackBar from 'my-react-snackbar';
import Loader from 'react-loader-spinner';

class Home extends Component {
    constructor() {
        super()
        this.state = {
            contacts: [],
            tokendata : "",
            tokensdata : "",
            list: [],
            stocklist: [],
            dataaa : [],
            tipval : [],
            show : true,
            maxValue: 10,
            storageData: {},
            alertMessageStatus: false,
            alertMessage: "",
            currntdatess: [],
            isLoading: true
        };    
    }

    componentDidMount() {
        const sData = localStorage.getItem('allTokenData');
        if (sData !== null) {
            this.setState({
                storageData: JSON.parse(sData),
                isLoading: true,
            }, () => {
                this.demaoFun();
                this.getStockData();
            })
        }
    }

    async demaoFun(){
        axios({
            headers: { 
                'Authorization': `Bearer ${this.state.storageData.tokendata}`,
            },
            method: 'post',
            url: `${BASE_URL}/tip/getAllTipFeaturePaginationForUser`,
            params: {
                offset: 0,
                limit: this.state.maxValue,
            }
        })
        .then((response) => {
            if (response.status === 200) {
                const dataResult = response.data;
                 var currntdate = [];
              for(var i=0; i< dataResult.length; i++){


             var date = new Date(dataResult[i].tip.modifiedOn);
             var options = {year: "numeric", month: "long", day: "numeric"};

             var newdate = date.toGMTString('en-US', options);  


             const stripped = newdate.replace(/GMT/g, 'NYT');
         

              currntdate.push(stripped);

              //console.log(currntdate);

                 }
               // console.log(dataResult);
                this.setState({ contacts: dataResult , currntdatess : currntdate})
            } else {
                this.setState({contacts: null })
            }
            const id = this.props.location.search;
            this.setState({tokendata:id})

            this.scrollListener = window.addEventListener("scroll", e => {
                this.handleScroll(e);
            });
        }) 
        .catch((error) => {
            console.log("+++++++++72++++++++++++", error);
        });
    }

    handleScroll = () => { 
        const lastDiv = document.querySelector("div.container > div:last-child");
        if (lastDiv && lastDiv.offsetTop !== null) {
            const lastLiOffset = lastDiv.offsetTop + lastDiv.clientHeight;
            const pageOffset = window.pageYOffset + window.innerHeight;
            if (pageOffset > lastLiOffset) {
                this.setState({
                    maxValue: this.state.maxValue + 2
                }, () => {
                    this.demaoFun();
                })
            }
        }
    };

    afun = () =>{
        this.demaoFun();
    }

    async getStockData(id){
        axios({
        headers: { 
            'Authorization': `Bearer ${this.state.storageData.tokendata}`,
        },
        method: 'post',
        url: `${BASE_URL}/stockDetail/getAllStockOfUserByUserName?userName=${this.state.storageData.uname}`,
        })
        .then((response) => {
            if (response.status === 200) {
                const dataResult = response.data;

                if(dataResult.length > 0){

                let users = [];
                for(var i= dataResult.length - 1; i >= 0 ; i--){
                    users.push(dataResult[i].stockSymbol);
                }

                let deletdata = [];
                for(var j= 0; j < dataResult.length ; j++){
                    deletdata.push({"stockSymbol" : dataResult[j].stockSymbol, "id" : dataResult[j].id});
                }

                this.setState({
                    deletList: deletdata,
                    isLoading: false,
                });

                axios({
                    headers: { 
                    'Cookie': "ctoken=dd44d368ddc944ddb0cf27de108f0e56",
                    },
                    method: 'get',
                    url: `https://cloud.iexapis.com/stable/stock/market/batch?types=quote&token=pk_dd324da3fb5f4428a47b05ab12f23ce2&symbols=${users}`,
                })
                .then((response) => {
                    if (response.status === 200) {
                        const result = response.data;
                        if(id != undefined){
                            document.getElementById(id).style.display = "block";
                        }
                        this.setState({
                            stocklist:result
                        })
                    }
                }) 
                .catch((error) => {
                    console.log("+++++++++140++++++++++++", error);
                });


                } else {
                this.setState({ stocklist: [] })
                }
            }
        }) 
        .catch((error) => {
        console.log("+++++++++150++++++++++++", error);
        });
    }

    handleStockddFunction = async (multi) => {
        const data = JSON.stringify({"stocks":multi});
        const resp = await axios.post(`${BASE_URL}/stockDetail/addMultipleStock`, data, {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${this.state.storageData.tokendata}`,
            }
        })

        if (resp) {
            if (resp.status === 200) {
                this.setState({
                    alertMessageStatus: true,
                    alertMessage: "New Company added Successfully",
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            alertMessageStatus: false,
                            alertMessage: ""
                        })
                    }, 2000)
                })
                this.getStockData();
            }
        }
    }

    deleteStock = async (stockName ,key) => {
        let stockId = "";
        this.state.deletList.filter(function (obj, key) {
            if(obj.stockSymbol === stockName){
                stockId = obj.id;

            }
        });

        if (stockId) {
            var delteid = JSON.stringify(stockId).replace(/"/g, "");
            var data = new FormData();
            data.append('stockId', delteid);

            const resp = await axios.post(`${BASE_URL}/stockDetail/deleteStock`, data, {
                headers: {
                    'Authorization': `Bearer ${this.state.storageData.tokendata}`,
                }
            })

            if (resp) {
                this.setState({
                    alertMessageStatus: true,
                    alertMessage: "Company delete Successfully",
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            alertMessageStatus: false,
                            alertMessage: ""
                        })
                    }, 2000)
                })
                this.getStockData();
            }
        }
    }

    render() {
        const a = null;
        return (
            <div className="container-fluid" style={{background: "#263b66"}}>  
                <div className="row" style={{background: "#263b66"}}>
                    <div className="col-md-3">
                        <Sidebar history={this.props.history} />
                    </div>
       
                    <div className="col-md-9">
                        {!this.state.isLoading &&
                            <div className="row" style={{marginTop : "20px" , overflow : "hidden"}}>
                                <div className="col-md-7" style={{overflowY: "none" , height: "100%" }}>
                                    {this.state.contacts.length != 0 ? 
                                        <div className="container">
                                            { this.state.currntdatess && this.state.contacts.filter(person => person.entryPoint != 0).map((item, i) =>    
                                                <div>    
                                                    <p style={{color : "white" , textAlign : "end"}}> {this.state.currntdatess[i]} </p>      
                                                    <HomeTwo item={item} afun ={this.afun} />
                                                </div>
                                            )}
                                        </div>
                                    :
                                        <div className="card text-white mb-3 testtoo">
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
                                        <span>
                                            <Player 
                                                handleStockddFunction={this.handleStockddFunction} 
                                            />
                                        </span>
                                        <div className="card heading" style={{background: "#263b66" , color : "white" , border : "none"}}>
                                            <table>
                                                <td className="nname">Company Name</td>
                                                <td>Price</td>
                                                <td>Change</td>
                                            </table>
                                        </div>
                                        <Stock 
                                            stocklist={this.state.stocklist} 
                                            deleteStock={this.deleteStock} 
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                        {this.state.isLoading &&
                            <div>
                                <Loader
                                    type="Puff"
                                    color="#00BFFF"
                                    height={50}
                                    width={50}
                                />
                            </div>
                        }
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
export default Home;
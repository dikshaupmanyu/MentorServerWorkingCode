import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import {BASE_URL} from '../../constants/constants';
import axios from 'axios';
import { Formik, ErrorMessage } from 'formik';
import Loader from 'react-loader-spinner';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    userName: Yup.string().required("This field is required"),
    password: Yup.string().required("This field is required")
})

class Landing extends Component {
    constructor() {
        super()
        this.state = {
            userName: '',
            password: '',
            showHide: false,
            errors: {},
            isLoader: false,
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleModalShowHide(){
        this.setState({showHide:false})
    }

    onSubmit(values) {
        this.setState({
            isLoader: true
        })
        axios({
            method: 'post',
            url: `${BASE_URL}/auth/appSignIn`,
            params: {
                userName: values.userName,
                password: values.password,
            }
        })
        .then((response) => {
            if (response.status === 200) {
                const dataResult = response.data;
                if (dataResult.accessToken) {
                    if(dataResult.userName != "admin" && dataResult.isMentor != "false"){
                        const tdss = dataResult.accessToken;
                        const tds1 = dataResult.accessTokenStreamIO;
                        const tds2 = dataResult.userName;
                        const tds3 = dataResult.id;
                        const tds4 = dataResult.accessTokenStreamIOWithID;

                        localStorage.setItem('allTokenData', JSON.stringify({
                            tokendata: tdss,
                            streamtoken: tds1,
                            uname: tds2,
                            uid: tds3,
                            streamdatatoken: tds4,
                        }));

                        this.props.history.push("/home");
                    } else {
                        this.setState({
                            showHide: true,
                            isLoader: false
                        });
                    }
                } else {
                    this.setState({
                        showHide:true,
                        isLoader: false
                    });
                }
            }
        }) 
        .catch((error) => {
            console.log("+++++++++83+++++++++++", error);
        });
    }
    
    render() {
        return (
            <div className="container-fluid">  
                <h1 className="text-center make" style={{background: "#202842",color: "white"}}>TradeTips</h1>
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <Formik
                            initialValues={{ userName: '', password: '' }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                this.onSubmit(values);
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleSubmit,
                                isSubmitting,
                                }) => (
                                <form onSubmit={handleSubmit}>
                                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                                    <div className="form-group">
                                        <label htmlFor="email">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="userName"
                                            placeholder="Enter userName"
                                            value={values.email}
                                            onChange={handleChange}
                                        />
                                        <div style={{color: 'red'}}>
                                            {errors.userName && touched.userName && errors.userName}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="password" id="pswrd"
                                            placeholder="Password"
                                            value={values.password}
                                            onChange={handleChange}
                                        />
                                        <div style={{color: 'red'}}>
                                            {errors.password && touched.password && errors.password}
                                        </div>
                                    </div>
                                    {!this.state.isLoader &&
                                        <button
                                            type="submit"
                                            className="btn btn-lg btn-primary btn-block" style={{background: "#202842",color: "white" , border : "#202842"}}
                                        >
                                            Sign in
                                        </button>
                                    }
                                    {this.state.isLoader &&
                                        <div>
                                            <Loader
                                                type="Puff"
                                                color="#00BFFF"
                                                height={50}
                                                width={50}
                                            />
                                        </div>
                                    }
                                </form>
                            )}
                        </Formik>
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
export default Landing;

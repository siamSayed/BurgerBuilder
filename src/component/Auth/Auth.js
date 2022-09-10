import React, { Component } from 'react';
import { Formik } from "formik"
import "./Auth.css"
import { auth } from "../redux/actionCreator"
import { connect } from "react-redux";
import Loading from "../loading/Loading"
import {Alert} from "reactstrap"
const mapDispatchToProps = (dispatch) => {
    return {
        auth: (email, password, mode) => dispatch(auth(email, password, mode))
    }
}
const mapStateToProps = (state) => {
    return {
        isLoading: state.isLoading,
        errorMsg: state.errorMsg,

    }
}

class Auth extends Component {
    state = {
        mode: "sign Up"
    }
    toggleSwitch = () => {
        this.setState({ mode: this.state.mode === "sign Up" ? "login" : "sign Up" })
    }

    render() {
        console.log(this.props.errorMsg)
        
        
        let form = null;
        if (!this.props.isLoading) {
            return (
                <div>
                    {this.props.errorMsg!=null ? <Alert color="danger">{this.props.errorMsg}</Alert> :null}
                    <Formik
                        initialValues={
                            {
                                email: "",
                                password: "",
                                passConfirm: ""
                            }
                        }
                        onSubmit={
                            (values) => {
                                this.props.auth(values.email, values.password, this.state.mode)
                            }
                        }
                        validate={(values) => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = "required"
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                errors.email = "invalid email input a valid mail"
                            }
                            if (!values.password) {
                                errors.password = "required"
                            } else if (values.password < 4) {
                                errors.password = "password id too short"
                            }
                            if (this.state.mode === "sign Up") {
                                if (!values.passConfirm) {
                                    errors.passConfirm = "required"
                                } else if (values.passConfirm !== values.password) {
                                    errors.passConfirm = "password did'nt match"
                                }
                            }

                            return errors

                        }}
                    >
                        {({ values, handleChange, handleSubmit, errors }) => {
                            console.log(errors)
                            return (
                                <div className="authWapper">
                                    <h1>{this.state.mode} page</h1>
                                    <form action="" className="authForm" onSubmit={handleSubmit}>
                                        <button className="switch"type='button' onClick={this.toggleSwitch}>Go to {this.state.mode === "sign Up" ? "login" : "sign Up"} page</button>
                                        <input type="email" className='email' name='email' placeholder='enter your email' value={values.email} onChange={handleChange} />
                                        <p className='errors'>{errors.email}</p>
                                        <br />
                                        <input type="password" className='password' name="password" placeholder='enter your password' value={values.password} onChange={handleChange} />
                                        <p className='errors'>{errors.password}</p>
                                        <br />

                                        {this.state.mode === "sign Up" ?
                                            <>
                                                <input type="password" className='passConfirm' name="passConfirm" placeholder='confirm your password' value={values.passConfirm} onChange={handleChange} />
                                                <p className='errors'>{errors.passConfirm}</p>

                                                <br />

                                            </>
                                            : null}

                                        <button type='submit' className="button">submit</button>

                                    </form>
                                </div>
                            )
                        }}
                    </Formik>
                </div>
            )
        } else {
            return <Loading />

        }
        return (
            <>

            { form }
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
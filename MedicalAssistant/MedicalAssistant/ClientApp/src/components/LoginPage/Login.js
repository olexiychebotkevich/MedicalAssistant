import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../home.css';
import * as usersActions from './reducer';
import get from 'lodash.get';
import { push } from 'connected-react-router';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  Form,
  Input,
  Icon,
  Button,
} from 'antd';



const propTypes = {
  loginUser: PropTypes.func.isRequired,
  IsLoading: PropTypes.bool.isRequired,
  IsFailed: PropTypes.bool.isRequired,
  IsSuccess: PropTypes.bool.isRequired,
  login: PropTypes.object.isRequired,
  statuscode: PropTypes.number,
  errors: PropTypes.object
};

const defaultProps = {};


class NormalLoginForm extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      login: {},
    }
  }


  static getDerivedStateFromProps = (props, state) => {

    //console.log('---nextProps---', props);
    return {
      loading: props.IsLoading,
      login: { ...props.login }
    };
  }


  componentDidUpdate(prevProps) {
    console.log("prevProps: ",prevProps);

    if (this.props.errors !== prevProps.errors) {
        console.log("----------------------this.props.errors !== prevProps.errors: ",prevProps);

        this.props.form.validateFields((error, values) => {
   

            if (!error) {
                console.log("----statuscode: ",this.props.statuscode);
                if (this.props.statuscode === 400) {
                   if(this.props.errors.invalid==="Email does not exist")
                   {
                    this.props.form.setFields({
                      username: {
                            username:values.username,
                            errors: [new Error(this.props.errors.invalid)],
                        },
                    });
                   }
                   if(this.props.errors.invalid==="No correct password")
                   {
                    this.props.form.setFields({
                      password: {
                            value:values.password,
                            errors: [new Error(this.props.errors.invalid)],
                        },
                    });
                  }
                }

            } else {
                console.log('error', error, values);
            }
           

        });

    }
}





  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const usermodel = {
          Password: values.password,
          Email: values.username,
        };
        console.log('Received values of form: ', usermodel);
        this.props.loginUser(usermodel);
      }
    });
  };


  strongValidator = (rule, value, callback) => {
    const digitsRegex = /(?=.*?[0-9])/;
    const uppercaseRegex = /(?=.*?[A-Z])/;
    if (!value.match(digitsRegex) || !value.match(uppercaseRegex)) {

        return callback('Password should contain uppercase letter etc')
    }
    callback()
}

  render() {



    const { getFieldDecorator } = this.props.form;
    return (


      <div className="container">

        <h1 className="header">Medical Assistant</h1>


        <div className="col-12 col-sm-10 col-md-6 col-lg-4 ">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                        initialValue: undefined,
                        rules: [
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },

                        ],
                    })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                        initialValue: undefined,
                        rules: [
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                min: 8,
                                message: "The field Password  must contain 8 symbols!"
                            },
                            {
                                validator: this.strongValidator
                            }
                        ],
                    })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}

            </Form.Item>
            <Form.Item>
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>
            <Form.Item>
              <div className="row">
                <div className="col-6">
                  <Button type="dashed" htmlType="submit" className="login-form-button" >
                    Login
                  </Button>
                </div>
                <div className="col-6">
                  <Button type="dashed" htmlType="submit" className="register-form-button" >
                    Register
                  </Button>
                </div>
              </div>
            </Form.Item>
          </Form>



        </div>
      </div>




    );
  }
}


const mapState = (state) => {
  return {
    IsLoading: get(state, 'loginReducer.login.loading'),
    IsFailed: get(state, 'loginReducer.login.failed'),
    IsSuccess: get(state, 'loginReducer.login.success'),
    login:
    {
      IsLoading: get(state, 'loginReducer.login.loading'),
      IsFailed: get(state, 'loginReducer.login.failed'),
      IsSuccess: get(state, 'loginReducer.login.success'),
      
    },
    statuscode: get(state, 'loginReducer.login.statuscode'),
    errors: get(state, 'loginReducer.login.errors'),
  }
}


const mapDispatch = {

  loginUser: (user) => {
    return usersActions.loginUser(user);
  },
  
  push: (url) => {
    return (dispatch) => {
      dispatch(push(url));
    }
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
WrappedNormalLoginForm.propTypes = propTypes;
WrappedNormalLoginForm.defaultProps = defaultProps;
export default connect(mapState, mapDispatch)(WrappedNormalLoginForm);

import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../home.css';

import {
    Form,
    Input,
    Icon,
    Typography ,
    Button,
} from 'antd';





class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {

  
const { Title } = Typography;
    const { getFieldDecorator } = this.props.form;
    return (
      
//  <h1>
//   Medical Assistant
//  </h1>
    
       
<div className="container-fluid">
 
<h1 className="header">Medical Assistant</h1>
  

          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
              <a className="login-form-forgot" href="">
            Forgot password
          </a>
            </Form.Item>
            
              <Form.Item>
              <div className="row">
              <div className="col-6">
             
        <Button type="dashed" htmlType="submit" className="login-form-button" >
             Log in
          </Button>
           </div>
          <div className="col-6">
          <Button type="dashed" htmlType="submit"  className="register-form-button" >
          Register
          </Button>
           </div>
          </div>
        </Form.Item>
          </Form>
        
       
 
 
  </div>
        
         
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default WrappedNormalLoginForm;
import React, { Component } from 'react';
import 'antd/dist/antd.css';

import './index.css';
import {
  Steps, Divider, Row, Icon
} from 'antd';




class FooterForm extends React.Component {
 
  render() {
  
    
    return (


      <div className="wrapper">

      <div className="content"></div>
    
      <div className="footer">
     
      <p><Icon type="phone" /> Phone</p>
    <p> <Icon type="instagram" /> Instagram</p>
    <p><Icon type="mail" /> mail</p>
    <p><Icon type="mail" /> mail</p>

      </div>
    
    </div>
  
  
    );
  }
}


export default FooterForm;
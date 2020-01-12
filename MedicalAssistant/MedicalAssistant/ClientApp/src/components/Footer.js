import React, { Component } from 'react';
import 'antd/dist/antd.css';

import './footer.css';
import {
  Steps, Divider, Row, Icon
} from 'antd';




class FooterForm extends React.Component {
 
  render() {
  
    
    return (
<div >

 
  
  <footer className="footer" >
      
  <p><Icon type="phone" /> Phone</p>
    <p> <Icon type="instagram" /> Instagram</p>
    <p><Icon type="mail" /> mail</p>
    </footer>
 
    </div>  
    );
  }
}


export default FooterForm;
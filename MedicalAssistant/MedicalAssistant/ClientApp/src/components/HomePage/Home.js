import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../home.css';

import {
  Steps, Divider, Row
} from 'antd';




const { Step } = Steps;



class NormalHomeForm extends React.Component {
  state = {
    current: 0,
  };
  onChange = current => {
    console.log('onChange:', current);
    this.setState({ current });
  };
  render() {
  
    const { current } = this.state;
    return (
<div className="tmp">
  <div  style={{width:'60%'}}>    


 <Steps  current={current} onChange={this.onChange} direction="vertical">
   <Step  title="Step 1" description="This is a description." />
   <Step title="Step 2" description="This is a description." />
   <Step title="Step 3" description="This is a description." >
     </Step>
 </Steps>
 </div>
 </div> 
    );
  }
}


export default NormalHomeForm;
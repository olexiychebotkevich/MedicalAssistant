import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../home.css';
import './index.css';
import { Link } from "react-router-dom";


import {
  Row, Card, Col
} from 'antd';





class NormalMorePatientForm extends React.Component {
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
      <div className="container divv" >
       <h3 className="moreHeader"> Name Surname</h3>
        <Row gutter={16}>

          <Col xs={25} sm={25} md={12} lg={8} xl={8}>
         
            <Card className="cards" title="Діагноз" headStyle={{ color: 'rgb(221, 252, 200)', fontFamily: 'Candara', fontStyle: 'Normal'  }}>
            <p className="pstyle"> Name</p>
            <p className="pstyle"> Date</p>
            <Link  style={{ color: 'white' }} to="/patient/morerecipe">Детальніше</Link>
            </Card>

          </Col>


        </Row>


      </div>

    );

  }


}

// const mapState = (state) => {
//   return {
//       patient: get(state, 'patientsReducer.detailedpatient.patient')
//   }
// }




export default NormalMorePatientForm;
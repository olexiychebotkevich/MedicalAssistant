import React, { Component } from 'react';
import  'antd/dist/antd.css';
import '../HomePage/home.css';

import {
  Row, Card, Col
} from 'antd';





class NormalMoreForm extends React.Component {
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
        <h3 className="moreHeader"> Діагноз</h3>
        <Row gutter={16}>

          <Col xs={25} sm={25} md={12} lg={8} xl={8}>
            <Card className="cards" title="Name Pill" headStyle={{ color: 'rgb(221, 252, 200)', fontFamily: 'Candara', fontStyle: 'Normal' }} >
              <p className="pstyle" >Кількість днів</p>
              <p className="pstyle">Особливості прийому</p>
              <p className="pstyle">Кількість разів в день</p>

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




export default NormalMoreForm;
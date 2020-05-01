import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../HomePage/home.css';
import './index.css';
import PropTypes from "prop-types";
import get from 'lodash.get';
import { connect } from "react-redux";
import SpinnerWidget from '../spinner';


import {
  Row, Card, Col, Button
} from 'antd';


const propTypes = {
  session: PropTypes.object,
};


const defaultProps = {};


class NormalSessionForm extends React.Component {
  state = {
    session: null
  };




  static getDerivedStateFromProps = (props, state) => {
    return {
      session: props.session
    };
  }

  render() {

    const { session } = this.state;
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    const diagnoslength = 30;
    return (
      <div>
        {session ?
          <div className="container divv" >
            <h3 className="moreHeader"> Пацієнт: {session.patientName} {session.patientSurname}</h3>
            <h3 className="moreHeader"> Діагноз: {session.recipe.diagnos}</h3>
            <h3 className="moreHeader"> Ліки</h3>


            <Row gutter={16}>
              {session ?
                 session.recipe.tablets.map((pill, index) =>
                 <Col xs={25} sm={25} md={12} lg={8} xl={8}>
                   <Card key={index} className="cards"  title={pill.name} headStyle={{ color: ' rgb(221, 252, 200)', fontFamily: 'Candara' }} style={{ backgroundColor: 'rgb(157,181,167)', fontFamily: 'Candara', fontWeight: '500', marginTop: "10px" }} >
                     <p className="pstyle" >Кількість днів: {pill.countdays}</p>
                     <p className="pstyle">Особливості прийому: {pill.receptionfeatures}</p>
                     <p className="pstyle">Кількість разів в день: {pill.counttimesaday}</p>
   
                   </Card>
   
                 </Col>
                ) :
                null
              }
            </Row>
     </div>
     : null}
    </div>

    );

  }


}

const mapState = (state) => {
  return {
          session: get(state, 'doctorsReducer.getsession.session')
  }
}


NormalSessionForm.propTypes = propTypes;
NormalSessionForm.defaultProps = defaultProps;
export default connect(mapState)(NormalSessionForm);

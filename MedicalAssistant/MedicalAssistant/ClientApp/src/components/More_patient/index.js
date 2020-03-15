import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../HomePage/home.css';
import './index.css';
import PropTypes from "prop-types";
import get from 'lodash.get';
import { connect } from "react-redux";
import SpinnerWidget from '../spinner';


import {
  Row, Card, Col,Button
} from 'antd';


const propTypes = {
  patient: PropTypes.object,
};

const defaultProps = {};


class NormalMorePatientForm extends React.Component {
  state = {
   patient:null
  };

  static getDerivedStateFromProps = (props, state) => {
    return {
      patient: props.patient
    };
  }
 
  render() {

    const { patient } = this.state;
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    const diagnoslength = 30;
    return (
    <div>
      {patient ? 
      <div className="container divv" >
      <h3 className="moreHeader"> {patient.userName} {patient.userSurname}</h3>
            <Row gutter={16}>



              {patient?
                patient.recipes.map((recipe, index) =>
                  <Col xs={25} sm={25} md={8} lg={8} xl={8}>
                    <Card key={index} title="Рецепт" extra={<Button type="link" onClick={(e) => this.SelectRecipe(index, e)} style={{ color: 'white' }}>More</Button>} headStyle={{ color: ' rgb(221, 252, 200)', fontFamily: 'Candara' }} style={{ backgroundColor: 'rgb(157,181,167)', fontFamily: 'Candara', fontWeight: '500', marginTop: "10px" }}>
                      <p className="textr">Діагноз: {recipe.diagnos.length > diagnoslength ? recipe.diagnos.substring(0, diagnoslength) + "..." : recipe.diagnos}</p>
                      <p className="textr">Лікар: {recipe.doctor.doctorSpecialty+": "+ recipe.doctor.userSurname + " " + recipe.doctor.userName}</p>
                      <p className="textr">Дата:{new Date(recipe.date).toLocaleString("ua", options)}</p>
                    </Card>
                  </Col>
                ) :
                <SpinnerWidget loading="true" />}


            </Row>


     </div>
     : null}
    </div>

    );

  }


}

const mapState = (state) => {
  return {
      patient: get(state, 'doctorsReducer.getpatient.patient')
  }
}


NormalMorePatientForm.propTypes = propTypes;
NormalMorePatientForm.defaultProps = defaultProps;
export default connect(mapState)(NormalMorePatientForm);

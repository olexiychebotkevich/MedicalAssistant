import React, { Component } from 'react';
import { Row,Card,Col, Button } from 'antd';
import 'antd/dist/antd.css';
import * as getpatientActions from './reducer';
import { push } from 'connected-react-router';
import get from 'lodash.get';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import jwt from 'jsonwebtoken';
import '../home.css';
import './pagepatient.css';

const propTypes = {
    GetDetailedPatient: PropTypes.func.isRequired,
    IsLoading: PropTypes.bool.isRequired,
    IsFailed: PropTypes.bool.isRequired,
    IsSuccess: PropTypes.bool.isRequired,
    errors: PropTypes.object,
    statuscode: PropTypes.number,
    user: PropTypes.object,
    patient: PropTypes.object
};

const defaultProps = {};



class PagePatient extends Component {

  constructor(props) {
    super(props);
    this.state = {
        user:null,
        detailedpatient:null,
        errors: {},
        errorsServer: {},
        token : localStorage.getItem('jwtToken')

    }
}



componentDidMount() {
  const patient ={
    id:this.state.user.id,
    token:this.state.token
  }

  this.props.GetDetailedPatient(patient);
}

static getDerivedStateFromProps = (props, state) => {
  return {
      user: props.user,
      errorsServer: props.errors,
      detailedpatient:props.patient
  };
}


  render() {
    console.log("user: ",this.state.user);
    console.log("detailed patient: ",this.state.detailedpatient);
    return (
        <div style={{ backgroundColor: 'rgb(151, 201, 218)', padding: '30px', marginBottom: '25px',marginTop: '5px' }}>
           <div className="row">
               <div className="col-12 col-sm-4">
            <img style={{height:'200px', width: '200px', display:'block', margin: 'auto'}} src=" https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" alt="Photo"/>
            </div>
            <div className="col-12 col-sm-8 p">
                <p style={{ fontFamily:"Bradley Hand, cursive	", color: 'whitesmoke'}}> Name:  {this.state.detailedpatient ? this.state.detailedpatient.userName : null} </p>
                <p style={{marginTop: '10px', fontFamily:"Bradley Hand, cursive	", color: 'whitesmoke'}}>Surname: {this.state.detailedpatient ? this.state.detailedpatient.userSurname : null}</p>
                <p style={{marginTop: '10px', fontFamily:"Bradley Hand, cursive	", color: 'whitesmoke'}}>Date of birth: {this.state.detailedpatient ? this.state.detailedpatient.dateOfBirth : null}</p>
                <p style={{marginTop: '10px', fontFamily:"Bradley Hand, cursive	", color: 'whitesmoke'}}>Email: {this.state.detailedpatient ? this.state.detailedpatient.user.userName : null}</p>
                <p style={{marginTop: '10px', fontFamily:"Bradley Hand, cursive	", color: 'whitesmoke'}}>Phone: {this.state.detailedpatient ? this.state.detailedpatient.user.phoneNumber : null} </p>
                <p style={{marginTop: '10px', fontFamily:"Bradley Hand, cursive	", color: 'whitesmoke'}}>Address: {this.state.detailedpatient ? this.state.detailedpatient.locality : null}</p>
               </div>
        </div>
          
        <Row gutter={16}>
       
          <Col xs={25} sm={25} md={8} lg={8} xl={8}>
          <Card title="Illness" extra={<a href="#">More</a>} style={{backgroundColor: 'whitesmoke',marginTop:"10px"  }}>
      <p>Pill 1</p>
      <p>Pill 2</p>
      <p>Pill 3</p>
    
    </Card>
          </Col>
         
          <Col xs={25} sm={25} md={8} lg={8} xl={8}>
          <Card title="Illness" extra={<a href="#">More</a>} style={{backgroundColor: 'whitesmoke',marginTop: "10px" }}>
      <p>Pill 1</p>
      <p>Pill 2</p>
      <p>Pill 3</p>
     
    </Card>
          </Col>
          
          <Col xs={25} sm={25} md={8} lg={8} xl={8}>
          <Card title="Illness" extra={<a href="#">More</a>} style={{backgroundColor: 'whitesmoke',marginTop:"10px" }}>
      <p>Pill 1</p>
      <p>Pill 2</p>
      <p>Pill 3</p>
     
    </Card>
        </Col>
        <Col xs={25} sm={25} md={8} lg={8} xl={8}>
          <Card title="Illness" extra={<a href="#">More</a>} style={{backgroundColor: 'whitesmoke',marginTop:"10px" }}>
      <p>Pill 1</p>
      <p>Pill 2</p>
      <p>Pill 3</p>
     
    </Card>
        </Col>
      
          </Row>
      {/* <FooterForm/> */}
      </div>
    );
  }
}



const mapState = (state) => {
  return {
      IsLoading: get(state, 'patientsReducer.detailedpatient.loading'),
      IsFailed: get(state, 'patientsReducer.detailedpatient.failed'),
      IsSuccess: get(state, 'patientsReducer.detailedpatient.success'),
      user:get(state, 'loginReducer.user'),
      errors: get(state, 'patientsReducer.detailedpatient.errors'),
      statuscode: get(state, 'patientsReducer.detailedpatient.statuscode'),
      patient: get(state, 'patientsReducer.detailedpatient.patient')



  }
}

const mapDispatch = {

  GetDetailedPatient: (user) => {
      return getpatientActions.GetDetailedPatient(user);
  },

  push: (url) => {
      return (dispatch) => {
          dispatch(push(url));
      }
  }
}



PagePatient.propTypes = propTypes;
PagePatient.defaultProps = defaultProps;

export default connect(mapState, mapDispatch)(PagePatient);

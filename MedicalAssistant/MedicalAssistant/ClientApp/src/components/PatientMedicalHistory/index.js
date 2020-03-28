import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../HomePage/home.css';
import './index.css';
import PropTypes from "prop-types";
import get from 'lodash.get';
import { connect } from "react-redux";
import SpinnerWidget from '../spinner';
import * as sessionsActions from './reducer';
import { Link } from 'react-router-dom';
import * as doctorActions from '../DoctorPage/reducer';


import {
  Row, Card, Col, Button
} from 'antd';


const propTypes = {
    GetSessions: PropTypes.func.isRequired,
    getDetailedSession: PropTypes.func.isRequired,
    sessions: PropTypes.object,
    PatientId: PropTypes.number,
};


const defaultProps = {};


class MedicalHistory extends Component {
  state = {
    sessions: null,
    PatientId:0
  };


  componentDidMount() {
    this.props.GetSessions(this.state.PatientId);
  }

  static getDerivedStateFromProps = (props, state) => {
    return {
        sessions: props.sessions,
        PatientId:props.PatientId
    };
  }

  getDetailedSession = (sessionid, e) => {
    e.preventDefault();
    this.props.getDetailedSession(sessionid);
  }

  render() {

    const { sessions } = this.state;

    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      };
      const diagnoslength = 30;

    
   
    return (
        <div>
            <Row gutter={16}>
                {sessions ?
                    sessions.map((session, index) =>
                        <Col xs={25} sm={25} md={8} lg={8} xl={8}>
                            <Card key={index} title={session.doctorSpeciality} extra={<Button type="link" style={{ color: 'rgb(221, 252, 200)' }} onClick={(e) => this.getDetailedSession(session.id, e)}>Детальніше</Button>} headStyle={{ color: ' rgb(221, 252, 200)', fontFamily: 'Candara' }} style={{ backgroundColor: 'rgb(157,181,167)', fontFamily: 'Candara', fontWeight: '500', marginTop: "10px" }}>
                                <p className="textr" style={{color:'rgb(221, 252, 200)'}}>Діагноз: {session.diagnos.length > diagnoslength ? session.diagnos.substring(0, diagnoslength) + "..." : session.diagnos}</p>
                                <p className="textr" style={{color:'rgb(221, 252, 200)'}}>Лікар: {session.doctorSurname + " " + session.doctorName}</p>
                                <p className="textr" style={{color:'rgb(221, 252, 200)'}}>Дата:{new Date(session.date).toLocaleString("ua", options)}</p>
                            </Card>
                        </Col>
                    ) : <SpinnerWidget loading="true" />
                }
            </Row>
        </div>
    );

  }


}

const mapState = (state) => {
  return {
          sessions: get(state, 'medicalhistoryReducer.getsessions.sessions'),
          PatientId: get(state,"MedicalSessionReducer.getpatient.patient.patientID")
  }
}

const mapDispatch = {

    GetSessions: (PatientId) => {
      return sessionsActions.GetSessions(PatientId);
    },
    getDetailedSession: (patientID) => {
        return doctorActions.getDetailedSession(patientID);
      },
  }


MedicalHistory.propTypes = propTypes;
MedicalHistory.defaultProps = defaultProps;
export default connect(mapState,mapDispatch)(MedicalHistory);

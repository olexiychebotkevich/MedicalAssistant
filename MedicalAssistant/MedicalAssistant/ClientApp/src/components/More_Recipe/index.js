import React, { Component } from 'react';
import  'antd/dist/antd.css';
import '../HomePage/home.css';
import PropTypes from "prop-types";
import get from 'lodash.get';
import { connect } from "react-redux";
import SpinnerWidget from '../spinner';
import './index.css';
import {
  Row, Card, Col
} from 'antd';


const propTypes = {
  session: PropTypes.object,
};

const defaultProps = {};


class NormalMoreForm extends Component {
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
   console.log("mor recipe: ",session);
    return (
      <div className="container divv" >
       <h3 className="moreHeader"> Діагноз: {session.recipe.diagnos}</h3>
        <Row gutter={16}>
          {session ?
            session.recipe.tablets.map((pill, index) =>
              <Col xs={25} sm={25} md={12} lg={8} xl={8}>
                <Card key={index} className="cards" title={pill.name} headStyle={{ color: ' rgb(221, 252, 200)', fontFamily: 'Candara' }} style={{ backgroundColor: 'rgb(157,181,167)', fontFamily: 'Candara', fontWeight: '500', marginTop: "10px" }} >
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

    );

  }


}

const mapState = (state) => {
  return {
      session: get(state, 'patientsReducer.detailedpatient.detailedrecipe')
  }
}




NormalMoreForm.propTypes = propTypes;
NormalMoreForm.defaultProps = defaultProps;
export default connect(mapState)(NormalMoreForm);

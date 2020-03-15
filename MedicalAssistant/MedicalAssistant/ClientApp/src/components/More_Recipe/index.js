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
  recipe: PropTypes.object,
};

const defaultProps = {};


class NormalMoreForm extends React.Component {
  state = {
    reipe:null,
  };

  static getDerivedStateFromProps = (props, state) => {
    return {
      recipe: props.recipe
    };
  }

  render() {

    const { recipe } = this.state;
    return (
      <div className="container divv" >
        <h3 className="moreHeader"> Діагноз : {recipe.diagnos}</h3>
        <Row gutter={16}>

          {this.state.recipe ?
            recipe.tablets.map((pill, index) =>
              <Col xs={25} sm={25} md={12} lg={8} xl={8}>
                <Card key={index} className="cards"  title={pill.name} headStyle={{ color: ' rgb(221, 252, 200)', fontFamily: 'Candara' }} style={{ backgroundColor: 'rgb(157,181,167)', fontFamily: 'Candara', fontWeight: '500', marginTop: "10px" }} >
                  <p className="pstyle" >Кількість днів: {pill.countdays}</p>
                  <p className="pstyle">Особливості прийому: {pill.receptionfeatures}</p>
                  <p className="pstyle">Кількість разів в день: {pill.counttimesaday}</p>

                </Card>

              </Col>
            ) :
            <SpinnerWidget loading="true" />}

         


        </Row>


      </div>

    );

  }


}

const mapState = (state) => {
  return {
      recipe: get(state, 'patientsReducer.detailedpatient.detailedrecipe')
  }
}




NormalMoreForm.propTypes = propTypes;
NormalMoreForm.defaultProps = defaultProps;
export default connect(mapState)(NormalMoreForm);

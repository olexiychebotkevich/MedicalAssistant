import React, { Component } from 'react';
import { Row, Card, Col, Button, Input } from 'antd';
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import * as patientActions from './reducer';
import { push } from 'connected-react-router';
import get from 'lodash.get';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import '../home.css';
import './index.css';
import QRCode from 'qrcode'
import CropperWidget from '../CropperWidgetContainer';
import SpinnerWidget from '../spinner';




const propTypes = {
  GetDetailedPatient: PropTypes.func.isRequired,
  changeImage: PropTypes.func.isRequired,
  IsLoading: PropTypes.bool.isRequired,
  IsFailed: PropTypes.bool.isRequired,
  IsSuccess: PropTypes.bool.isRequired,
  errors: PropTypes.object,
  user: PropTypes.object,
  patient: PropTypes.object,
  UpdatepatientLoading: PropTypes.bool.isRequired,
  UpdatepatientFailed: PropTypes.bool.isRequired,
  UpdatepatientSuccess: PropTypes.bool.isRequired

};

const defaultProps = {};



class PagePatient extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      detailedpatient: null,
      errorsServer: {},
      token: localStorage.getItem('jwtToken'),
      ImagePath: "",
      imagechanged: false,
      isCropped: false,
      src: '',
      serverurl: "http://localhost:54849",
      startimage: require("../images/Placeholder.jpg"),
      UpdatepatientLoading: false,
      UpdatepatientFailed: false,
      UpdatepatientSuccess: false,
      GetID: false,
      IsLoading: false,
      IsSuccess: false


    };


  }



  componentDidMount() {
    const patient = {
      id: this.state.user.id,
      token: this.state.token
    }

    this.props.GetDetailedPatient(patient);

  }

  static getDerivedStateFromProps = (props, state) => {
    return {
      user: props.user,
      errorsServer: props.errors,
      detailedpatient: props.patient,
      UpdatepatientLoading: props.UpdatepatientLoading,
      UpdatepatientFailed: props.UpdatepatientFailed,
      UpdatepatientSuccess: props.UpdatepatientSuccess,
      IsLoading: props.IsLoading
    };
  }

  onselectImage = (e) => {
    this.inputFileElement.click();
  }

  GetMyID = (e) => {
    { this.state.GetID ? this.setState({ GetID: false }) : this.setState({ GetID: true }) };
  }


  croppImage = (value) => {
    this.setState({ ImagePath: value, imagechanged: true, isCropped: false });
  }

  onCloseCropper = (e) => {
    e.preventDefault();
    this.setState({ isCropped: false });

  }

  onChangeSelectFile = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    if (files && files[0]) {
      if (files[0].type.match(/^image\//)) {
        const reader = new FileReader();
        reader.onload = () => {

          this.setState({ src: reader.result, isCropped: true });


        };
        reader.readAsDataURL(files[0]);

      }
      else {
        alert("Невірний тип файлу");
      }
    }
    else {
      alert("Будь ласка виберіть файл");
    }
  }


  changeImage = e => {
    e.preventDefault();
    const user = {
      id: this.state.user.id,
      token: this.state.token
    }
    this.setState({ imagechanged: false });
    const { detailedpatient, ImagePath } = this.state;
    detailedpatient.imagePath = ImagePath;
    this.props.changeImage(user, detailedpatient);

  }

  cancelchangeImage = e => {
    e.preventDefault();
    this.setState({ imagechanged: false });
  }


  generateQR = e => {
    e.preventDefault();
    console.log("generate qr");
    let str = ("Hello world");
    QRCode.toCanvas(document.getElementById('canvas'), str, function (error) {
      if (error) console.error(error)
    })
  }


  render() {
    let GetID = false;
    const { src, isCropped } = this.state;
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
      const diagnoslength = 30;
      return(
      <div>

          {this.state.IsLoading === false && this.state.detailedpatient ?
              <div style={{ backgroundColor: 'rgb(151, 201, 218)', padding: '30px', marginBottom: '25px', marginTop: '5px' }}>



                  <div className="row">
                      <div className="col-12 col-sm-4">


                          <img
                              onClick={this.onselectImage}
                              className="imgUpload"
                              //src={this.state.detailedpatient.imagePath === "" || this.state.imagechanged ? (this.state.ImagePath !== "" ? this.state.ImagePath : this.state.startimage) : (this.state.UpdatepatientLoading ? this.state.ImagePath : this.state.serverurl + this.state.detailedpatient.imagePath)}
                              src={this.state.detailedpatient.imagePath}
                              onError={this.state.ImagePath !== "" ? (e) => { e.target.onerror = null; e.target.src = this.state.ImagePath } : (e) => { e.target.onerror = null; e.target.src = this.state.startimage }}
                              width="500px">

                          </img>

                          {this.state.imagechanged ? <Button type="primary" onClick={this.changeImage}>Save</Button> : null}
                          {this.state.imagechanged ? <Button type="danger" onClick={this.cancelchangeImage}>Cancel</Button> : null}


                          <input ref={input => this.inputFileElement = input} onChange={this.onChangeSelectFile} type="file" className="d-none"></input>

                          <CropperWidget loading={isCropped} src={src} onClose={this.onCloseCropper} croppImage={this.croppImage} />
                      </div>
                      <div className="col-12 col-sm-6 p">
                          <p style={{ fontFamily: "Bradley Hand, cursive	", color: 'whitesmoke' }}> Ім'я:  {this.state.detailedpatient ? this.state.detailedpatient ?.userName : null} </p>
                          <p style={{ marginTop: '10px', fontFamily: "Bradley Hand, cursive	", color: 'whitesmoke' }}>Прізвище: {this.state.detailedpatient ? this.state.detailedpatient.userSurname : null}</p>
                          <p style={{ marginTop: '10px', fontFamily: "Bradley Hand, cursive	", color: 'whitesmoke' }}>Дата народження: {this.state.detailedpatient ? new Date(this.state.detailedpatient.dateOfBirth).toLocaleString("ua", options) : null}</p>
                          <p style={{ marginTop: '10px', fontFamily: "Bradley Hand, cursive	", color: 'whitesmoke' }}>Email: {this.state.detailedpatient ? this.state.detailedpatient.user.userName : null}</p>
                          <p style={{ marginTop: '10px', fontFamily: "Bradley Hand, cursive	", color: 'whitesmoke' }}>Номер телефону: {this.state.detailedpatient ? this.state.detailedpatient.user.phoneNumber : null} </p>
                          <p style={{ marginTop: '10px', fontFamily: "Bradley Hand, cursive	", color: 'whitesmoke' }}>Місто: {this.state.detailedpatient ? this.state.detailedpatient.locality : null}</p>
                      </div>
                  </div>

                  <Row gutter={16}>
                      {this.state.detailedpatient ?
                          this.state.detailedpatient.recipes.map((recipe) =>
                              <Col xs={25} sm={25} md={8} lg={8} xl={8}>
                                  <Card title="Рецепт" extra={<Link to="/patient/morerecipe">More</Link>} style={{ backgroundColor: 'whitesmoke', marginTop: "10px" }}>
                                      <p>Діагноз: {recipe.diagnos.length > diagnoslength ? recipe.diagnos.substring(0, diagnoslength) + "..." : recipe.diagnos}</p>
                                      <p>Лікар: {recipe.doctor.userSurname + " " + recipe.doctor.userName}</p>
                                      <p>Дата:{new Date(recipe.date).toLocaleString("ua", options)}</p>
                                  </Card>
                              </Col>
                          ) :
                          null}
                  </Row>




                  <Row style={{ marginTop: "5%" }} type="flex" justify="center">

                      <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                          <div style={{ width: "100%" }} >
                              <Button onClick={this.generateQR}>
                                  Згенерувати QR-код!
              </Button>

                          </div>
                          <canvas style={{ marginTop: "2%" }} id="canvas" />
                      </Col>
                      <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                          <div>
                              <Button onClick={this.GetMyID}>
                                  Згенерувати простий код
              </Button>
                              {this.state.GetID ? <Input value={this.state.user.id} disabled placeholder="Your ID" /> : null}
                          </div>
                      </Col>

                  </Row>

              </div>
              : <SpinnerWidget loading="true" />}
      </div>
      );
  }
}



const mapState = (state) => {
  return {
    IsLoading: get(state, 'patientsReducer.detailedpatient.loading'),
    IsFailed: get(state, 'patientsReducer.detailedpatient.failed'),
    IsSuccess: get(state, 'patientsReducer.detailedpatient.success'),
    user: get(state, 'loginReducer.user'),
    errors: get(state, 'patientsReducer.detailedpatient.errors'),
    patient: get(state, 'patientsReducer.detailedpatient.patient'),
    UpdatepatientLoading: get(state, 'patientsReducer.updatepatient.loading'),
    UpdatepatientFailed: get(state, 'patientsReducer.detailedpatient.failed'),
    UpdatepatientSuccess: get(state, 'patientsReducer.detailedpatient.success')



  }
}

const mapDispatch = {

  GetDetailedPatient: (user) => {
    return patientActions.GetDetailedPatient(user);
  },

  changeImage: (user, detaileduser) => {
    return patientActions.changeImage(user, detaileduser);
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

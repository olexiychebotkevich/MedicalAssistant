import React, { Component } from 'react';
import { Row, Card, Col, Button, Input } from 'antd';
import 'antd/dist/antd.css';
import * as doctorActions from './reducer';
import { push } from 'connected-react-router';
import get from 'lodash.get';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import '../home.css';
import './index.css';
import CropperWidget from '../CropperWidgetContainer';
import SpinnerWidget from '../spinner';
import QrReader from 'react-qr-reader';


const propTypes = {
  GetDetailedDoctor: PropTypes.func.isRequired,
  AddRecipe: PropTypes.func.isRequired,
  changeImage: PropTypes.func.isRequired,
  IsLoading: PropTypes.bool.isRequired,
  IsFailed: PropTypes.bool.isRequired,
  IsSuccess: PropTypes.bool.isRequired,
  errors: PropTypes.object,
  statuscode: PropTypes.number,
  user: PropTypes.object,
  doctor: PropTypes.object,
  UpdatedoctorLoading: PropTypes.bool.isRequired,
  UpdatedoctorFailed: PropTypes.bool.isRequired,
  UpdatedoctorSuccess: PropTypes.bool.isRequired

};

const defaultProps = {};

class PageDoctor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      detaileddoctor: null,
      errors: {},
      errorsServer: {},
      token: localStorage.getItem('jwtToken'),
      ImagePath: "",
      imagechanged: false,
      isCropped: false,
      src: '',
      serverurl: "http://localhost:54849",
      startimage: require("../images/Placeholder.jpg"),
      UpdatedoctorLoading: false,
      UpdatedoctorFailed: false,
      UpdatedoctorSuccess: false,
      patientID: null,
      IsLoading: false



    };


  }

  componentDidMount() {
    const doctor = {
      id: this.state.user.id,
      token: this.state.token
    }

    this.props.GetDetailedDoctor(doctor);

  }

  static getDerivedStateFromProps = (props, state) => {
    return {
      user: props.user,
      errorsServer: props.errors,
      detaileddoctor: props.doctor,
      UpdatedoctorLoading: props.UpdatedoctorLoading,
      UpdatedoctorFailed: props.UpdatedoctorFailed,
      UpdatedoctorSuccess: props.UpdatedoctorSuccess,
      IsLoading: props.IsLoading
    };
  }

  onselectImage = (e) => {
    this.inputFileElement.click();
  }

  AddRecipe = (e) => {
    e.preventDefault();
    const doctor = {
      id: this.state.user.id,
      token: this.state.token
    }
    this.props.AddRecipe(doctor, this.state.patientID);
  }

  croppImage = (value) => {
    this.setState({ ImagePath: value, imagechanged: true, isCropped: false });
  }

  onCloseCropper = (e) => {
    e.preventDefault();
    this.setState({ isCropped: false });

  }

  updatePatientIDValue = (val) => {
    this.setState({
      patientID: val.target.value
    });
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
    const { detaileddoctor, ImagePath } = this.state;
    detaileddoctor.imagePath = ImagePath;
    this.props.changeImage(user, detaileddoctor);

  }


  cancelchangeImage = e => {
    e.preventDefault();
    this.setState({ imagechanged: false });
  }

  // routeChange=()=> {
  //   let path = ``;
  //   this.props.history.push(path);
  // }

  handleScan = data => {
    if (data) {
      console.log("handleScan: ", data);
    }

  }

  render() {

    const { src, isCropped } = this.state;
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    return (
      <div>
        {this.state.IsLoading === false ?
          <div style={{ backgroundColor: 'transparent', padding: '30px', marginBottom: '25px', marginTop: '5px' }}>
            <h3 className="moreHeader"> Особистий профіль</h3>
            <div className="row">
              <div className="col-12 col-sm-4">

                {
                  this.state.detaileddoctor ?
                    <img
                      onClick={this.onselectImage}
                      className="imgUpload"
                      src={this.state.detaileddoctor.imagePath === "" || this.state.imagechanged ? (this.state.ImagePath !== "" ? this.state.ImagePath : this.state.startimage) : (this.state.UpdatepatientLoading ? this.state.ImagePath : this.state.serverurl + '/Images/' + this.state.detaileddoctor.imagePath)}
                      onError={this.state.ImagePath !== "" ? (e) => { e.target.onerror = null; e.target.src = this.state.ImagePath } : (e) => { e.target.onerror = null; e.target.src = this.state.startimage }}
                      width="500px">

                    </img> :
                    <img
                      onClick={this.onselectImage}
                      className="imgUpload"
                      src={this.state.startimage}
                      onError={this.state.ImagePath !== "" ? (e) => { e.target.onerror = null; e.target.src = this.state.ImagePath } : (e) => { e.target.onerror = null; e.target.src = this.state.startimage }}
                      width="500px">
                    </img>

                }

                {this.state.imagechanged ? <Button type="primary" onClick={this.changeImage}>Save</Button> : null}
                {this.state.imagechanged ? <Button type="danger" onClick={this.cancelchangeImage}>Cancel</Button> : null}


                <input ref={input => this.inputFileElement = input} onChange={this.onChangeSelectFile} type="file" className="d-none"></input>

                <CropperWidget loading={isCropped} src={src} onClose={this.onCloseCropper} croppImage={this.croppImage} />
              </div>
              <div className="col-12 col-sm-8 p">
                <p style={{ fontFamily: "Bradley Hand, cursive	", color: 'rgb(152,197,178)', fontSize: '17px' }}>Ім'я: {this.state.detaileddoctor ? this.state.detaileddoctor.userName : null}</p>
                <p style={{ marginTop: '10px', fontFamily: "Bradley Hand, cursive	", color: 'rgb(152,197,178)', fontSize: '17px' }}>Призвіще: {this.state.detaileddoctor ? this.state.detaileddoctor.userSurname : null}</p>
                <p style={{ marginTop: '10px', fontFamily: "Bradley Hand, cursive	", color: 'rgb(152,197,178)', fontSize: '17px' }}>Дата народження: {this.state.detaileddoctor ? new Date(this.state.detaileddoctor.dateOfBirth).toLocaleString("ua", options) : null} </p>
                <p style={{ marginTop: '10px', fontFamily: "Bradley Hand, cursive	", color: 'rgb(152,197,178)', fontSize: '17px' }}>Пошта: {this.state.detaileddoctor ? this.state.detaileddoctor.user.userName : null}</p>
                <p style={{ marginTop: '10px', fontFamily: "Bradley Hand, cursive	", color: 'rgb(152,197,178)', fontSize: '17px' }}>Телефон:{this.state.detaileddoctor ? this.state.detaileddoctor.user.phoneNumber : null} </p>
                <p style={{ marginTop: '10px', fontFamily: "Bradley Hand, cursive	", color: 'rgb(152,197,178)', fontSize: '17px' }}>Посада: {this.state.detaileddoctor ? this.state.detaileddoctor.doctorSpecialty : null}</p>
                <p style={{ marginTop: '10px', fontFamily: "Bradley Hand, cursive	", color: 'rgb(152,197,178)', fontSize: '17px' }}>Адреса:{this.state.detaileddoctor ? this.state.detaileddoctor.locality : null}</p>
                <p style={{ marginTop: '10px', fontFamily: "Bradley Hand, cursive	", color: 'rgb(152,197,178)', fontSize: '17px' }}>Робочий досвід:{this.state.detaileddoctor ? this.state.detaileddoctor.workExpirience : null} </p>
              </div>
            </div>
            <Row gutter={16}>
              {this.state.detaileddoctor ?
                this.state.detaileddoctor.recipes.map((recipe) =>

                  <Col xs={25} sm={25} md={8} lg={8} xl={8}>

                    <Card title={<p style={{color:'rgb(221, 252, 200)',fontStyle:'Italic'}}>Пацієнт: {recipe.patient.userName} {recipe.patient.userSurname}</p>} style={{ backgroundColor: 'rgb(157,181,167)', marginTop: "10px" ,fontFamily:'Candara'}}>
                      <p style={{color:'rgb(217, 241, 227)',fontStyle:'Italic'}}>Діагноз: {recipe.diagnos}</p>
                      <Button type="dashed" style={{ color: 'black' ,backgroundColor:'rgb(221, 252, 200)'}} onClick={this.routeChange}>Детальніше</Button>
                    </Card>
                  </Col>
                ) :
                null
              }
            </Row>



            <Row style={{ marginTop: "5%" }} type="flex" justify="center" >
              <Col offset={4} span={4}>
                <div>
                  <Button type="primary"  style={{backgroundColor:'rgb(157, 181,167)'}}>
                    Scan QR!
             </Button>
                </div>
              </Col>

              <Col span={8} offset={4}>
                <Row>
                  <Col span={8} style={{ marginRight: "2%" }}>
                    <Input value={this.state.patientID} onChange={this.updatePatientIDValue} placeholder="User ID" />
                  </Col>

                  <Col span={4}>
                    <Button type="primary" style={{backgroundColor:'rgb(157, 181,167)'}} onClick={this.AddRecipe}>
                      Add Recipe
              </Button>
                  </Col>
                </Row>
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
    IsLoading: get(state, 'doctorsReducer.detaileddoctor.loading'),
    IsFailed: get(state, 'doctorsReducer.detaileddoctor.failed'),
    IsSuccess: get(state, 'doctorsReducer.detaileddoctor.success'),
    user: get(state, 'loginReducer.user'),
    errors: get(state, 'doctorsReducer.detaileddoctor.errors'),
    statuscode: get(state, 'doctorsReducer.detaileddoctor.statuscode'),
    doctor: get(state, 'doctorsReducer.detaileddoctor.doctor'),
    UpdatedoctorLoading: get(state, 'doctorsReducer.detaileddoctor.loading'),
    UpdatedoctorFailed: get(state, 'doctorsReducer.detaileddoctor.failed'),
    UpdatedoctorSuccess: get(state, 'doctorsReducer.detaileddoctor.success')



  }
}

const mapDispatch = {

  GetDetailedDoctor: (user) => {
    return doctorActions.GetDetailedDoctor(user);
  },

  changeImage: (user, detaileduser) => {
    return doctorActions.changeImage(user, detaileduser);
  },
  AddRecipe: (user, patientID) => {
    return doctorActions.AddRecipe(user, patientID);
  },
  push: (url) => {
    return (dispatch) => {
      dispatch(push(url));
    }
  }
}



PageDoctor.propTypes = propTypes;
PageDoctor.defaultProps = defaultProps;

export default connect(mapState, mapDispatch)(PageDoctor);


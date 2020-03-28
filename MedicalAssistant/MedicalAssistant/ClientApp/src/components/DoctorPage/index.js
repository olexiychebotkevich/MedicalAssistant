import React, { Component } from 'react';
import { Row, Card, Col, Button, Input } from 'antd';
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import * as doctorActions from './reducer';
import { push } from 'connected-react-router';
import get from 'lodash.get';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import '../HomePage/home.css';
import './index.css';
import CropperWidget from '../CropperWidgetContainer';
import SpinnerWidget from '../spinner';
import QrReader from 'react-qr-reader';


const propTypes = {
  GetDetailedDoctor: PropTypes.func.isRequired,
  SearchPatientBySurname: PropTypes.func.isRequired,
  AddRecipe: PropTypes.func.isRequired,
  GetDetailedPatient: PropTypes.func.isRequired,
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
      CroppedImage: "",
      imagechanged: false,
      imagesaved: false,
      isCropped: false,
      src: '',
      serverurl: "http://localhost:54849",
      startimage: require("../images/Placeholder.jpg"),
      UpdatedoctorLoading: false,
      UpdatedoctorFailed: false,
      UpdatedoctorSuccess: false,
      patientID: null,
      patientSurname: null,
      IsLoading: false,
      scanQr: false,
      scanQRresult: ""

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

  componentDidUpdate(prevProps) {
    // Популярный пример (не забудьте сравнить пропсы):
    if (this.props.doctor !== prevProps.doctor) {
      this.setState({ ImagePath: this.state.detaileddoctor.imagePath });
    }
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
    this.setState({ CroppedImage: value, imagechanged: true, isCropped: false });
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
    this.setState({ imagechanged: false, imagesaved: true });
    const updateimagemodel = {
      id: this.state.detaileddoctor.id,
      ImagePath: this.state.CroppedImage
    }

    this.props.changeImage(user, updateimagemodel);

  }


  getDetailedPatiant = (id, e) => {
    e.preventDefault();
    const doctor = {
      id: this.state.user.id,
      token: this.state.token
    }
    this.props.GetDetailedPatient(doctor, id);
  }


  // SearchPatient=(patientsurname,e)=>{
  //   e.preventDefault();
  //   const doctor = {
  //     id: this.state.user.id,
  //     token: this.state.token
  //   }
  //   this.props.SearchPatientBySurname(this.state.user.id,patientsurname);
  // }


  cancelchangeImage = e => {
    e.preventDefault();
    this.setState({ imagechanged: false, src: '' });
  }

  // routeChange=()=> {
  //   let path = ``;
  //   this.props.history.push(path);
  // }

  scanQRCode = e => {
    e.preventDefault();
    this.setState({ scanQr: !this.state.scanQr });
  }

  handleScan = data => {
    if (data) {
      console.log("handleScan: ", data);
      this.setState({ scanQRresult: "/home" });
      let path = `/doctor/pagedoctor`;
      this.props.history.push(path);
    }



  }

  render() {


    const { src, isCropped, scanQr } = this.state;
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    return (
      <div>
        {this.state.IsLoading === false && this.state.detaileddoctor ?
          <div style={{ backgroundColor: 'transparent', padding: '30px', marginBottom: '25px', marginTop: '5px' }}>
            <h3 className="moreHeader"> Особистий профіль</h3>
            <div className="row" >
              <div className="col-12 col-sm-6" >

                <img
                  onClick={this.onselectImage}
                  className="imgUpload"
                  src={this.state.imagesaved || this.state.imagechanged ? this.state.CroppedImage : this.state.ImagePath}
                  onError={(e) => { e.target.onerror = null; e.target.src = this.state.startimage }}
                  width="500px">

                </img>
                <div align="center" style={{ marginTop: '5px' }}>
                  {this.state.imagechanged ? <Button type="primary" onClick={this.changeImage}>Save</Button> : null}
                  {this.state.imagechanged ? <Button type="danger" onClick={this.cancelchangeImage}>Cancel</Button> : null}
                </div>

                <input ref={input => this.inputFileElement = input} onChange={this.onChangeSelectFile} type="file" className="d-none"></input>

                <CropperWidget loading={isCropped} src={src} onClose={this.onCloseCropper} croppImage={this.croppImage} />
              </div>
              <div className="col-12 col-md-6 p">
                <p className="ptext">Ім'я: {this.state.detaileddoctor ? this.state.detaileddoctor.userName : null}</p>
                <p className="ptext">Призвіще: {this.state.detaileddoctor ? this.state.detaileddoctor.userSurname : null}</p>
                <p className="ptext">Дата народження: {this.state.detaileddoctor ? new Date(this.state.detaileddoctor.dateOfBirth).toLocaleString("ua", options) : null} </p>
                <p className="ptext">Пошта: {this.state.detaileddoctor ? this.state.detaileddoctor.user.userName : null}</p>
                <p className="ptext">Телефон:{this.state.detaileddoctor ? this.state.detaileddoctor.user.phoneNumber : null} </p>
                <p className="ptext">Посада: {this.state.detaileddoctor ? this.state.detaileddoctor.doctorSpecialty : null}</p>
                <p className="ptext">Адреса:{this.state.detaileddoctor ? this.state.detaileddoctor.locality : null}</p>
                <p className="ptext">Робочий досвід:{this.state.detaileddoctor ? this.state.detaileddoctor.workExpirience : null} </p>
              </div>
            </div>

           
            <div className="row" >
              {this.state.detaileddoctor.patients ?
                this.state.detaileddoctor.patients.map((patient, index) =>

                 <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12">

                    <Card key={index} title={<p style={{ color: 'rgb(49, 112, 83)', fontStyle: 'Italic' }}>Пацієнт: {patient.patientName} {patient.patientSurname}</p>} style={{ backgroundColor: 'rgb(157,181,167)', marginTop: "10px", fontFamily: 'Candara' }}>

                      <Button type="link" style={{ color: 'white' }} onClick={(e) => this.getDetailedPatiant(patient.patientID, e)}>Детальніше</Button>
                    </Card>
                    </div>
                ) :
                null
              }
         </div>



            <Row style={{ marginTop: "5%" }} type="flex" justify="center" >
              <Col offset={4} span={4}>
                <div>
                  <Button type="primary" style={{ backgroundColor: 'rgb(157, 181,167)',border:'1px solid rgb(49, 112, 83)'}}>
                    Scan QR!
             </Button>
                </div>
              </Col>

              <Col span={8} offset={4} xs={12} >
                <Row>
                  <Col span={6} xs={12} sm={10} md={8} lg={6} xl={6} style={{ marginRight: "2%" }}>
                    <Input style={{border:'1px solid rgb(49, 112, 83)'}} value={this.state.patientID} onChange={this.updatePatientIDValue} placeholder="User ID" />
                  </Col>

                  <Col span={4}>
                    <Button type="primary" style={{ backgroundColor: 'rgb(157, 181,167)',border:'1px solid rgb(49, 112, 83)' }} onClick={this.AddRecipe}>
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
  SearchPatientBySurname: (doctorId, userSurname) => {
    return doctorActions.SearchPatientBySurname(doctorId, userSurname);
  },
  GetDetailedPatient: (user, patientID) => {
    return doctorActions.GetDetailedPatient(user, patientID);
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


import React, { Component } from 'react';
import { Row, Card, Col, Button, Input } from 'antd';
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
  AddMedicalSession: PropTypes.func.isRequired,
  getDetailedSession: PropTypes.func.isRequired,
  changeImage: PropTypes.func.isRequired,
  IsLoading: PropTypes.bool.isRequired,
  IsFailed: PropTypes.bool.isRequired,
  IsSuccess: PropTypes.bool.isRequired,
  statuscode: PropTypes.number,
  user: PropTypes.object,
  doctor: PropTypes.object

};

const defaultProps = {};

class PageDoctor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      detaileddoctor: null,
      ImagePath: "",
      CroppedImage: "",
      imagechanged: false,
      imagesaved: false,
      isCropped: false,
      src: '',
      patientID: null,
      IsLoading: false,
      scanQr: false,
      searchpatientSurname:""
    };

  }

  componentDidMount() {
    this.props.GetDetailedDoctor();
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
      this.setState({detaileddoctor:this.state.detaileddoctor});
    }
  }


//--------------------------------------------------------------
  //Operations with images
  onselectImage = (e) => {
    this.inputFileElement.click();
  }

  croppImage = (value) => {
    this.setState({ CroppedImage: value, imagechanged: true, isCropped: false });
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
    this.setState({ imagechanged: false, imagesaved: true });
    const updateimagemodel = {
      id: this.state.detaileddoctor.id,
      ImagePath: this.state.CroppedImage
    }
    this.props.changeImage(updateimagemodel);

  }

  cancelchangeImage = e => {
    e.preventDefault();
    this.setState({ imagechanged: false,src: '' });
  }

  scanQRCode = e => {
    e.preventDefault();
    this.setState({ scanQr : !this.state.scanQr });
  }

//--------------------------------------------------------------
  //Medical Sessions

  AddMedicalSession = () => {
    this.props.AddMedicalSession(this.state.patientID);
  }

  getDetailedSession = (sessionid, e) => {
    e.preventDefault();
    this.props.getDetailedSession(sessionid);
  }
 
  updatePatientIDValue = (val) => {
    this.setState({
      patientID: val.target.value
    });
  }
  
//--------------------------------------------------------------
  //Search patient
 

  SearchPatientBySurname=(patientsurname,e)=>{
    e.preventDefault();
    this.props.SearchPatientBySurname(this.state.detaileddoctor.id,patientsurname);
  }

  updatePatientSurnameValue = (val) => {
    console.log("val: ",val.target.value);
    this.setState({
      searchpatientSurname: val.target.value
    });
    this.props.SearchPatientBySurname(this.state.detaileddoctor.id,val.target.value);
    
  }


//--------------------------------------------------------------
  //Operations with QR-code


  handleError = err => {
    console.error(err)
  }

  handleScan = data => {
    if (data) {
      console.log("handleScan: ", data);
      const patId=data.slice(3);
     this.setState({patientID:parseInt(patId)});
     this.AddMedicalSession();
    }

  }


  // routeChange=()=> {
  //   let path = ``;
  //   this.props.history.push(path);
  // }


  render() {


    const { src, isCropped,scanQr,detaileddoctor} = this.state;
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    return (
      <div>
        {detaileddoctor ?
          <div style={{ backgroundColor: 'transparent', padding: '30px', marginBottom: '25px', marginTop: '5px' }}>
            <h3 className="moreHeader"> Особистий профіль</h3>
            <div className="row" >
              <div className="col-12 col-sm-6" >

                <img
                  onClick={this.onselectImage}
                  className="imgUpload"
                  src={this.state.imagesaved || this.state.imagechanged ? this.state.CroppedImage : detaileddoctor.imagePath}
                  width="500px">
                </img>
                <div align="center" style={{ marginTop: '5px' }}>
                  {this.state.imagechanged ? <Button type="primary" onClick={this.changeImage}>Save</Button> : null}
                  {this.state.imagechanged ? <Button type="danger" onClick={this.cancelchangeImage}>Cancel</Button> : null}
                </div>

                <input ref={input => this.inputFileElement = input} value="" autoComplete={"new-password"} onChange={this.onChangeSelectFile} type="file" className="d-none"></input>

                <CropperWidget loading={isCropped} src={src} onClose={this.onCloseCropper} croppImage={this.croppImage} />
              </div>
              <div className="col-12 col-md-6 p">
                <p className="ptext">Ім'я: {detaileddoctor ? detaileddoctor.userName : null}</p>
                <p className="ptext">Призвіще: {detaileddoctor ? detaileddoctor.userSurname : null}</p>
                <p className="ptext">Дата народження: {detaileddoctor ? new Date(detaileddoctor.dateOfBirth).toLocaleString("ua", options) : null} </p>
                <p className="ptext">Пошта: {detaileddoctor ? detaileddoctor.email : null}</p>
                <p className="ptext">Телефон:{detaileddoctor ? detaileddoctor.phoneNumber : null} </p>
                <p className="ptext">Посада: {detaileddoctor ? detaileddoctor.doctorSpecialty : null}</p>
                <p className="ptext">Адреса:{detaileddoctor ? detaileddoctor.locality : null}</p>
                <p className="ptext">Робочий досвід:{detaileddoctor ? detaileddoctor.workExpirience : null} </p>
              </div>
            </div>

           

            <Row style={{ marginTop: "5%" }} type="flex" justify="center" >
              <Col offset={4} span={4}>
                <div>
                  <Button type="primary" onClick={this.scanQRCode} style={{ backgroundColor: 'rgb(157, 181,167)',border:'1px solid rgb(49, 112, 83)',fontFamily:'Candara',color:'rgb(49,112,83)' }}>
                    Сканувати QR!
                 </Button>
                {scanQr?
                <QrReader
                delay={300}
                onError={this.handleError}
                onScan={this.handleScan}
                style={{ width: '100%' }}
               />
                :null}
                 
                </div>
              </Col>

              <Col span={8} offset={4} xs={12} >
                <Row>
                  <Col span={6} xs={12} sm={10} md={8} lg={6} xl={6} style={{ marginRight: "2%" }}>
                    <Input style={{border:'1px solid rgb(49, 112, 83)'}} value={this.state.patientID} onChange={this.updatePatientIDValue} placeholder="User ID" />
                  </Col>

                  <Col span={4}>
                    <Button type="primary" style={{ backgroundColor: 'rgb(157, 181,167)',border:'1px solid rgb(49, 112, 83)',fontFamily:'Candara',color:'rgb(49,112,83)' }} onClick={this.AddMedicalSession}>
                      Додати рецепт
                   </Button>
                  </Col>
                </Row>
              </Col>

            </Row>


            
            {/* <Row gutter={16} style={{marginTop:"2rem"}}>
            <h3 className="moreHeader">Медичні сеанси</h3>

              <div className="row justify-content-center">
                <div className="col-lg-2 col-xl-2 col-md-4 col-sm-6 col-6">
                  <Input style={{ border: '1px solid rgb(49, 112, 83)' }} placeholder="Прізвище пацієнта" value={this.state.searchpatientSurname} onChange={this.updatePatientSurnameValue} />
                </div>
              </div>


              {detaileddoctor.sessions ?
                detaileddoctor.sessions.map((session, index) =>
                  <Col key={index} xs={25} sm={25} md={8} lg={8} xl={8}>
                    <Card key={index} title={<p style={{ color: 'rgb(221, 252, 200)', fontStyle: 'Italic' }}>Пацієнт: {session.patientName} {session.patientSurname}</p>} style={{ backgroundColor: 'rgb(157,181,167)', marginTop: "10px", fontFamily: 'Candara' }}>
                      <p style={{ color: 'rgb(221, 252, 200)', fontStyle: 'Italic' }}>Дата: {new Date(session.date).toLocaleString("ua", options)}</p>
                      <p style={{ color: 'rgb(221, 252, 200)', fontStyle: 'Italic' }}>Діагноз: {session.diagnos}</p>
                      <Button type="link" style={{ color: 'rgb(221, 252, 200)' }} onClick={(e) => this.getDetailedSession(session.sessionId, e)}>Детальніше</Button>
                    </Card>
                  </Col>
                ) :
                null
              }
            </Row> */}

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
    doctor: get(state, 'doctorsReducer.detaileddoctor.doctor')
  }
}

const mapDispatch = {

  GetDetailedDoctor: () => {
    return doctorActions.GetDetailedDoctor();
  },
  SearchPatientBySurname: (DoctorId, userSurname) => {
    return doctorActions.SearchPatientBySurname(DoctorId, userSurname);
  },
  getDetailedSession: (patientID) => {
    return doctorActions.getDetailedSession(patientID);
  },
  changeImage: (newdoctor) => {
    return doctorActions.changeImage(newdoctor);
  },
  AddMedicalSession: (patientID) => {
    return doctorActions.AddMedicalSession(patientID);
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


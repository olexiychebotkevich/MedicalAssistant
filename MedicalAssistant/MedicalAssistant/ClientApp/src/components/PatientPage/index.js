import React, { Component } from 'react';
import { Row, Card, Col, Button, Input } from 'antd';
import 'antd/dist/antd.css';
import * as patientActions from './reducer';
import { push } from 'connected-react-router';
import get from 'lodash.get';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import '../HomePage/home.css';
import './index.css';
import QRCode from 'qrcode'
import CropperWidget from '../CropperWidgetContainer';
import SpinnerWidget from '../spinner';




const propTypes = {
  GetDetailedPatient: PropTypes.func.isRequired,
  showDetailedRecipe: PropTypes.func.isRequired,
  changeImage: PropTypes.func.isRequired,
  IsLoading: PropTypes.bool.isRequired,
  IsFailed: PropTypes.bool.isRequired,
  IsSuccess: PropTypes.bool.isRequired,
  errors: PropTypes.object,
  user: PropTypes.object,
  patient: PropTypes.object
};

const defaultProps = {};



class PagePatient extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      detailedpatient: null,
      ImagePath: "",
      CroppedImage: "",
      imagechanged: false,
      imagesaved: false,
      isCropped: false,
      src: '',
      GetID: false
    };

  }



  componentDidMount() {
    this.props.GetDetailedPatient();
  }

  static getDerivedStateFromProps = (props, state) => {
    return {
      user: props.user,
      errorsServer: props.errors,
      detailedpatient: props.patient,
      IsLoading: props.IsLoading
    };
  }


  componentDidUpdate(prevProps) {
    // Популярный пример (не забудьте сравнить пропсы):
    if (this.props.patient !== prevProps.patient) {
      this.setState({ ImagePath: this.state.detailedpatient.imagePath });
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
    const ImagePath = this.state.CroppedImage;
    this.props.changeImage(ImagePath);
  }

  cancelchangeImage = e => {
    e.preventDefault();
    this.setState({ imagechanged: false });
  }


  //--------------------------------------------------------------
  //other operations

  GetMyID = (e) => {
    { this.state.GetID ? this.setState({ GetID: false }) : this.setState({ GetID: true }) };
  }
  
  //--------------------------------------------------------------
  SelectRecipe(id, e) {
    this.props.showDetailedRecipe(id);
  }

  //--------------------------------------------------------------
  generateQR = e => {
    e.preventDefault();
    let str = ("Id:" + this.state.detailedpatient.id);
    console.log("QR: ", str);
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
    return (
      <div>

        {this.state.detailedpatient ?
          <div style={{ backgroundColor: 'transparent', padding: '30px', marginBottom: '25px', marginTop: '5px' }}>

            <h3 className="moreHeader"> Особистий профіль</h3>


            <div className="row" >
              <div className="col-12 col-sm-6">
                <img
                  onClick={this.onselectImage}
                  className="imgUpload"
                  src={this.state.imagesaved || this.state.imagechanged ? this.state.CroppedImage : this.state.ImagePath}
                  width="500px">
                </img>
                <div align="center" style={{ marginTop: '5px' }}>
                  {this.state.imagechanged ? <Button type="primary" onClick={this.changeImage}>Save</Button> : null}
                  {this.state.imagechanged ? <Button type="danger" onClick={this.cancelchangeImage}>Cancel</Button> : null}
                </div>

                <input ref={input => this.inputFileElement = input} onChange={this.onChangeSelectFile} type="file" className="d-none"></input>

                <CropperWidget loading={isCropped} src={src} onClose={this.onCloseCropper} croppImage={this.croppImage} />
              </div>
              <div className="col-12 col-md-6 p ">
                <p className="ptext"> Ім'я:  {this.state.detailedpatient ? this.state.detailedpatient.userName : null} </p>
                <p className="ptext"> Прізвище: {this.state.detailedpatient ? this.state.detailedpatient.userSurname : null}</p>
                <p className="ptext">Дата народження: {this.state.detailedpatient ? new Date(this.state.detailedpatient.dateOfBirth).toLocaleString("ua", options) : null}</p>
                <p className="ptext">Email: {this.state.detailedpatient ? this.state.detailedpatient.email : null}</p>
                <p className="ptext">Номер телефону: {this.state.detailedpatient ? this.state.detailedpatient.phoneNumber : null} </p>
                <p className="ptext">Місто: {this.state.detailedpatient ? this.state.detailedpatient.locality : null}</p>
              </div>
            </div>

            <Row gutter={16}>
              {this.state.detailedpatient.sessions ?
                this.state.detailedpatient.sessions.map((session, index) =>
                  <Col key={index} xs={25} sm={25} md={8} lg={8} xl={8}>
                    <Card key={index} title={session.doctorSpecialty} extra={<Button type="link" onClick={(e) => this.SelectRecipe(session.sessionId, e)} style={{ color: 'rgb(221, 252, 200)' }}>More</Button>} headStyle={{ color: ' rgb(221, 252, 200)', fontFamily: 'Candara' }} style={{ backgroundColor: 'rgb(157,181,167)', fontFamily: 'Candara', fontWeight: '500', marginTop: "10px" }}>
                      <p className="textr">Діагноз: {session.diagnos.length > diagnoslength ? session.diagnos.substring(0, diagnoslength) + "..." : session.diagnos}</p>
                      <p className="textr">Лікар: {session.doctorSurname + " " + session.doctorName}</p>
                      <p className="textr">Дата:{new Date(session.date).toLocaleString("ua", options)}</p>
                    </Card>
                  </Col>
                ) :
                null}
            </Row>



            <Row align="middle" style={{ marginTop: "5%" }} type="flex" justify="center" >

              <Col style={{ height: "10rem" }} xs={{ span: 24, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                <div style={{ width: "100%" }} >
                  <Button style={{ backgroundColor: 'rgb(157, 181,167)', border: '1px solid rgb(49, 112, 83)', fontFamily: 'Candara', color: 'rgb(49,112,83)' }} onClick={this.generateQR}>
                    Згенерувати QR-код!
                 </Button>
                </div>
                <canvas className="QrCanvas" id="canvas" />
              </Col>
              <Col style={{ height: "10rem" }} xs={{ span: 24, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                <div>
                  <Button style={{ backgroundColor: 'rgb(157, 181,167)', border: '1px solid rgb(49, 112, 83)', fontFamily: 'Candara', color: 'rgb(49,112,83)' }} onClick={this.GetMyID}>
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
    patient: get(state, 'patientsReducer.detailedpatient.patient')
  }
}

const mapDispatch = {

  GetDetailedPatient: () => {
    return patientActions.GetDetailedPatient();
  },
  showDetailedRecipe: (detairecipe) => {
    return patientActions.showDetailedRecipe(detairecipe);
  },

  changeImage: (imagePath) => {
    return patientActions.changeImage(imagePath);
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

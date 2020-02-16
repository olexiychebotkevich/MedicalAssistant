import React, { Component } from 'react';
import { Row,Card,Col, Button,Input} from 'antd';
import 'antd/dist/antd.css';
import * as doctorActions from './reducer';
import { push } from 'connected-react-router';
import get from 'lodash.get';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import jwt from 'jsonwebtoken';
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
        user:null,
        detaileddoctor:null,
        errors: {},
        errorsServer: {},
        token : localStorage.getItem('jwtToken'),
        ImagePath: "",
        imagechanged:false,
        isCropped:false,
        src:'',
        serverurl: "http://localhost:54849",
        startimage:require("../images/Placeholder.jpg"),
        UpdatedoctorLoading: false,
        UpdatedoctorFailed: false,
        UpdatedoctorSuccess: false,
        patientID:null
     


    };


}

componentDidMount() {
  const doctor ={
    id:this.state.user.id,
    token:this.state.token
  }
 
  this.props.GetDetailedDoctor(doctor);
 
}

static getDerivedStateFromProps = (props, state) => {
  return {
      user: props.user,
      errorsServer: props.errors,
      detaileddoctor:props.doctor,
      UpdatedoctorLoading:props.UpdatedoctorLoading,
      UpdatedoctorFailed: props.UpdatedoctorFailed,
      UpdatedoctorSuccess: props.UpdatedoctorSuccess
  };
}

onselectImage = (e) => {
  console.log("Upload image");
  this.inputFileElement.click();
}

AddRecipe=(e) =>{
e.preventDefault();
const doctor ={
  id:this.state.user.id,
  token:this.state.token
}
this.props.AddRecipe(doctor,this.state.patientID);
console.log("Patient ID: ",this.state.patientID);
}

croppImage = (value) => { 
  this.setState({ImagePath:value});
  this.setState({imagechanged:true});
  this.setState({ isCropped: false });

}

onCloseCropper=(e)=>{
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
           
              this.setState({ src: reader.result,isCropped:true});
             
            
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
  const user ={
    id:this.state.user.id,
    token:this.state.token
  }
  this.setState({imagechanged:false});
  const {detaileddoctor,ImagePath}=this.state;

  console.log("----Image path: ",this.state.ImagePath);
  console.log("Detailed patient image Change: ",detaileddoctor)
  detaileddoctor.imagePath=ImagePath;
  // this.setState({ detailedpatient: {...detailedpatient,ImagePath}});
  this.props.changeImage(user,detaileddoctor);
  
}

  cancelchangeImagetmp = e => {
    e.preventDefault();
    console.log("Hello World");
  }

cancelchangeImage = e =>{
  e.preventDefault();
  this.setState({imagechanged:false});
}


  routeChange=()=> {
    let path = ``;
    this.props.history.push(path);
  }

  handleScan = data => {
    if (data) {
        console.log("handleScan: ",data);
    }




}

  render() {
  
    console.log("detailed doctor: ",this.state.doctor);
    const {src,isCropped}= this.state; 
    return (
      <div style={{ backgroundColor: 'rgb(151, 201, 218)', padding: '30px', marginBottom: '25px', marginTop: '5px' }}>
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
                <p style={{ fontFamily:"Bradley Hand, cursive	", color: 'whitesmoke'}}>Ім'я: {this.state.detaileddoctor ? this.state.detaileddoctor.userName : null}</p>
                <p style={{marginTop: '10px', fontFamily:"Bradley Hand, cursive	", color: 'whitesmoke'}}>Призвіще: {this.state.detaileddoctor ? this.state.detaileddoctor.userSurname : null}></p>
                <p style={{marginTop: '10px', fontFamily:"Bradley Hand, cursive	", color: 'whitesmoke'}}>Дата народження: {this.state.detaileddoctor ? this.state.detaileddoctor.dateOfBirth : null} </p>
                <p style={{marginTop: '10px', fontFamily:"Bradley Hand, cursive	", color: 'whitesmoke'}}>Пошта: {this.state.detaileddoctor ? this.state.detaileddoctor.user.userName : null}</p>
                <p style={{marginTop: '10px', fontFamily:"Bradley Hand, cursive	", color: 'whitesmoke'}}>Телефон:{this.state.detaileddoctor ? this.state.detaileddoctor.user.phoneNumber : null} </p>
                <p style={{marginTop: '10px', fontFamily:"Bradley Hand, cursive	", color: 'whitesmoke'}}>Посада: {this.state.detaileddoctor ? this.state.detaileddoctor.doctorSpecialty : null}</p>
                <p style={{marginTop: '10px', fontFamily:"Bradley Hand, cursive	", color: 'whitesmoke'}}>Адреса:{this.state.detaileddoctor ? this.state.detaileddoctor.locality : null}</p>
                <p style={{marginTop: '10px', fontFamily:"Bradley Hand, cursive	", color: 'whitesmoke'}}>Робочий досвід:{this.state.detaileddoctor ? this.state.detaileddoctor.workExpirience : null} </p>
               </div>
        </div>
          
        <Row gutter={16}>
       
          <Col xs={25} sm={25} md={8} lg={8} xl={8}>
          <Card title="Ім'я Призвіще" extra={<a href="#">Більше</a>} style={{backgroundColor: 'whitesmoke',marginTop:"10px"  }}>
      <p>Хвороба 1</p>
      <p>Хвороба 2</p>
      <p>Хвороба 3</p>
      <Button type="dashed" style={{color : 'black'}} onClick={this.routeChange}>Додати хворобу</Button>
    </Card>
          </Col>
         
          <Col xs={25} sm={25} md={8} lg={8} xl={8}>
          <Card title="Ім'я Призвіще" extra={<a href="#">Більше</a>} style={{backgroundColor: 'whitesmoke',marginTop: "10px" }}>
      <p>Хвороба 1</p>
      <p>Хвороба 2</p>
      <p>Хвороба 3</p>
      <Button type="dashed" style={{color : 'black'}}>Додати хворобу</Button>
    </Card>
          </Col>
          
          <Col xs={25} sm={25} md={8} lg={8} xl={8}>
          <Card title="Ім'я Призвіще" extra={<a href="#">Більше</a>} style={{backgroundColor: 'whitesmoke',marginTop:"10px" }}>
      <p>Хвороба 1</p>
      <p>Хвороба 2</p>
      <p>Хвороба 3</p>
      <Button type="dashed" style={{color : 'black'}}>Додати хворобу</Button>
    </Card>
        </Col>
        <Col xs={25} sm={25} md={8} lg={8} xl={8}>
          <Card title="Ім'я Призвіще" extra={<a href="#">Більше</a>} style={{backgroundColor: 'whitesmoke',marginTop:"10px" }}>
      <p>Хвороба 1</p>
      <p>Хвороба 2</p>
      <p>Хвороба 3</p>
      <Button type="dashed" style={{color : 'black'}}>Додати хворобу</Button>
    </Card>
        </Col>
          </Row>


          <Row style={{marginTop:"5%"}} type="flex" justify="center" >
          <Col offset = {4} span={4}>
            <div>
            <Button type="primary">
                Scan QR!
             </Button>
            </div>
          </Col>

          <Col  span={8} offset = {4}>
            <Row>
              <Col span={8}  style={{marginRight:"2%"}}>
                <Input value={this.state.patientID} onChange={this.updatePatientIDValue} placeholder="User ID" />
              </Col>

              <Col span={4}>
                <Button type="primary" onClick={this.AddRecipe}>
                  Add Recipe
              </Button>
              </Col>
            </Row>
          </Col>

        </Row>
 
     
      </div>
    );
  }
}

const mapState = (state) => {
  return {
      IsLoading: get(state, 'doctorsReducer.detaileddoctor.loading'),
      IsFailed: get(state, 'doctorsReducer.detaileddoctor.failed'),
      IsSuccess: get(state, 'doctorsReducer.detaileddoctor.success'),
      user:get(state, 'loginReducer.user'),
      errors: get(state, 'doctorsReducer.detaileddoctor.errors'),
      statuscode: get(state, 'doctorsReducer.detaileddoctor.statuscode'),
      doctor: get(state, 'doctorsReducer.detaileddoctor.doctor'),
      UpdatedoctorLoading:get(state, 'doctorsReducer.detaileddoctor.loading'),
      UpdatedoctorFailed: get(state, 'doctorsReducer.detaileddoctor.failed'),
      UpdatedoctorSuccess: get(state, 'doctorsReducer.detaileddoctor.success')



  }
}

const mapDispatch = {

  GetDetailedDoctor: (user) => {
      return doctorActions.GetDetailedDoctor(user);
  },

  changeImage:(user,detaileduser)=>{
    return doctorActions.changeImage(user,detaileduser);
  },
  AddRecipe: (user,patientID) => {
    return doctorActions.AddRecipe(user,patientID);
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


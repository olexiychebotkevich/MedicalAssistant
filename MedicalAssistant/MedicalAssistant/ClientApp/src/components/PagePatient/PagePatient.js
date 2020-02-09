import React, { Component } from 'react';
import { Row,Card,Col, Button } from 'antd';
import 'antd/dist/antd.css';
import * as patientActions from './reducer';
import { push } from 'connected-react-router';
import get from 'lodash.get';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import jwt from 'jsonwebtoken';
import '../home.css';
import './pagepatient.css';
import QRCode from 'qrcode'

const propTypes = {
    GetDetailedPatient: PropTypes.func.isRequired,
    changeImage: PropTypes.func.isRequired,
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
        token : localStorage.getItem('jwtToken'),
        ImagePath: "https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg",
        imagechanged:false

    };


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

onselectImage = (e) => {
  console.log("Upload image");
  this.inputFileElement.click();
}

handleChange = e => {
  e.preventDefault();
  const { name, value } = e.target;
  this.setState({ [name]: value });
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
           
              this.setState({ ImagePath: reader.result});
          };
          reader.readAsDataURL(files[0]);
          this.setState({imagechanged:true});
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
  const {detailedpatient,ImagePath}=this.state;

  console.log("----Image path: ",this.state.ImagePath);
  console.log("Detailed patient image Change: ",detailedpatient)
  this.setState({ detailedpatient: {...detailedpatient,ImagePath}});
  this.props.changeImage(user,this.state.detailedpatient);
  this.setState({imagechanged:false});
}


generateQR=e=> {
  e.preventDefault();
  console.log("generate qr");
  let str = 'My first QR!'
  QRCode.toCanvas(document.getElementById('canvas'), str, function(error) {
  if (error) console.error(error)
  //console.log('success!')
  })
  }


  render() {
    console.log("user: ",this.state.user);
    console.log("detailed patient: ",this.state.detailedpatient);
    return (
        <div style={{ backgroundColor: 'rgb(151, 201, 218)', padding: '30px', marginBottom: '25px',marginTop: '5px' }}>
           <div className="row">
            <div className="col-12 col-sm-4">
            <img
              onClick={this.onselectImage}
              className="imgUpload"
              src={this.state.ImagePath}
              alt=""
              width="500px">
            </img>
            {this.state.imagechanged ?  <Button type="primary" onClick={this.changeImage}>Save</Button> : null}


            <input ref={input => this.inputFileElement = input} onChange={this.onChangeSelectFile} type="file" className="d-none"></input>

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


        <Row type="flex" justify="center">
          <Col span={4}>
            <div>
              <canvas id="canvas" align="center" />
              <Button onClick={this.generateQR}>
                Generate QR!
          </Button>
            </div>
          </Col>

        </Row>
        
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
      return patientActions.GetDetailedPatient(user);
  },

  changeImage:(user,detaileduser)=>{
    return patientActions.changeImage(user,detaileduser);
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

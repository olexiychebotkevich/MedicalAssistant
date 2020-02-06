import { Row,Card,Col, Button,Pagination } from 'antd';
import 'antd/dist/antd.css';
import React, { Component } from 'react';
import './pagepatient.css';
import Cropper from 'cropperjs';

class PagePatient extends Component {




  render() {
    return (
   
        <div style={{ backgroundColor: 'rgb(151, 201, 218)', padding: '30px', marginBottom: '25px',marginTop: '5px' }}>
           <div className="row">
               <div className="col-12 col-sm-4">
            <img style={{height:'200px', width: '200px', display:'block', margin: 'auto'}} src=" https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" alt="Photo"/>
            </div>
            <div className="col-12 col-sm-8 p">
                <p style={{ fontFamily:"Bradley Hand, cursive	", color: 'whitesmoke'}}>Ім'я: Ліза</p>
                <p style={{marginTop: '10px', fontFamily:"Bradley Hand, cursive	", color: 'whitesmoke'}}>Призвіще: Шеметовська></p>
                <p style={{marginTop: '10px', fontFamily:"Bradley Hand, cursive	", color: 'whitesmoke'}}>Дата народження: 11.07.2002 </p>
                <p style={{marginTop: '10px', fontFamily:"Bradley Hand, cursive	", color: 'whitesmoke'}}>Пошта: Shemetovska@gmail</p>
                <p style={{marginTop: '10px', fontFamily:"Bradley Hand, cursive	", color: 'whitesmoke'}}>Телефон:380980473992 </p>
                <p style={{marginTop: '10px', fontFamily:"Bradley Hand, cursive	", color: 'whitesmoke'}}>Адреса: вул.Кармелюка</p>
               </div>
        </div>
          
        <Row gutter={16}>
       
          <Col xs={25} sm={25} md={8} lg={8} xl={8}>
          <Card title="Хвороба" extra={<a href="#">Більше</a>} style={{backgroundColor: 'whitesmoke',marginTop:"10px"  }}>
      <p>Таблетки</p>
      <p>Таблетки</p>
      <p>Таблетки</p>
    
    </Card>
          </Col>
         
          <Col xs={25} sm={25} md={8} lg={8} xl={8}>
          <Card title="Хвороба" extra={<a href="#">Більше</a>} style={{backgroundColor: 'whitesmoke',marginTop: "10px" }}>
      <p>Таблетки</p>
      <p>Таблетки</p>
      <p>Таблетки</p>
     
    </Card>
          </Col>
          
          <Col xs={25} sm={25} md={8} lg={8} xl={8}>
          <Card title="Хвороба" extra={<a href="#">Більше</a>} style={{backgroundColor: 'whitesmoke',marginTop:"10px" }}>
      <p>Таблетки</p>
      <p>Таблетки</p>
      <p>Таблетки</p>
     
    </Card>
        </Col>
        <Col xs={25} sm={25} md={8} lg={8} xl={8}>
          <Card title="Хвороба" extra={<a href="#">Більше</a>} style={{backgroundColor: 'whitesmoke',marginTop:"10px" }}>
      <p>Таблетки</p>
      <p>Таблетки</p>
      <p>Таблетки</p>
     
    </Card>
        </Col>
      
          </Row>
      
      </div>
    );
  }
}

export default PagePatient;
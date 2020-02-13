import { Row,Card,Col, Button } from 'antd';
import 'antd/dist/antd.css';
import React, { Component } from 'react';
import './index.css';
import '../home.css';
class PageDoctor extends Component {


  routeChange=()=> {
    let path = ``;
    this.props.history.push(path);
  }

  render() {
    return (
        <div style={{ backgroundColor: 'rgb(151, 201, 218)', padding: '30px' , marginBottom: '25px',marginTop: '5px'}}>
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
                <p style={{marginTop: '10px', fontFamily:"Bradley Hand, cursive	", color: 'whitesmoke'}}>Посада: Сімейний лікар</p>
                <p style={{marginTop: '10px', fontFamily:"Bradley Hand, cursive	", color: 'whitesmoke'}}>Адреса:вул. Кармелюка</p>
                <p style={{marginTop: '10px', fontFamily:"Bradley Hand, cursive	", color: 'whitesmoke'}}>Робочий досвід:3 роки </p>
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
 
     
      </div>
    );
  }
}

export default PageDoctor;
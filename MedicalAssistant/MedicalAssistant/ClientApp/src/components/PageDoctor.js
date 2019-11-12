import { Row,Card,Col, Button } from 'antd';
import 'antd/dist/antd.css';
import React, { Component } from 'react';
import './pagedoctor.css';

class PageDoctor extends Component {




  render() {
    return (
        <div style={{ backgroundColor: '#5F9EA0', padding: '30px' }}>
           <div className="row">
               <div className="col-12 col-sm-4">
            <img style={{height:'200px', width: '200px', display:'block', margin: 'auto'}} src=" https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" alt="Photo"/>
            </div>
            <div className="col-12 col-sm-8 p">
                <p style={{ fontFamily:"Bradley Hand, cursive	", color: 'whitesmoke'}}>Name: Liza</p>
                <p style={{marginTop: '10px', fontFamily:"Bradley Hand, cursive	", color: 'whitesmoke'}}>Surname: Shemetovska></p>
                <p style={{marginTop: '10px', fontFamily:"Bradley Hand, cursive	", color: 'whitesmoke'}}>Date of birth: 11.07.2002 </p>
                <p style={{marginTop: '10px', fontFamily:"Bradley Hand, cursive	", color: 'whitesmoke'}}>Email: Shemetovska@gmail</p>
                <p style={{marginTop: '10px', fontFamily:"Bradley Hand, cursive	", color: 'whitesmoke'}}>Phone:380980473992 </p>
                <p style={{marginTop: '10px', fontFamily:"Bradley Hand, cursive	", color: 'whitesmoke'}}>Post: Family Doctor</p>
                <p style={{marginTop: '10px', fontFamily:"Bradley Hand, cursive	", color: 'whitesmoke'}}>Address: st.Popod</p>
                <p style={{marginTop: '10px', fontFamily:"Bradley Hand, cursive	", color: 'whitesmoke'}}>Work experience:3 year </p>
               </div>
        </div>
          
        <Row gutter={16}>
       
          <Col xs={25} sm={25} md={8} lg={8} xl={8}>
          <Card title="Name Surname" extra={<a href="#">More</a>} style={{backgroundColor: 'whitesmoke',marginTop:"10px"  }}>
      <p>Illness 1</p>
      <p>Illness 2</p>
      <p>Illness 3</p>
      <Button type="dashed" style={{color : 'black'}}>Add illness</Button>
    </Card>
          </Col>
         
          <Col xs={25} sm={25} md={8} lg={8} xl={8}>
          <Card title="Name Surname" extra={<a href="#">More</a>} style={{backgroundColor: 'whitesmoke',marginTop: "10px" }}>
      <p>Illness 1</p>
      <p>Illness 2</p>
      <p>Illness 3</p>
      <Button type="dashed" style={{color : 'black'}}>Add illness</Button>
    </Card>
          </Col>
          
          <Col xs={25} sm={25} md={8} lg={8} xl={8}>
          <Card title="Name Surname" extra={<a href="#">More</a>} style={{backgroundColor: 'whitesmoke',marginTop:"10px" }}>
      <p>Illness 1</p>
      <p>Illness 2</p>
      <p>Illness 3</p>
      <Button type="dashed" style={{color : 'black'}}>Add illness</Button>
    </Card>
        </Col>
      
          </Row>
      
      </div>
    );
  }
}

export default PageDoctor;
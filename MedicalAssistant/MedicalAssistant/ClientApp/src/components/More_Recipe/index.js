import React, { Component } from 'react';
import  'antd/dist/antd.css';
import '../home.css';


import {
  Row, Card,Col
} from 'antd';





class NormalMoreForm extends React.Component {
  state = {
    current: 0,
  };
  onChange = current => {
    console.log('onChange:', current);
    this.setState({ current });
  };
  render() {
  
    const { current } = this.state;
    return (
<div className="container" style={{backgroundColor: 'rgb(151, 201, 218)'}}>
<h3 className="moreHeader"> Діагноз</h3>
  <Row gutter={16}>
       
       <Col xs={25} sm={25} md={8} lg={8} xl={8}>
       <Card title="Name Pill" style={{backgroundColor: 'whitesmoke',marginTop:"10px" ,marginBottom:"10px"  }}>
       <p>Кількість днів</p>
   <p>Особливості прийому</p>
   <p>Кількість разів в день</p>
 
 </Card>
       </Col>
      
       <Col xs={25} sm={25} md={8} lg={8} xl={8}>
       <Card title="Name Pill"  style={{backgroundColor: 'whitesmoke',marginTop: "10px",marginBottom:"10px" }}>
   <p>Кількість днів</p>
   <p>Особливості прийому</p>
   <p>Кількість разів в день</p>
  
 </Card>
       </Col>
       
       <Col xs={25} sm={25} md={8} lg={8} xl={8}>
       <Card title="Name Pill"  style={{backgroundColor: 'whitesmoke',marginTop:"10px" ,marginBottom:"10px"}}>
       <p>Кількість днів</p>
   <p>Особливості прийому</p>
   <p>Кількість разів в день</p>
  
 </Card>
     </Col>
     <Col xs={25} sm={25} md={8} lg={8} xl={8}>
       <Card title="Name Pill"  style={{backgroundColor: 'whitesmoke',marginTop:"10px" ,marginBottom:"10px"}}>
       <p>Кількість днів</p>
   <p>Особливості прийому</p>
   <p>Кількість разів в день</p>
 </Card>
     </Col>

   
       </Row>


</div>

    );
    
  }

  
}

// const mapState = (state) => {
//   return {
//       IsLoading: get(state, 'loginReducer.login.loading'),
//       IsFailed: get(state, 'loginReducer.login.failed'),
//       IsSuccess: get(state, 'loginReducer.login.success'),
//       login:
//       {
//           IsLoading: get(state, 'loginReducer.login.loading'),
//           IsFailed: get(state, 'loginReducer.login.failed'),
//           IsSuccess: get(state, 'loginReducer.login.success'),
//       },
//       errors: get(state, 'login.post.errors')



//   }
// }

// const mapDispatch = {

//   loginUser: (user) => {
//       return usersActions.loginUser(user);
//   },
//   push: (url) => {
//       return (dispatch) => {
//           dispatch(push(url));
//       }
//   }
// }


export default NormalMoreForm;
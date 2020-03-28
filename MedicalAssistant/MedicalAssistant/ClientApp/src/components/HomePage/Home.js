import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './home.css';


import {
  Steps, Divider, Row, Icon, Carousel
} from 'antd';


const { Step } = Steps;



class NormalHomeForm extends React.Component {
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
      <div>
        <div className="tmp">

          <div className='container'>
            <div className='row'>



              <div className="col-12 col-md-12 col-lg-6 col-xl-6 col-sm-12" align="center" >
                <h1 className="homeHeaderG"> MEDICAL ASSISTANT </h1>
                <h1 className="homeHeader"> ваш надійний партнер</h1>
                {/* <img src={require("../images/heart.png")} /> */}
              </div>
              <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-sm-12" align="center">
                <Carousel autoplay align="center" className="SC" >
                  <div align="center">
                  <img className="imgC" src={require("../images/GreenStick.png")} />
                    {/* <h3  style={{ fontFamily: 'Candara', fontStyle: 'italic', fontWeight: '50px', color: 'rgb(35,97,88)', textShadowColor: 'rgb(49,112,83)', fontSize: '35px', marginTop: '50%' }}> Ви забудько ?</h3> */}
                  </div>
                  <div align="center">
                     <h3  style={{ fontFamily: 'Candara', fontStyle: 'italic', fontWeight: '50px', color: 'rgb(35,97,88)', textShadowColor: 'rgb(49,112,83)', fontSize: '30px', marginTop: '30%' }}> Ви забудько ?</h3> 
                  </div>
                  <div align="center">
                    <h3 style={{ fontFamily: 'Candara', fontStyle: 'italic', fontWeight: '50px', color: 'rgb(35,97,88)', textShadowColor: 'rgb(49,112,83)', fontSize: '30px', marginTop: '30%' }}> У вас підліткова розсієність ?</h3>
                    
                  </div>
                  <div align="center">
                    <h3  style={{ fontFamily: 'Candara', fontStyle: 'italic', fontWeight: '50px', color: 'rgb(35,97,88)', textShadowColor: 'rgb(49,112,83)', fontSize: '30px', marginTop: '30%' }}> Чи можливо від сірої буденності часткова втрата пам'яті ?</h3>

                  </div>
                  <div aligh="center">
                  <h3  style={{ fontFamily: 'Candara', fontStyle: 'italic', fontWeight: '50px', color: 'rgb(35,97,88)', textShadowColor: 'rgb(49,112,83)', fontSize: '30px', marginTop: '30%' }}>Довіртеся нам ми здатні нагадати про важливе !!!</h3>
                {/* <img width="372" height="340" src={require("../images/bealive.png")} /> */}
                  </div>
                </Carousel>
              </div>
            </div>
          </div>


        </div>

         <div align="center" className="fd" marginTop="90%">
          <img src={require("../images/hearth.png")} />
        </div> 
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


export default NormalHomeForm;
import React, { Component } from 'react';
import  'antd/dist/antd.css';
import '../home.css';


import {
  Steps, Divider, Row, Icon
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
<div className="tmp">
  <div align="center" style={{width:'70%'}}>    
<h1 className="homeHeaderG"> MEDICAL ASSISTANT </h1>
<h1 className="homeHeader"> ваш надійний партнер</h1>
<h4 className="homeHeader1" >
Ви забудько?<br/>
У Вас підліткова розсіяність?<br/>
Чи можливо від сірої буденності часткова втрата пам'яті?
</h4>

<h3 className="homeHeader1" >Довіртеся нам, ми здатні нагадати про важливе!!!</h3>
 {/* <Steps className="steps" current={current} onChange={this.onChange} direction="vertical">
   <Step  title="Спочатку зареєструйся!✅"  />
   <Step title="Залогінься!✅"/>
   <Step title="Зайди на особисту сторінку!👤"/>
   <Step title="На сторінці ти можеш переглянути свої рецепти!💬" />
   <Step title="Ти зробив правильний вибір, тепер ти дійсно не забудеш про ліки🙉"  />

 </Steps> */}
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
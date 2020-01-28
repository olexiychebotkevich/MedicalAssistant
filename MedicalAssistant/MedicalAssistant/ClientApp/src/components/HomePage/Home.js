import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../home.css';
import FooterForm from '../Footer';

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
  <div  style={{width:'70%'}}>    
<h1 style={{fontFamily: 'Comic Sans MS, Comic Sans, cursive', textAlign: "center" ,color:'#3A7073'}}> MEDICAL ASSISTANT -<br/> ВАШ НАДІЙНИЙ ПАРТНЕР</h1>
<h4 style={{fontFamily: 'Comic Sans MS, Comic Sans, cursive', textAlign: "center" ,color:'#3A7073'}}>
Ви забудько?<br/>
У Вас підліткова розсіяність?<br/>
Чи можливо від сірої буденності часткова втрата пам'яті?
</h4>
<h3 style={{fontFamily: 'Comic Sans MS, Comic Sans, cursive', textAlign: "center" ,color:'#3A7073'}}>Довіртеся нам, ми здатні нагадати про важливе!!!</h3>
 <Steps  current={current} onChange={this.onChange} direction="vertical">
   <Step  title="Крок 1" description="Спочатку зареєструйся!✅"/>
   <Step title="Крок 2" description="Залогінься!✅" />
   <Step title="Крок 3" description="Зайди на особисту сторінку!👤" />
   <Step title="Крок 4" description="На сторінці ти можеш переглянути свої рецепти!💬" />
   <Step title="Крок 5" description="Ти зробив правильний вибір, тепер ти дійсно не забудеш про ліки🙉" />

 </Steps>
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
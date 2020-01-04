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
   <Step  title="Step 1" description="Спочатку зареєструйся!✅"/>
   <Step title="Step 2" description="Залогінься!✅" />
   <Step title="Step 3" description="Зайди на особисту сторінку!👤" />
   <Step title="Step 4" description="На сторінці ти можеш переглянути свої рецепти!💬" />
   <Step title="Step 5" description="Ти зробив правильний вибір, тепер ти дійсно не забудеш про ліки🙉" />

 </Steps>
 </div>
{/* <FooterForm/> </div> */}
</div>
    );
    
  }
}


export default NormalHomeForm;
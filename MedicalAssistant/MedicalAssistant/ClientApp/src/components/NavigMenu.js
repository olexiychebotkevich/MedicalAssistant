import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon,Typography,Button,Dropdown  } from 'antd';
import 'antd/dist/antd.css';



const { Text  } = Typography;
const menu = (
    <Menu onClick={handleMenuClick}>
     <Menu.Item key="login" title="Log in">
                    <Link to="/login" />
                </Menu.Item>
      <Menu.Item key="register" title="Register">
      <Link to="/registr" />
      </Menu.Item>
    </Menu>
  );
  function handleMenuClick(e) {
    console.log('click', e);
  }
class NavigMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'mail',
        }
    }

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };
    
    render() {
        return (
            <Menu  onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" style={{backgroundColor: 'rgb(232, 248, 245)'}}>
                <Menu.Item key="app" disabled>
                <Text  style={{fontFamily: 'Chiller' ,fontWeight: '600', fontSize: '24px'}}>M e d i c a l   A s s i s t a n t</Text>
                </Menu.Item>
                <Menu.Item key="bank" title="Home">
                    <Icon type="bank" />
                    <Link to="/" />
                </Menu.Item>
                {/* <Menu.Item key="solution" title="Registration">
                    <Icon type="solution" />
                    <Link to="/registr" />
                </Menu.Item>
                <Menu.Item key="login" title="Login">
                    <Icon type="login" />
                    <Link to="/login" />
                </Menu.Item> */}
                <Menu.Item key="contacts" title="PageDoctor">
                    <Icon type="contacts" />
                    <Link to="/pagedoctor" />
                </Menu.Item>
                <Menu.Item key="user" title="PagePatient" >
                    <Icon type="user" />
                    <Link to="/pagepatient" />
                </Menu.Item>
                <Dropdown overlay={menu} placement='topRight'>
                <Button type="primary" shape="circle" icon="home" style={{backgroundColor: 'rgb(69, 179, 157  )', placeItems:'right'}}/>
                </Dropdown>
                {/* <Button type="primary" shape="circle" icon="home" style={{backgroundColor: 'rgb(69, 179, 157  )', placeItems:'right'}}/>  */}
                {/* <Dropdown overlay={menu} placement='topRight'>
                <Button type="primary" shape="circle" icon="home" style={{backgroundColor: 'rgb(69, 179, 157  )', placeItems:'right'}}>
                    </Button>
                </Dropdown>      */}
            </Menu>
        );
    }
}

export default NavigMenu;
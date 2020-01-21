import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon,Typography  } from 'antd';
import 'antd/dist/antd.css';



const { Text  } = Typography;

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
            <Menu  onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" style={{backgroundColor: 'whitesmoke'}}>
                <Menu.Item key="app" disabled>
                <Text  style={{fontFamily: 'Brush Script MT, Brush Script Std,cursive,sans-serif' ,fontWeight: '600', fontSize: '24px'}}>Medical Assistant</Text>
                </Menu.Item>
                <Menu.Item key="bank" title="Home">
                    <Icon type="bank" />
                    <Link to="/" />
                </Menu.Item>
                <Menu.Item key="solution" title="Registration">
                    <Icon type="solution" />
                    <Link to="/registr" />
                </Menu.Item>
                <Menu.Item key="login" title="Login">
                    <Icon type="login" />
                    <Link to="/login" />
                </Menu.Item>
                <Menu.Item key="contacts" title="PageDoctor">
                    <Icon type="contacts" />
                    <Link to="/pagedoctor" />
                </Menu.Item>
                <Menu.Item key="user" title="PagePatient">
                    <Icon type="user" />
                    <Link to="/pagepatient" />
                </Menu.Item>
            </Menu>
        );
    }
}

export default NavigMenu;
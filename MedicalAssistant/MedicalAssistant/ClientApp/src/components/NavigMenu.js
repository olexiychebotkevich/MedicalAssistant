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
            <Menu  onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                <Menu.Item key="app" disabled>
                <Text strong>Medical Assistant</Text>
                </Menu.Item>
                <Menu.Item key="bank" title="Home">
                    <Icon type="bank" />
                    <Link to="/" />
                </Menu.Item>
                <Menu.Item key="solution" title="Registration">
                    <Icon type="solution" />
                    <Link to="/registr" />
                </Menu.Item>

            </Menu>
        );
    }
}

export default NavigMenu;
import React, { Component } from './node_modules/react';
import { Link } from './node_modules/react-router-dom';
import { connect } from './node_modules/react-redux';
import PropTypes from "./node_modules/prop-types";
import { Menu, Icon, Typography, Button, Dropdown, Row, Col } from './node_modules/antdntd';
import './node_modules/antd/dist/antd.css';
import * as usersActions from '../../LoginPage/reducer';
import './NavMenu.css';



const { Text } = Typography;

const menu = (
    <Menu onClick={handleMenuClick} style={{ backgroundColor: 'rgb(152,197,178)' }}>
        <Menu.Item key="login" title="Login">
            <Link to="/login">Login</Link>
        </Menu.Item>

        <Menu.Item key="register" title="Register">
            <Link to="/registr">Registration</Link>
        </Menu.Item>
    </Menu>
);




const propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object,
};

const defaultProps = {};

class NavMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'mail',
            isAuthenticated: false,
            user: null

        }
    }


    static getDerivedStateFromProps = (props, state) => {
        return {
            isAuthenticated: props.isAuthenticated,
            user: props.user
        };
    }


    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };
    render() {
        return (
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" style={{ backgroundColor: 'rgb(174,214,187)' } }>
                  
                <Menu.Item style={{ float: 'left' }} key="app" >
                    <Text style={{ fontFamily: 'Footlight MT', fontWeight: '400', fontSize: '24px', fontStyle: 'Italic' }}>Medical Assistant</Text> 
                </Menu.Item> 


                <Menu.Item style={{ float: 'right' }}>
                    <Row type="flex" justify="center" align="middle">
                        <Dropdown overlay={menu} placement="topRight" style={{backgroundColor:'rgb(255,213,195)'}}>
                            <Button type="primary" shape="circle" size="large" style={{ backgroundColor: 'rgb(157,181,176)', margin: '10px', border: '1px solid rgb(49, 112, 83)' }}><Icon style={{ fontSize: '18px', color:'rgb(49, 112, 83)'}} className="icon" type="bank" /></Button>
                        </Dropdown>
                    </Row>
                </Menu.Item>

            </Menu>
            
        );
    }
}

function mapStateToProps(state) {
    const isAuthenticated = state.loginReducer.login.isAuthenticated;
    const { user } = state.loginReducer;
    return {
        isAuthenticated,
        user
    };
}


NavMenu.propTypes = propTypes;
NavMenu.defaultProps = defaultProps;
export default connect(mapStateToProps)(NavMenu);
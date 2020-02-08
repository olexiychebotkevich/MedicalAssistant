import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Menu, Icon,Typography ,Button,Dropdown, Row, Col} from 'antd';
import 'antd/dist/antd.css';
import * as usersActions from '../../LoginPage/reducer';
import './NavMenu.css';



const { Text  } = Typography;

const menu = (
    <Menu onClick={handleMenuClick}>
     <Menu.Item key="login" title="Login">
         {/* <a href="login">Log in</a> */}
        <Link to="/login">Login</Link>
      
      
                </Menu.Item>
      <Menu.Item key="register" title="Register">
      <Link to="/registr">Registration</Link>
      {/* <Link to="/registr" /> */}
      </Menu.Item>
    </Menu>
  );


  function handleMenuClick(e) {
    console.log('click', e);
  }
  

// const RegistrationLink = (

//     <Menu.Item key="solution" title="Registration">
//         <Icon type="solution" />
//         <Link to="/registr" />
//     </Menu.Item>

// );

// const LoginLink = (

//     <Menu.Item key="login" title="Login">
//         <Icon type="login" />
//         <Link to="/login" />
//     </Menu.Item>

// );




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
            isAuthenticated:false,
            user:null

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
            <Menu  onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" style={{backgroundColor: 'whitesmoke'}}>
               
          
                <Menu.Item style={{float: 'left'}} key="app" disabled>
                <Text  style={{fontFamily: 'Chiller' ,fontWeight: '600', fontSize: '24px'}}>Medical Assistant</Text>
                </Menu.Item>

               
                <Menu.Item style={{float: 'right'}}>
                <Row type="flex"  justify="center" align="middle">
                <Dropdown overlay={menu} placement="topRight">
                <Button type="primary" shape="circle"  size="large" style={{backgroundColor: 'rgb(69, 179, 157  )'}}><Icon style={{ fontSize: '18px'}} className="icon" type="bank" /></Button>
                </Dropdown>
                </Row>
                </Menu.Item>
               

      
              
            </Menu>
        );
    }
}

function mapStateToProps(state) {
    const isAuthenticated = state.loginReducer.login.isAuthenticated;
    const {user} = state.loginReducer;
    return {
        isAuthenticated,
        user
    };
}


NavMenu.propTypes = propTypes;
NavMenu.defaultProps = defaultProps;
export default connect(mapStateToProps)(NavMenu);
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Menu, Icon,Typography ,Button} from 'antd';
import 'antd/dist/antd.css';
import * as usersActions from './LoginPage/reducer';



const { Text  } = Typography;

const RegistrationLink = (

    <Menu.Item key="solution" title="Registration">
        <Icon type="solution" />
        <Link to="/registr" />
    </Menu.Item>

);

const LoginLink = (

    <Menu.Item key="login" title="Login">
        <Icon type="login" />
        <Link to="/login" />
    </Menu.Item>

);




const MyProfileLink=(
    <Menu.Item key="myprofile" title="My Profile">
        <Icon type="profile" />
        <Link to="/pagepatient" />
    </Menu.Item>
)






const propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired
};

const defaultProps = {};

class NavigMenu extends Component {
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
                <Menu.Item key="app" disabled>
                <Text  style={{fontFamily: 'Brush Script MT, Brush Script Std,cursive,sans-serif' ,fontWeight: '600', fontSize: '24px'}}>Medical Assistant</Text>
                </Menu.Item>
               
                {this.state.isAuthenticated ?  MyProfileLink : LoginLink}
                {this.state.isAuthenticated ?  null : RegistrationLink}
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



const mapDispatch = {

     logout: () => {
        return usersActions.logout();
      },
      
}




NavigMenu.propTypes = propTypes;
NavigMenu.defaultProps = defaultProps;
export default connect(mapStateToProps,mapDispatch)(NavigMenu);
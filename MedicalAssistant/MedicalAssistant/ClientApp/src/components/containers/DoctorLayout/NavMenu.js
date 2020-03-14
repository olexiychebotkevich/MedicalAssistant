import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Menu, Icon,Typography ,Button} from 'antd';
import 'antd/dist/antd.css';
import * as usersActions from '../../LoginPage/reducer';


const { Text  } = Typography;




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


    logoutclick = e => {
        e.preventDefault();
        this.props.logout();
      }

    render() {
        return (
            <Menu  onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" style={{backgroundColor: 'rgb(152,197,178)'}}>
                <Menu.Item style={{float: 'left'}} key="app" disabled>
                <Text  style={{fontFamily: 'Footlight MT' ,fontWeight: '400', fontSize: '24px',fontStyle:'Italic'}}>Medical Assistant</Text>
                </Menu.Item>

                {this.state.isAuthenticated ? 
          
          <Button style={{float: 'right',backgroundColor:'rgb(157,181,176)',margin:'10px',fontFamily:'Candara',border:'1px solid rgb(221, 252, 200)'}} type="primary"onClick={this.logoutclick}>Logout</Button>
              : null}
     
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


NavMenu.propTypes = propTypes;
NavMenu.defaultProps = defaultProps;
export default connect(mapStateToProps,mapDispatch)(NavMenu);
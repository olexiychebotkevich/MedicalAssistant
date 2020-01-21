import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as usersActions from './reducer';
import 'antd/dist/antd.css';
import { push } from 'connected-react-router';
import get from 'lodash.get';
import '../style.css';

import moment from 'moment';
import {
    Form,
    Input,
    Checkbox,
    Tooltip,
    Icon,
    Select,
    Row,
    Col,
    Button,
    DatePicker,
} from 'antd';
const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';




const propTypes = {
    registrUser: PropTypes.func.isRequired,
    IsLoading: PropTypes.bool.isRequired,
    IsFailed: PropTypes.bool.isRequired,
    IsSuccess: PropTypes.bool.isRequired,
    registration: PropTypes.object.isRequired,
};

const defaultProps = {};



class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            loading: false,
            registration: {},
            doctorCheck: false,

        }
    }


    static getDerivedStateFromProps = (props, state) => {
        //Тута пописати і змінити
        ///333333333333
        //4444444444444
        //5555555555555
        //console.log('---nextProps---', props);
        return {
            loading: props.IsLoading,
            registration: { ...props.registration }
        };
    }


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const usermodel = {
                    Password: values.password,
                    Email: values.email,
                    UserName: values.username,
                    UserSurname: values.usersurname,
                    PhoneNumber: values.prefix + values.phone
                };
                console.log('Received values of form: ', usermodel);
                this.props.registrUser(usermodel);
            }
        });

    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };
  CheckBoxOnChange=e=> {
       (this.state.doctorCheck ?  this.setState({doctorCheck : false}) : this.setState({doctorCheck : true}))
      
      }

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    //  validateDate = (rule, value, callback) => {
    //     let errors;
      
    //     if (!value) {
    //         callback('Required!');
         
    //     } else if (
    //       moment(value).format(dateFormat) < moment(Date.now()).format(dateFormat)
    //     ) {
    //         callback("Invalid date!");
    //     }
      
    //     return errors;
    //   };

    // handleWebsiteChange = value => {
    //     let autoCompleteResult;
    //     if (!value) {
    //         autoCompleteResult = [];
    //     } else {
    //         autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    //     }
    //     this.setState({ autoCompleteResult });
    // };

    render() {
        const { getFieldDecorator } = this.props.form;
        // const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span:6 },
            },
            wrapperCol: {
                xs: { span: 28 },
                sm: { span: 18 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 6,
                    offset: 6,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '38',
        })(
            <Select style={{ width: 70 }}>
                <Option value="38">+38</Option>
            </Select>,
        );
      
       const doctorfields=(
        <div>
        <Form.Item label="Post">
                   {getFieldDecorator('post', {
                       rules: [
                           {
                               type: 'post',
                               message: 'The input is not valid Post!',
                           },
                           {
                               required: true,
                               message: 'Please input your Post!',
                           },
                       ],
                   })(<Input />)}
               </Form.Item>
               <Form.Item label=" Work experience">
                   {getFieldDecorator('workExperience', {
                       rules: [
                           {
                               type: 'workExperience',
                               message: 'The input is not valid Work Experience!',
                           },
                           {
                               required: true,
                               message: 'Please input your Work Experience!',
                           },
                       ],
                   })(<Input />)}
               </Form.Item>
              
        </div>

       );


        return (
            <div className="tmp">
                <div style={{width: '50%'}}> 
            <Form{...formItemLayout} onSubmit={this.handleSubmit} className="register-form">
    
                <Form.Item label="E-mail">
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                min: 8,
                                message: "The field Password  must contain 8 symbols!"
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                        ],
                    })(<Input.Password />)}
                </Form.Item>
                <Form.Item label="Confirm Password" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            {
                                min: 8,
                                message: "The field Confirm Password must contain 8 symbols!"
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                    })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </Form.Item>
                <Form.Item
                    label={
                        <span>
                            Name&nbsp;
                            <Tooltip title="Your name">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    }
                >
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
                    })(<Input />)}
                </Form.Item>

                <Form.Item
                    label={
                        <span>
                            Surname&nbsp;
                            <Tooltip title="Your surname?">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    }
                >
                    {getFieldDecorator('usersurname', {
                        rules: [{ required: true, message: 'Please input your Surnname!', whitespace: true }],
                    })(<Input />)}
                </Form.Item>

                <Form.Item label="Phone Number">
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone number!' }, { min: 10, message: "The field Phone number must contain 10 numbers!" }],
                    })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                </Form.Item>
                {/*          
                <Form.Item label="Captcha" extra="We must make sure that your are a human.">
                    <Row gutter={8}>
                        <Col span={12}>
                            {getFieldDecorator('captcha', {
                                rules: [{ required: true, message: 'Please input the captcha you got!' }],
                            })(<Input />)}
                        </Col>
                        <Col span={12}>
                            <Button>Get captcha</Button>
                        </Col>
                    </Row>
                </Form.Item> */}


                <Form.Item label="Date of birth">
                    {getFieldDecorator('DateofBirth', {
                        initialValue: moment(),
                        rules: [
                            {
                                type: 'object',
                                required: true,
                                message: 'Please input Date of birth',
                                whitespace: true,
                            },
                        ],
                    })(<DatePicker initialValue={moment()} format={dateFormat} />)}

                </Form.Item>

                
        
       
                <Form.Item {...tailFormItemLayout}>
                <Checkbox onChange={this.CheckBoxOnChange}>Doctor</Checkbox>
                

                
                </Form.Item>

                {this.state.doctorCheck ? doctorfields : null}
                <Form.Item {...tailFormItemLayout}>
                    <Button type="dashed" htmlType="submit" className="register-form-btn" >
                        Register
                    </Button>
                </Form.Item>
               
          
            </Form>
            </div>
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        IsLoading: get(state, 'usersReducer.registration.loading'),
        IsFailed: get(state, 'usersReducer.registration.failed'),
        IsSuccess: get(state, 'usersReducer.registration.success'),
        registration:
        {
            IsLoading: get(state, 'usersReducer.registration.loading'),
            IsFailed: get(state, 'usersReducer.registration.failed'),
            IsSuccess: get(state, 'usersReducer.registration.success'),
        },



    }
}

const mapDispatch = {

    registrUser: (user) => {
        return usersActions.registrUser(user);
    },
    push: (url) => {
        return (dispatch) => {
            dispatch(push(url));
        }
    }
}


const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
WrappedRegistrationForm.propTypes = propTypes;
WrappedRegistrationForm.defaultProps = defaultProps;

export default connect(mapState, mapDispatch)(WrappedRegistrationForm);

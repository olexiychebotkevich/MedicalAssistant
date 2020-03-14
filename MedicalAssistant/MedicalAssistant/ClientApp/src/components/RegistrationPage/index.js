import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as usersActions from './reducer';
import 'antd/dist/antd.css';
import { push } from 'connected-react-router';
import get from 'lodash.get';
import '../../style.css';
import '../HomePage/home.css';

import moment from 'moment';
import axios from 'axios';
import {
    Form,
    Input,
    Checkbox,
    Tooltip,
    Icon,
    Select,
    Button,
    DatePicker,
    Menu,
    InputNumber
} from 'antd';
const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';
const { SubMenu } = Menu;
let timeout;
let currentValue;

const propTypes = {
    registrUser: PropTypes.func.isRequired,
    registrDoctor: PropTypes.func.isRequired,
    IsLoading: PropTypes.bool.isRequired,
    IsFailed: PropTypes.bool.isRequired,
    IsSuccess: PropTypes.bool.isRequired,
    registration: PropTypes.object.isRequired,
    errors: PropTypes.object,
    statuscode: PropTypes.number
};

const defaultProps = {};

function fetch(value, callback) {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    function fake() {

        axios(`https://restcountries.eu/rest/v2/all`)
            .then(res => {

                if (currentValue === value) {
                    const { result } = res.data;
                    const data = [];

                    res.data.forEach(r => {
                        if (r.altSpellings[1])
                            if (r.altSpellings[1].toString().startsWith(currentValue)) {
                                data.push({
                                    value: r.altSpellings[1],
                                    text: r.altSpellings[1],
                                });
                            }
                    });
                    callback(data);
                }
            });
    }

    timeout = setTimeout(fake, 300);
}



class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            loading: false,
            doctorCheck: false,
            dataLocality: [],
            value: undefined,
            registration: {},
            errors: {},
            errorsServer: {}


        }
    }


    static getDerivedStateFromProps = (props, state) => {
        return {
            loading: props.IsLoading,
            registration: { ...props.registration },
            errorsServer: props.errors
        };
    }

    componentDidUpdate(prevProps) {

        if (this.props.errors !== prevProps.errors) {

            this.props.form.validateFields((error, values) => {
                if(this.state.doctorCheck)
                {
                if (!error) {
                    if (this.props.statuscode === 400) {
                        this.props.form.setFields({
                            email: {
                                value: values.email,
                                errors: [new Error('Email ' + values.email + " already exist")],
                            },
                        });
                    }

                } else {
                    console.log('error', error, values);
                }
               }
               else
               {
                if (!error.Email&&!error.Password&&!error.UserName&&!error.UserSurname&&!error.PhoneNumber&&!error.Locality&&!error.DateOfBirth&&!error.confirm) {
                    if (this.props.statuscode === 400) {
                        this.props.form.setFields({
                            email: {
                                value: values.email,
                                errors: [new Error('Email ' + values.email + " already exist")],
                            },
                        });
                    }

                } else {
                    console.log('error', error, values);
                }

               }

            });

        }
    }



    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          
                if(this.state.doctorCheck)
                {
                    if(!err)
                    {
                    const usermodel = {
                        Password: values.password,
                        Email: values.email,
                        UserName: values.username,
                        UserSurname: values.usersurname,
                        PhoneNumber: values.prefix + values.phone,
                        Locality: values.Locality,
                        DateOfBirth: values.DateofBirth,
                        DoctorSpecialty:values.post,
                        WorkExpirience:values.workExperience,
                        ImagePath:""
                    };

                    this.props.registrDoctor(usermodel);
                    }
                }
                else
                {
                    if(!err.Email&&!err.Password&&!err.UserName&&!err.UserSurname&&!err.PhoneNumber&&!err.Locality&&!err.DateOfBirth&&!err.confirm)
                    {
                        const usermodel = {
                            Password: values.password,
                            Email: values.email,
                            UserName: values.username,
                            UserSurname: values.usersurname,
                            PhoneNumber: values.prefix + values.phone,
                            Locality: values.Locality,
                            DateOfBirth: values.DateofBirth,
                            ImagePath:""
                        };
                        this.props.registrUser(usermodel);
                    }
                   
                }
            
        }
        )
    };


    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Два введені паролі несумісні!');
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




    strongValidator = (rule, value, callback) => {
        const digitsRegex = /(?=.*?[0-9])/;
        const uppercaseRegex = /(?=.*?[A-Z])/;
        if (!value.match(digitsRegex) || !value.match(uppercaseRegex)) {

            return callback('Пароль повинен містити великі літери та цифри')
        }
        callback()
    }

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



    handleSearch = value => {
        if (value) {
            fetch(value, data => this.setState({ dataLocality: data }));
        } else {
            this.setState({ dataLocality: [] });
        }
    };

    handleChange = value => {
        this.setState({ value });
    };

    render() {

        // }
        const { getFieldDecorator } = this.props.form;
        // const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
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

        const options = this.state.dataLocality.map(d => <Option key={d.value}>{d.text}</Option>);
      
       const doctorfields=(
        <div>
        <Form.Item label="Спеціальність">
                   {getFieldDecorator('post', {
                       rules: [
                           {
                               required: true,
                               message: 'Будь ласка, вашу спеціальність!',
                           },
                       ],
                   })(<Input />)}
               </Form.Item>
               <Form.Item label="Досвід">
                   {getFieldDecorator('workExperience', {
                       rules: [
                           {
                               required: true,
                               message: 'Будь ласка, введіть ваш досвід!',
                           },
                       ],
                   })( <InputNumber min={1} max={50} initialValue={3}  />)}
               </Form.Item>
              
        </div>

       );


        return (
            <div className="tmp">
                <div align="center" > 
                <h1 className="header">Medical Assistant</h1>
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="register-form">
      
                <Form.Item label="Email">
                    {getFieldDecorator('email', {
                        initialValue: undefined,
                        rules: [
                            {
                                type: 'email',
                                message: 'Недійсна електронна пошта!',
                            },
                            {
                                required: true,
                                message: 'Будь ласка, введіть свою електронну пошту!',
                            },

                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Пароль" hasFeedback>
                    {getFieldDecorator('password', {
                        initialValue: undefined,
                        rules: [
                            {
                                required: true,
                                message: 'Введіть свій пароль!',
                            },
                            {
                                min: 8,
                                message: "Пароль повинен містити 8 символів!"
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                            {
                                validator: this.strongValidator
                            }
                        ],
                    })(<Input.Password />)}
                </Form.Item>
                <Form.Item label="Пароль ще раз" hasFeedback>
                    {getFieldDecorator('confirm', {
                        initialValue: undefined,
                        rules: [
                            {
                                required: true,
                                message: 'Підтвердьте свій пароль!',
                            },
                            {
                                min: 8,
                                message: "Поле Підтвердити пароль повинно містити 8 символів!"
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
                            Ім'я&nbsp;
                            <Tooltip title="Ваше ім'я">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    }
                >
                    {getFieldDecorator("username", {
                        initialValue: undefined,
                        rules: [{ required: true, message: 'Введіть своє ім’я!', whitespace: true }],
                    })(<Input />)}
                </Form.Item>

                <Form.Item
                    label={
                        <span>
                            Прізвище&nbsp;
                            <Tooltip title="Ваше прізвище">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    }
                >
                    {getFieldDecorator('usersurname', {
                        initialValue: undefined,
                        rules: [{ required: true, message: 'Будь ласка, введіть своє Прізвище!', whitespace: true }],
                    })(<Input />)}
                </Form.Item>

                <Form.Item label="Номер телефону">
                    {getFieldDecorator('phone', {
                        initialValue: undefined,
                        rules: [{ required: true, message: 'Введіть свій номер телефону!' }, { min: 10, message: "The field Phone number must contain 10 numbers!" }],
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


                <Form.Item label="Дата народження">
                    {getFieldDecorator('DateofBirth', {
                        initialValue: moment("2015-12-31"),
                        rules: [
                            {
                                type: 'object',
                                required: true,
                                message: 'Будь ласка, введіть дату народження!',
                                whitespace: true,
                            },
                        ],
                    })(<DatePicker initialValue={moment("2015-12-31")} disabledDate={d => !d || d.isAfter("2015-12-31") || d.isSameOrBefore("1940-01-01")} format={dateFormat} />)}

                </Form.Item>


                {/* <Form.Item label="Locality">
                    {getFieldDecorator('Locality', {
                        rules: [
                            {
                                required: true,
                                message: 'Please choose your Locality ',
                                whitespace: true,
                            },
                        ],
                    })(
                        <Select
                            showSearch
                            initialValue={this.state.value}
                            placeholder={this.props.placeholder}
                            style={this.props.style}
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            filterOption={false}
                            onSearch={this.handleSearch}
                            onChange={this.handleChange}
                            notFoundContent={null}
                        >
                            {options}
                        </Select>)}
                </Form.Item> */}


                        <Form.Item label="Місто">
                            {getFieldDecorator('Locality', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Будь ласка, оберіть своє місто',
                                        whitespace: true,
                                    },
                                ],
                            })(
                                <Input />)}
                        </Form.Item>

                
        
       
                <Form.Item {...tailFormItemLayout}>
                <Checkbox onChange={this.CheckBoxOnChange}>Doctor</Checkbox>
                

                
                </Form.Item>

                {this.state.doctorCheck ? doctorfields : null}

                <Form.Item {...tailFormItemLayout}>
                    <Button align="center" type="dashed" htmlType="submit" className="register-form-btn" >
                        Register
                    </Button>
                </Form.Item>
               
          
            </Form>
            </div>
          <div>
          {/* <div className="col-6 col-md-6 col-lg-6 col-xl-6 col-sm-12" align="right">
              <img className="imgD" src={require("../images/stickpng.com.png")} />
            </div> */}
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
        errors: get(state, 'usersReducer.registration.errors'),
        statuscode: get(state, 'usersReducer.registration.statuscode')



    }
}

const mapDispatch = {

    registrUser: (user) => {
        return usersActions.registrUser(user);
    },
    registrDoctor:(doctor)=>{
        return usersActions.registrDoctor(doctor);
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
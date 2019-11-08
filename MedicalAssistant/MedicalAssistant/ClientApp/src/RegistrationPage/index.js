import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as usersActions from './reducer';
import 'antd/dist/antd.css';
import { push } from 'connected-react-router';
import get from 'lodash.get';
import moment from 'moment';
//import jsonp from 'fetch-jsonp';
import querystring from 'querystring';
import axios from 'axios';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Select,
    Row,
    Col,
    Button,
    DatePicker,
    Menu
} from 'antd';
const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';
const { SubMenu } = Menu;
let timeout;
let currentValue;
const menu = (
    <Menu>
        <Menu.Item>1st menu item</Menu.Item>
        <Menu.Item>2nd menu item</Menu.Item>
        <SubMenu title="sub menu">
            <Menu.Item>3rd menu item</Menu.Item>
            <Menu.Item>4th menu item</Menu.Item>
        </SubMenu>
        <SubMenu title="disabled sub menu" disabled>
            <Menu.Item>5d menu item</Menu.Item>
            <Menu.Item>6th menu item</Menu.Item>
        </SubMenu>
    </Menu>
);



const propTypes = {
    registrUser: PropTypes.func.isRequired,
    IsLoading: PropTypes.bool.isRequired,
    IsFailed: PropTypes.bool.isRequired,
    IsSuccess: PropTypes.bool.isRequired,
    registration: PropTypes.object.isRequired,
};

const defaultProps = {};

function fetch(value, callback) {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    function fake() {
        const str = querystring.encode({
            code: 'utf-8',
            q: value,
        });
        axios(`https://restcountries.eu/rest/v2/all`)
            .then(res => {

                if (currentValue === value) {
                    const { result } = res.data;
                    const data = [];

                    res.data.forEach(r => {
                        console.log("r: ", r);
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
            dataLocality: [],
            value: undefined,
            registration: {}

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
                    PhoneNumber: values.prefix + values.phone,
                    Locality: values.Locality,
                    DateOfBirth:values.DateofBirth
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
        console.log("value", value);
        console.log("regexdigit", value.match(digitsRegex));
        console.log("regexuppercaseletter", value.match(uppercaseRegex));
        if (!value.match(digitsRegex) || !value.match(uppercaseRegex)) {
            
            return callback('Password should contain uppercase letter etc')
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
        const { getFieldDecorator } = this.props.form;
        // const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 10,
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




        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="E-mail">
                    {getFieldDecorator('email', {
                        initialValue: undefined,
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
                        initialValue: undefined,
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
                            {
                                validator: this.strongValidator
                            }
                        ],
                    })(<Input.Password />)}
                </Form.Item>
                <Form.Item label="Confirm Password" hasFeedback>
                    {getFieldDecorator('confirm', {
                        initialValue: undefined,
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
                        initialValue: undefined,
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
                        initialValue: undefined,
                        rules: [{ required: true, message: 'Please input your Surnname!', whitespace: true }],
                    })(<Input />)}
                </Form.Item>

                <Form.Item label="Phone Number">
                    {getFieldDecorator('phone', {
                        initialValue: undefined,
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


                <Form.Item label="Locality">
                    {getFieldDecorator('Locality', {
                        rules: [
                            {
                                required: true,
                                message: 'Please choose your Locality',
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
                </Form.Item>


                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>



            </Form>
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

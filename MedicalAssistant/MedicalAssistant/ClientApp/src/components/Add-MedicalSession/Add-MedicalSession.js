import React, { Component } from 'react';
import { Form, Input, Icon, Button, InputNumber } from 'antd';
import { Link } from "react-router-dom";
import '../HomePage/home.css';
import * as MedicalSessionActions from './reducer';
import { push } from 'connected-react-router';
import get from 'lodash.get';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import './Add-MedicalSession.css';
import SpinnerWidget from '../spinner';
let id = 0;


const propTypes = {
    AddRecipe: PropTypes.func.isRequired,
    GetPatient: PropTypes.func.isRequired,
    IsLoading: PropTypes.bool.isRequired,
    IsFailed: PropTypes.bool.isRequired,
    IsSuccess: PropTypes.bool.isRequired,
    errors: PropTypes.object,
    statuscode: PropTypes.number,
    PatientID: PropTypes.number,
    DoctorID: PropTypes.number,
    patient: PropTypes.object
};

const defaultProps = {};

class DynamicFieldSet extends Component {
    state = {
        PatientID: 0,
        patient: null
    };

    componentDidMount() {
        console.log("componentDidMount: ", this.state.PatientID)
        this.props.GetPatient(this.state.PatientID);
    }


    static getDerivedStateFromProps = (props, state) => {
        return {
            PatientID: props.PatientID,
            patient: props.patient
        };
    }


    remove = k => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };

    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let medicines = [];
                const { keys, names, kd, op, krd } = values;
                var today = new Date();
                  
                 console.log("values: ",values);
 
                keys.map(key => medicines.push({ name: names[key], countdays: kd[key], receptionfeatures: op[key], counttimesaday: krd[key] }));
                console.log('medicines: ', medicines);
                const recipemodel = {
                    PatientID: this.props.PatientID,
                    DoctorID: this.props.DoctorID,
                    Diagnos: values.diagnos,
                    Tablets: medicines,
                    Date: today.toISOString().substring(0, 10)
                };
                console.log("recipemodel: ", recipemodel);
                this.props.AddRecipe(recipemodel);

            }
        });
    };

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { patient } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };


        getFieldDecorator('keys', { initialValue: [] });

        const keys = getFieldValue('keys');

        const formItems = keys.map((title, k, index) => (
            <div className="container " style={{ top: '6px' }}>

                <div className="row tmps" >
                    <div className="col-12 col-sm-6" >
                        <Form.Item
                            // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                            label={index === 0 ? 'Ліки' : ''}
                            required={false}
                            key={k}
                        >
                            {getFieldDecorator(`names[${k}]`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: "Введіть назву ліків",
                                    },
                                ],
                            })
                                (<Input placeholder="Назва ліків" />)}


                        </Form.Item>
                    </div>
                    <div className="col-12 col-sm-2">
                        <Form.Item>

                            {getFieldDecorator(`kd[${k}]`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [
                                    {
                                        required: true,
                                        message: 'Кількість днів',
                                    },
                                ],
                            })(<InputNumber placeholder="К-ть днів" min={1} max={30} initialValue={1} />)}


                        </Form.Item>
                    </div>
                </div>
                <div className="row tmps">
                    <div className="col-12 col-sm-6">
                        <Form.Item>

                            {getFieldDecorator(`op[${k}]`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: "Особливості прийому",
                                    },
                                ],
                            })
                                (<Input placeholder="Особливості прийому" />)}

                        </Form.Item>
                    </div>
                    <div className="col-12 col-sm-2">
                        <Form.Item>
                            {getFieldDecorator(`krd[${k}]`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [
                                    {
                                        required: true,
                                        message: 'Кількість разів в день',

                                    },
                                ],
                            })(<InputNumber placeholder="К-ть р/д" min={1} max={10} initialValue={1} />
                            )}

                        </Form.Item>


                        {keys.length > 1 ? (
                            <Icon
                                className="dynamic-delete-button"
                                type="minus-circle-o"
                                onClick={() => this.remove(k)}
                            />
                        ) : null}

                    </div>
                </div>
            </div>
        ));

        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        };


        return (

           
            <div className="container">
                {
                    patient ?
                        <div>
                            <h3 className="moreHeader"> Пацієнт</h3>
                            <div className="col-12 col-md-6 p">
                                <p className="ptext"> Ім'я:  {patient.patientName}</p>
                                <p className="ptext"> Прізвище: {patient.patientSurname}</p>
                                <p className="ptext">Дата народження: {new Date(patient.patientDateOfBirth).toLocaleString("ua", options)}</p>
                                <p className="ptext">Email: {patient.patientEmail}</p>
                                <p className="ptext">Номер телефону: {patient.patientPhoneNumber}</p>
                                <Link className="link" to="/doctor/medicalhistory" >Історія хвороб пацієнта</Link>
                            </div>

                            <h3 className="moreHeader">Рецепт</h3>

                            <Form onSubmit={this.handleSubmit}>
                                <div className="row tmps">
                                    <div className="col-12 col-sm-10 col-md-10">
                                        <Form.Item label="Діагноз:">
                                            {getFieldDecorator('diagnos', {
                                                rules: [{ required: true, message: 'Введіть діагноз' }],
                                            })(<Input.TextArea />)}
                                        </Form.Item>
                                    </div>
                                </div>
                                {formItems}
                                <div className="row tmps">
                                    <div >
                                        <Form.Item>
                                            <Button style={{ backgroundColor: 'rgb(157, 181,167)',border:'1px solid rgb(49, 112, 83)',fontFamily:'Candara',color:'rgb(49,112,83)'  }} type="dashed" onClick={this.add} >
                                                <Icon type="plus" /> Add field
                        </Button>
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="row tmps">
                                    <div>
                                        <Form.Item >
                                            <Button  type="primary" htmlType="submit" style={{backgroundColor:'rgb(49, 112, 83)' ,border:'1px solid rgb(49, 112, 83)'}}>
                                                Save
                        </Button>

                                        </Form.Item>
                                    </div>
                                </div>

                            </Form>
                        </div>

                        : <SpinnerWidget loading="true" />
                }

            </div>
        );
    }
}


const mapState = (state) => {
    return {
        IsLoading: get(state, 'recipiesReducer.recipe.loading'),
        IsFailed: get(state, 'recipiesReducer.recipe.failed'),
        IsSuccess: get(state, 'recipiesReducer.recipe.success'),
        errors: get(state, 'recipiesReducer.recipe.errors'),
        statuscode: get(state, 'recipiesReducer.recipe.statuscode'),
        PatientID: get(state, 'doctorsReducer.getpatient.PatientID'),
        DoctorID: get(state, 'doctorsReducer.detaileddoctor.doctor.id'),
        patient: get(state, 'MedicalSessionReducer.getpatient.patient')
    }
}

const mapDispatch = {

    AddRecipe: (Recipe) => {
        return MedicalSessionActions.AddRecipe(Recipe);
    },
    GetPatient: (PatientId) => {
        return MedicalSessionActions.GetPatient(PatientId);
    },
    push: (url) => {
        return (dispatch) => {
            dispatch(push(url));
        }
    }
}


DynamicFieldSet.propTypes = propTypes;
DynamicFieldSet.defaultProps = defaultProps;


const WrappedDynamicFieldSet = Form.create({ name: 'dynamic_form_item' })(DynamicFieldSet);
// ReactDOM.render(<WrappedDynamicFieldSet />, mountNode);
export default connect(mapState, mapDispatch)(WrappedDynamicFieldSet);
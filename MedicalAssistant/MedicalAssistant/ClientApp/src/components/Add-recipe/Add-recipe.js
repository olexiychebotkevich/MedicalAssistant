import React, { Component } from 'react';
import { Form, Input, Icon, Button,InputNumber} from 'antd';
import '../HomePage/home.css';
import * as recipeActions from './reducer';
import { push } from 'connected-react-router';
import get from 'lodash.get';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import './Add-recipe.css';
let id = 0;


const propTypes = {
    AddRecipe: PropTypes.func.isRequired,
    IsLoading: PropTypes.bool.isRequired,
    IsFailed: PropTypes.bool.isRequired,
    IsSuccess: PropTypes.bool.isRequired,
    errors: PropTypes.object,
    statuscode: PropTypes.number,
    PatientID: PropTypes.number,
    DoctorID: PropTypes.number
};

const defaultProps = {};

class DynamicFieldSet extends React.Component {
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
                const { keys, names,kd,op,krd} = values;
                var today = new Date();
                 

                keys.map(key => medicines.push({name:names[key],countdays:kd[key],receptionfeatures:op[key],counttimesaday:krd[key]}));
                console.log('medicines: ', medicines);
                const recipemodel = {
                    PatientID:this.props.PatientID,
                    DoctorID:this.props.DoctorID,
                    Diagnos: values.diagnos,
                    Medicines: medicines,
                    Date:today.toISOString().substring(0, 10)
                  
                   
                };
                console.log("recipemodel: ",recipemodel);
                this.props.AddRecipe(recipemodel);
                    
            }
        });
    };

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
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
            <div className="container " style={{top:'6px'}}>
           
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
                    })(<InputNumber placeholder="К-ть днів" min={1} max={30} initialValue={1}  />)}


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
                        (<Input placeholder="Особливості прийому"  />)}

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
                    })(<InputNumber placeholder="К-ть р/д" min={1} max={10} initialValue={1} />)}

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


        return (


            <div className="container">
         

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
                        <Button type="dashed" onClick={this.add} >
                            <Icon type="plus" /> Add field
                        </Button>
                    </Form.Item>
                    </div>
                    </div>
                    <div className="row tmps">
                      <div>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>

                    </Form.Item>
                    </div>
                    </div>
                   
                </Form>
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
        PatientID:get(state,'doctorsReducer.getpatient.PatientID'),
        DoctorID:get(state,'doctorsReducer.detaileddoctor.doctor.id')
    }
  }
  
  const mapDispatch = {
  
    AddRecipe: (Recipe) => {
        return recipeActions.AddRecipe(Recipe);
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
export default connect(mapState,mapDispatch)(WrappedDynamicFieldSet);
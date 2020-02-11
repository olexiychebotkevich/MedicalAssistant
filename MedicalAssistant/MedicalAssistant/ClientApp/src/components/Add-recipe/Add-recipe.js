import React, { Component } from 'react';
import { Form, Input, Icon, Button,InputNumber} from 'antd';
import '../home.css';

import './Add-recipe.css';
let id = 0;

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
                const { keys, names } = values;
                console.log('Received values of form: ', values);
                console.log('Merged values:', keys.map(key => names[key]));
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
            <div>
           

            <Form.Item
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    label={index === 0 ? 'Ліки' : ''}
                    required={false}
                    key={k}
                >
                    {getFieldDecorator('name', {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [
                            {
                                required: true,
                                whitespace: true,
                                message: "Введіть назву ліків",
                            },
                        ],
                    })
                        (<Input placeholder="Назва ліків" style={{ width: '60%', marginRight: 8 }} />)}


             </Form.Item>


<Form.Item>
                    {getFieldDecorator('kd', {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [
                            {
                                required: true,
                                message: 'Кількість днів',
                            },
                        ],
                    })(<InputNumber placeholder="К-ть днів" min={1} max={30} initialValue={1} />)}


</Form.Item>


<Form.Item>
                    {getFieldDecorator('op', {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [
                            {
                                required: true,
                                whitespace: true,
                                message: "Особливості прийому",
                            },
                        ],
                    })
                        (<Input placeholder="Особливості прийому" style={{ width: '60%', marginRight: 8 }} />)}

</Form.Item>

<Form.Item>
                    {getFieldDecorator('krd', {
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
        ));


        return (


            <div>
         

                <Form onSubmit={this.handleSubmit}>
                  
                    <Form.Item label="Діагноз:">
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: 'Введіть діагноз' }],
                        })(<Input />)}
                    </Form.Item>

                    {formItems}

                    <Form.Item {...formItemLayoutWithOutLabel}>
                        <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                            <Icon type="plus" /> Add field
                        </Button>
                    </Form.Item>

                    <Form.Item {...formItemLayoutWithOutLabel}>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const WrappedDynamicFieldSet = Form.create({ name: 'dynamic_form_item' })(DynamicFieldSet);
// ReactDOM.render(<WrappedDynamicFieldSet />, mountNode);
export default WrappedDynamicFieldSet;
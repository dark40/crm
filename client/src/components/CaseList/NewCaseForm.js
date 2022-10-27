import React, { useState } from 'react';
import { Space, Table, Tag, Button, Breadcrumb, Modal, Input, DatePicker, Select, Form } from 'antd';
import { useMutation } from '@apollo/client';
import { ADD_CASE } from '../../utils/mutations';
import moment from 'moment';

const NewCaseForm = () => {

    const [isNew, setIsNew] = useState(false);

    const [newCase, setNewCase] = useState(null);
    const [addCase] = useMutation(ADD_CASE);


    const handleNewCase = (record) => {
        setNewCase({ ...record });
        setIsNew(true);
    }

    const resetEditing = () => {
        setIsNew(false);
        setNewCase(null);
    }


    return (
        <Modal
            title="New Case"
            open={isNew}
            okText='Save'
            onCancel={() => { resetEditing() }}
            onOk={() => {
                addCase({ variables: { ...newCase } });
                resetEditing();
                window.location.reload();
            }}
        >

            <Form
                name="New Case"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={window.location.reload()}
                //   onFinishFailed={}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

        </Modal>
    );
};

export default NewCaseForm;
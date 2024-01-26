import React, { useState, useImperativeHandle } from "react";
import { AutoComplete, Button, Cascader, Checkbox, Col, Form, Input, InputNumber, notification, Row, Modal, Select, message } from "antd";
import { syncUser } from "@/api/exam";

const { Option } = Select;

type AddUserModalProps = {
    onRef?: React.RefObject<any>; 
    refresh: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = (props) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const formItemLayout = {}

    // 暴露方法
    useImperativeHandle(props.onRef, () => {
        return {
            init: init,
        };
    });
    const init = () => {
        console.log("init");
        setIsModalOpen(true);
    };

    const onFinish = async (values: any) => {
        setLoading(true);
        const url = values.url.match(/(?<=\/u\/)(\d+)/)?.[0] ?? '';
        syncUser({
            uid: url
        }).then(res => {
            message.success({
                content: "Success",
            });
        })
            .catch(() => { }).finally(() => {
                setLoading(false);
                setIsModalOpen(false);
                form.resetFields();
                props.refresh()

            })
    };



    const handleOk = async () => {
        await form.validateFields();
        form.submit();
        // form.resetFields(); // 可以重置校验状态
    };

    const handleCancel = () => {
        form.resetFields(); // 可以重置校验状态
        setIsModalOpen(false);
    };

    return (
        <Modal title="Add" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} forceRender destroyOnClose confirmLoading={loading}>
            <Form
                form={form}
                name="register"
                onFinish={onFinish}
                {...formItemLayout}
            >
                <Form.Item
                    name="url"
                    label="用户主页地址"
                    rules={[
                        {
                            required: true,
                            message: "请输入用户主页地址",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>



            </Form>
        </Modal>
    );
};

export default AddUserModal;

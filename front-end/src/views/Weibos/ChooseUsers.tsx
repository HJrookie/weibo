import React, { useState, useImperativeHandle } from "react";
import { AutoComplete, Button, Cascader, Checkbox, Col, Form, Input, InputNumber, notification, Row, Modal, Select, message } from "antd";
import { syncUser, syncWeibos } from "@/api/exam";
import { getUsers, getVideos, } from "@/api/exam";
import { UserListType } from "@/utils/types";

const { Option } = Select;

type AddUserModalProps = {
    onRef?: React.RefObject<any>;
    refresh: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = (props) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<UserListType[]>([])

    const formItemLayout = {}

    // 暴露方法
    useImperativeHandle(props.onRef, () => ({
        init: init,
    }))

    const init = () => {
        setIsModalOpen(true);
        getUsers({
            page: 1,
            pageSize: 1000
        }).then(res => {
            setUsers(res?.data?.data ?? [])
        })
    };



    const onFinish = async (values: any) => {
        setLoading(true);
        syncWeibos({
            userId: values.userId
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
        <Modal title="同步微博" width={400} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} forceRender destroyOnClose confirmLoading={loading}>
            <Form
                form={form}
                name="register"
                onFinish={onFinish}
                {...formItemLayout}
            >

                <Form.Item name="userId" label="用户列表" rules={[{ required: true, message: "请选择要同步的用户" }]}>
                    <Select placeholder="请选择要同步的用户">
                        {
                            users.map(user => <Option value={user.id} key={user.id}>{user.profile.name}</Option>)
                        }
                    </Select>
                </Form.Item>




            </Form>
        </Modal>
    );
};

export default AddUserModal;

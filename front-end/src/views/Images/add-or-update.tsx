import React, { useState, useImperativeHandle } from "react";
import { AutoComplete, Button, Cascader, Checkbox, Col, Form, Input, InputNumber, notification, Row, Modal, Select } from "antd";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    // xs: {  },
    // sm: { span: 4 },
    span: 6,
  },
  wrapperCol: {
    // xs: { span: 16 },
    // sm: { span: 16 },
    span: 18,
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
      offset: 8,
    },
  },
};

const AddOrUpdate: React.FC = (props: { onRef?: React.RefObject<any> }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

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

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const onWebsiteChange = (value: string) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult([".com", ".org", ".net"].map((domain) => `${value}${domain}`));
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
    form.resetFields(); // 可以重置校验状态
    setLoading(true);
    setTimeout(() => {
      notification.success({
        message: "Notification Title",
        description: "This is the content of the notification. This is the content of the notification.",
      });
      setLoading(false);
      setIsModalOpen(false);
    }, 800);
    // setIsModalOpen(false);
  };

  const handleCancel = () => {
    form.resetFields(); // 可以重置校验状态
    setIsModalOpen(false);
  };

  return (
    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} forceRender destroyOnClose confirmLoading={loading}>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "86",
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label=" Password2"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("The two passwords that you entered do not match!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="nickname"
          label="Nickname"
          tooltip="What do you want others to call you?"
          rules={[{ required: true, message: "Please input your nickname!", whitespace: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="website" label="Website" rules={[{ required: true, message: "Please input website!" }]}>
          <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">
            <Input />
          </AutoComplete>
        </Form.Item>

        <Form.Item name="intro" label="Intro" rules={[{ required: true, message: "Please input Intro" }]}>
          <Input.TextArea showCount maxLength={100} />
        </Form.Item>

        <Form.Item name="gender" label="Gender" rules={[{ required: true, message: "Please select gender!" }]}>
          <Select placeholder="select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        {/*<Form.Item label="Captcha" extra="We must make sure that your are a human.">*/}
        {/*  <Row gutter={8}>*/}
        {/*    <Col span={12}>*/}
        {/*      <Form.Item name="captcha" noStyle rules={[{ required: true, message: "Please input the captcha you got!" }]}>*/}
        {/*        <Input />*/}
        {/*      </Form.Item>*/}
        {/*    </Col>*/}
        {/*    <Col span={12}>*/}
        {/*      <Button>Get captcha</Button>*/}
        {/*    </Col>*/}
        {/*  </Row>*/}
        {/*</Form.Item>*/}

        {/*<Form.Item {...tailFormItemLayout}>*/}
        {/*  <Button type="primary" htmlType="submit">*/}
        {/*    Register*/}
        {/*  </Button>*/}
        {/*</Form.Item>*/}

        {/*<Row justify={"center"}>/*/}
      </Form>
    </Modal>
  );
};

export default AddOrUpdate;

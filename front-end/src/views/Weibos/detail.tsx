import React, { useState, useImperativeHandle } from "react";
import { AutoComplete, Button, Cascader, Checkbox, Col, Form, Input, InputNumber, notification, Row, Modal, Select } from "antd";
import { RichText } from "@/components/RichText/richText";
import { BlogItem } from "@/utils/types";


const AddOrUpdate: React.FC = (props: { onRef?: React.RefObject<any> }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogData, setBlogData] = useState<Partial<BlogItem> | undefined>(undefined)

  // 暴露方法
  useImperativeHandle(props.onRef, () => {
    return {
      init: init,
    };
  });
  const init = (data: Partial<BlogItem>) => {
    setBlogData({ ...data })

    setIsModalOpen(true);
  };


  const handleOk = () => {
    // setBlogData
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setBlogData(undefined)
  };

  return (
    <Modal title="Preview" open={isModalOpen} width={900} onOk={handleCancel} onCancel={handleCancel} destroyOnClose >
      {isModalOpen ? <RichText content={blogData?.content ?? ''}></RichText> : ''}

      <Row gutter={[16, 16]}>
        {
          blogData?.blogImages?.map(img => {
            return <Col span={6} key={img.id}>

              <img src={img.url}  ></img>

            </Col>
          })
        }

        <div className="ttt">
          2222222
        </div>

      </Row>

    </Modal>
  );
};

export default AddOrUpdate;

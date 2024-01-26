import React, { useState, useImperativeHandle } from "react";
import { AutoComplete, Button, Cascader, Checkbox, Col, Form, Input, InputNumber, notification, Row, Modal, Select } from "antd";
import { RichText } from "@/components/RichText/richText";
import { BlogItem } from "@/utils/types";
import { Image } from 'antd';


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
    <Modal  wrapClassName="preview-wrapper" title="Preview" open={isModalOpen} width={680} onOk={handleCancel} onCancel={handleCancel} destroyOnClose >
      {isModalOpen ? <RichText content={blogData?.content ?? ''}></RichText> : ''}

      <Row gutter={[8, 8]} className={'detail-imgs'}>
        <Image.PreviewGroup>
          {
            blogData?.blogImages?.map(img => {
              return <Col span={8} key={img.id}>
                <Image width={'100%'} src={img.url} />
                {/* <img src={img.url}  className="detail-img" ></img> */}
              </Col>
            })
          }

        </Image.PreviewGroup>
      </Row>

    </Modal>
  );
};

export default AddOrUpdate;

import React, { useState, useEffect, createRef } from "react";
import { AutoComplete, Button, Card, Cascader, Checkbox, Col, Descriptions, Divider, Form, Input, InputNumber, Row, Select } from "antd";
import AddOrUpdate from "./add-or-update";
const { Option } = Select;
import { PlusCircleOutlined } from "@ant-design/icons";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getVideos, getVieeoDetail, syncVideos } from "@/api/exam";
import { PaperType, Status } from "@/utils/dict";
import ActionDropdown from "@/components/ActionDropdown";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { StudentExamListType } from "@/utils/types";
import { Drawer, Image } from "antd";
import "./index.less";
import ImagesView from "@/components/ImagesView";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
const ExamList: React.FC = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const addOrUpdateRef = createRef<any>();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<{
    [k: string]: any;
  } | null>(null);
  const [visible, setVisible] = useState(false);
  const addOrUpdate = (data?: DataType) => {
    console.log(1, data);
    addOrUpdateRef.current?.init(data);
  };

  const handlePageChange = (page, pageSize) => {
    console.log(page, pageSize);
    setPage(page);
    setPageSize(pageSize);
  };

  const refresh = () => {
    syncVideos().then((res) => {});
  };

  useEffect(() => {
    // setLoading(true);
    // const data = { page, pageSize };
    // getVideos(data).then((res) => {
    //   console.log("re", res);
    //   setTableData(res?.data?.data ?? []);
    //   setTotal(res?.data?.total ?? 0);
    //   setLoading(false);
    // });
  }, [page, pageSize]);

  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }

  const onClose = () => {
    setDetail(null);
    setOpen(false);
  };
  const editCol = (info: any) => {
    getVieeoDetail({
      ...info
    }).then((res) => {
      console.log(222, res);
      setOpen(true);
      setDetail({
        ...info,
        imgs: [
          {
            src: "",
            name: "kk",
          },
          {
            src: "",
            name: "2",
          },
        ],
      });
    }).catch(err=>{
      console.log(5,err)
    })
    console.log(3, info);
  };
  const columns: ColumnsType<StudentExamListType> = [
    {
      title: "名称",
      dataIndex: "code",
      align: "center",
      key: "code",
      ellipsis: true,
    },
    {
      title: "vv",
      dataIndex: "vvId",
      align: "center",
      ellipsis: true,
    },
    {
      title: "备注",
      dataIndex: "note",
      align: "center",
      key: "endTime",
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      align: "center",
      width: 240,
      render: (text, record) => {
        return (
          <Button type="link" onClick={() => editCol(record)}>
            编辑
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <Row justify={"end"}>
        <Col>
        <Space>
            <Button onClick={() => refresh()}>
              同步微博 <PlusCircleOutlined />{" "}
            </Button>
            <Button onClick={() => addOrUpdate()}>新增</Button>
          </Space>
        </Col>
      </Row>

      <Table
        columns={columns}
        loading={loading}
        rowKey={(r) => r.id}
        dataSource={tableData}
        className={"common-table"}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: total,
          onChange: handlePageChange,
        }}
      />

      <Drawer title="Info" placement="right" onClose={onClose} open={open} width="1200">
        <div id="videoInfo">
          <div className="imgAndInfo">
            <div className="img">
              <Image
                width={800}
                src=""
                preview={{
                  visible,
                  scaleStep: 0.5,
                  src: "",
                  onVisibleChange: (value: boolean | ((prevState: boolean) => boolean)) => {
                    setVisible(value);
                  },
                }}
              />
            </div>
            <div className="info">
              <Card style={{ width: 400 }}>
                <Descriptions title="User Info" bordered column={1}>
                  <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                  <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                  <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                  <Descriptions.Item label="Address">No. 18, Wiang, China</Descriptions.Item>
                  <Descriptions.Item label="Remark">empty</Descriptions.Item>
                </Descriptions>
              </Card>
            </div>
          </div>
          <Divider />
          <div className="imgs">
            <ImagesView imgs={detail?.imgs ?? []}></ImagesView>
          </div>
          <Divider />
        </div>
      </Drawer>

      <AddOrUpdate onRef={addOrUpdateRef}></AddOrUpdate>
    </div>
  );
};

export default ExamList;


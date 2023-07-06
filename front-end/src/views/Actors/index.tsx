import React, { useState, useEffect, createRef } from "react";
import { AutoComplete, Button, Card, Cascader, Checkbox, Col, Form, Input, InputNumber, Row, Select } from "antd";

import { PlusCircleOutlined } from "@ant-design/icons";
// import AddOrUpdate from "./add-or-update";
const { Option } = Select;
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getUsers, getVideos, syncUsers } from "@/api/exam";
import { PaperType, Status } from "@/utils/dict";
import ActionDropdown from "@/components/ActionDropdown";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { actorListType } from "@/utils/types";
import { Drawer } from "antd";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const Actors: React.FC = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const addOrUpdateRef = createRef<any>();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState(null);

  const refresh = () => {
    syncUsers().then((res) => {});
  };

  const addOrUpdate = (data?: DataType) => {
    console.log(1, data);
    addOrUpdateRef.current?.init(data);
  };

  const handlePageChange = (page, pageSize) => {
    console.log(page, pageSize);
    setPage(page);
    setPageSize(pageSize);
  };

  useEffect(() => {
    setLoading(true);
    const data = { page, pageSize };
    getUsers(data).then((res) => {
      console.log("re", res);
      setTableData(res?.data?.data ?? []);
      setTotal(res?.data?.total ?? 0);
      setLoading(false);
    });
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
    console.log(3, info);
    setOpen(true);
    setDetail(info);
  };
  const columns: ColumnsType<actorListType> = [
    {
      title: "姓名",
      dataIndex: "name",
      align: "center",
      ellipsis: true,
    },
    {
      title: "备注",
      dataIndex: "note",
      align: "center",
    },

    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      align: "center",
      width: 240,
      render: (text, record) => {
        // const menu = [
        //   {
        //     label: "开始答题",
        //     onClick: () => startExam(record.id),
        //   },
        //   {
        //     label: "查看试卷",
        //     onClick: () => window.open(`/#/exam/preview/${record.id}/${record.resultId}`),
        //   },
        // ];
        // return <ActionDropdown menu={menu} />;
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
              同步 <PlusCircleOutlined />{" "}
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

      <Drawer title="Info" placement="right" onClose={onClose} open={open} size="large">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>

        <div id="videoInfo">
          <div className="imgAndInfo">
            <div className="img"></div>
            <div className="info">
              <Card title="Default size card" extra={<a href="#"></a>} style={{ width: 300 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
            </div>
          </div>
        </div>
      </Drawer>

      {/* <AddOrUpdate onRef={addOrUpdateRef}></AddOrUpdate> */}
    </div>
  );
};

export default Actors;

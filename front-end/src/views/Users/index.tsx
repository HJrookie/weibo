import React, { useState, useEffect, createRef } from "react";
import { AutoComplete, Button, Card, Cascader, Checkbox, Col, Form, Input, InputNumber, message, Row, Select } from "antd";

import { PlusCircleOutlined,SearchOutlined,SyncOutlined } from "@ant-design/icons";
// import AddOrUpdate from "./add-or-update";
const { Option } = Select;
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getUsers, getVideos, syncUser, } from "@/api/exam";
import { PaperType, Status } from "@/utils/dict";
import ActionDropdown from "@/components/ActionDropdown";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { UserListType } from "@/utils/types";
import { Drawer } from "antd";
import AddUserModal from "./AddUserModal";



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


  const addOrUpdate = (data?: UserListType) => {
    addOrUpdateRef.current?.init(data);
  };

  const handlePageChange = (page, pageSize) => {
    console.log(page, pageSize);
    setPage(page);
    setPageSize(pageSize);
  };

const syncUserListType = (user:UserListType)=>{
  syncUser({uid:user.profile?.uid}).then(()=>{
    message.success({
      content:'Success'
    })
  })
}

const initData = ()=>{
  setLoading(true);
    const data = { page, pageSize };
    getUsers(data).then((res) => {
      console.log("re", res);
      setTableData(res?.data?.data ?? []);
      setTotal(res?.data?.total ?? 0);
      setLoading(false);
    });
}

  useEffect(() => {
    initData()
  }, [page, pageSize]);



  const onClose = () => {
    setDetail(null);
    setOpen(false);
  };
  const editCol = (info: any) => {
    console.log(3, info);
    setOpen(true);
    setDetail(info);
  };
  const columns: ColumnsType<UserListType> = [
    {
      title: "昵称",
      dataIndex: "name",
      align: "center",
      ellipsis: true,
      render: (text, record) => {
        return <a href={`https://weibo.com/u/${record.profile.uid}`}>{record.profile.name}</a>;
      },
    },
    {
      title: "描述",
      dataIndex: "note",
      align: "center",
      render: (text, record) => {
        return <div>{record?.profile?.description}</div>;
      },
    },
    {
      title: "粉丝",
      dataIndex: "note",
      width:100,
      align: "center",
      render: (text, record) => {
        return <div>{  ((record?.profile?.followersCount??0)/(10**4)  ).toFixed(2)+ 'w'}</div>;
      },
    },
    {
      title: "Blog 地址",
      align: "center",
      width:100,
      render: (text, record) => {
        return <a href={record.profile.blogAddress}>Blog</a>;
      },
    },
    {
      title: "操作",
      width:200,

      align: "center",
      render: (text, record) => {
        return <Button onClick={() => syncUserListType(record)}>
         <SyncOutlined />
      </Button>
      },
    },
  ];

  return (
    <div>
      <Row justify={"end"}>
        <Col>
          <Space>
            <Button onClick={() => addOrUpdate()}>新增</Button>
            <Button onClick={() => initData()}>
              查询<SearchOutlined />
            </Button>

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

      {/* @ts-ignore */}
      <AddUserModal onRef={addOrUpdateRef} refresh={()=>initData()} ></AddUserModal>


    </div>
  );
};

export default Actors;

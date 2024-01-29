import React, { useState, useEffect, createRef, useCallback, useMemo, useRef } from "react";
import { AutoComplete, Button, Card, Cascader, Checkbox, Col, Descriptions, Divider, Form, Input, InputNumber, message, Row, Select, Tooltip } from "antd";
import BlogDetail from "./detail";
import ChooseUser from "./ChooseUsers"

const { Option } = Select;
import { PlusCircleOutlined, SyncOutlined, SearchOutlined } from "@ant-design/icons";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getUsers, getVideos, getVieeoDetail, getWeibos, syncWeibos } from "@/api/exam";
import { PaperType, Status } from "@/utils/dict";
import ActionDropdown from "@/components/ActionDropdown";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { BlogItem, StudentExamListType, UserListType } from "@/utils/types";
import { Drawer, Image } from "antd";
import "./index.less";
import ImagesView from "@/components/ImagesView";
import "react-photo-view/dist/react-photo-view.css";
import { debounce, formatDate, parstBlogContent } from "@/utils";

import type { SearchProps } from 'antd/es/input/Search';


const ExamList: React.FC = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const detailRef = createRef<any>();
  const chooseUserRef = createRef<any>();

  const [searchValue, setSearchValue] = useState('')
  const [users, setUsers] = useState<UserListType[]>([])
  const [userId, setUserId] = useState(undefined)
  const userIdRef = useRef(userId)

  const addOrUpdate = (data?: BlogItem) => {
    detailRef.current?.init(data);
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const getTableData = (searchValue?: string,) => {
    setLoading(true);
    const data = { page, pageSize, searchValue, userId:userIdRef.current };
    getWeibos(data).then((res) => {
      setTableData(res?.data?.data ?? []);
      setTotal(res?.data?.total ?? 0);
      setLoading(false);
    }).catch(err => { setLoading(false); })
  }

  useEffect(() => {
    getTableData(searchValue)
  }, [page, pageSize,]);

  useEffect(() => {
    getUsers({
      page: 1,
      pageSize: 1000
    }).then(res => {
      setUsers(res?.data?.data ?? [])
    })
  }, [])




  const columns: ColumnsType<BlogItem> = [
    // {
    //   title: "名称",
    //   align: "center",
    //   ellipsis: true,
    // },
    {
      title: "内容",
      align: "left",
      dataIndex: 'content',
      render: (text, record) => {
        return (
          <Tooltip title={record.content} trigger="hover" >
            <div className="rich-wrapper" dangerouslySetInnerHTML={{ __html: parstBlogContent(record.content) }}>
            </div>
          </Tooltip>
        );
      },
    },
    {
      title: "创建时间",
      dataIndex: "blogCreateAt",
      align: "center",
      width: 200,
      render: (text, record) => {
        return (
          <span>{formatDate(record?.blogCreateAt ?? '')}</span>
        );
      },
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      align: "center",
      width: 240,
      render: (text, record) => {
        return (
          <Button type="link" onClick={() => addOrUpdate(record)}>
            详情
          </Button>
        );
      },
    },
  ];

  // useEffect(()=>{
  //   userIdRef.current = userId;
  // },[userId])

  const reset = () => {
    setSearchValue('')
    setUserId(undefined)
    userIdRef.current = undefined;
    getTableData('')
  }

  const debouncedGetTable = useMemo(() => debounce(getTableData, 500), [])

  return (
    <div>
      <Row >
        <Col>
          <Input.Search placeholder=" search " value={searchValue} onChange={(e: any) => {
            setSearchValue(e.target.value ?? '')
            debouncedGetTable(e.target.value ?? "");
          }} />
        </Col>
        <Col span={10}>
          <Select placeholder={'请选择用户'} className="top-select" value={userId} onChange={v=>{
            setUserId(v);
    userIdRef.current = v;

          }}>
            {
              users.map(user => <Option value={user.id} key={user.id}>{user.profile.name}</Option>)
            }
          </Select>
        </Col>

        <Col>

          <Space>
            {/* <Button onClick={() => refresh()}> */}
            <Button onClick={() => {
              chooseUserRef.current?.init();
            }}>
              同步
            </Button>

            <Button onClick={() => getTableData(searchValue,)}>
              查询<SearchOutlined />
            </Button>

            <Button onClick={() => reset()}>
              重置 <SyncOutlined />
            </Button>


            {/* <Button onClick={() => addOrUpdate()}>新增</Button> */}
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
      <BlogDetail onRef={detailRef} ></BlogDetail>
      <ChooseUser onRef={chooseUserRef} refresh={() => getTableData()}></ChooseUser>
    </div>
  );
};

export default ExamList;




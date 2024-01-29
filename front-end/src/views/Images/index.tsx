import React, { useState, useEffect, createRef, useCallback, useMemo } from "react";
import { AutoComplete, Button, Card, Cascader, Checkbox, Col, Descriptions, Divider, Form, Input, InputNumber, message, Row, Select, Tooltip } from "antd";

const { Option } = Select;
import { PlusCircleOutlined, SyncOutlined, SearchOutlined, CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
   } from "@ant-design/icons";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getImages, getVideos, getVieeoDetail, getWeibos, syncWeibos } from "@/api/exam";
import { PaperType, Status } from "@/utils/dict";
import ActionDropdown from "@/components/ActionDropdown";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { ImageItem,  } from "@/utils/types";
import { Drawer, Image } from "antd";
import "./index.less";
import ImagesView from "@/components/ImagesView";
import "react-photo-view/dist/react-photo-view.css";
import { debounce, formatDate, parstBlogContent } from "@/utils";
import BlogDetail from '../Weibos/detail'
import type { SearchProps } from 'antd/es/input/Search';


const ExamList: React.FC = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const chooseUserRef = createRef<any>();
  const detailRef = createRef<any>();

  const [detail, setDetail] = useState<{
    [k: string]: any;
  } | null>(null);
  const [searchValue, setSearchValue] = useState('')


  const addOrUpdate = (data?: ImageItem) => {
    detailRef.current?.init(data?.belongToBlog);
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };



  const getTableData = (value?: string) => {
    setLoading(true);
    const data = { page, pageSize, searchValue: value };
    getImages(data).then((res) => {
      setTableData(res?.data?.data ?? []);
      setTotal(res?.data?.total ?? 0);
      setLoading(false);
    }).catch(err => { setLoading(false); })
  }

  useEffect(() => {
    getTableData(searchValue)
  }, [page, pageSize]);



  const columns: ColumnsType<ImageItem> = [
    {
      title: "文件名",
      align: "center",
      ellipsis: true,
      dataIndex: 'fileName',
    },
    // {
    //   title: "内容",
    //   align: "left",
    //   dataIndex: 'content',
    //   render: (text, record) => {
    //     return (
    //       <Tooltip title={record.content} trigger="hover" >
    //         <div className="rich-wrapper" dangerouslySetInnerHTML={{ __html: parstBlogContent(record.content) }}>
    //         </div>
    //       </Tooltip>
    //     );
    //   },
    // },
    {
      title: "状态",
      dataIndex: "download",
      align: "center",
      width: 200,
      render: (text, record) => {
        return ( record.downloadState ? 
          <Tag icon={<CheckCircleOutlined />} color="success">
        已下载
      </Tag> : <Tag icon={<CloseCircleOutlined />} color="default">
        未下载
      </Tag>
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

  const reset = () => {
    setSearchValue('')
    getTableData('')
  }


  return (
    <div>
      <Row justify={"end"}>

        <Col>

          <Space>

            <Button onClick={() => getTableData()}>
              查询<SearchOutlined />
            </Button>

            <Button onClick={() => reset()}>
              重置 <SyncOutlined />
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

<BlogDetail onRef={detailRef}></BlogDetail>

    </div>
  );
};

export default ExamList;




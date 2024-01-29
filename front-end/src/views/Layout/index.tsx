import { Outlet, useLocation } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import "./index.less";
import type { MenuProps } from "antd";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: "group"): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
const { Header, Sider, Content } = Layout;

const MainLayout = (props: any) => {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState([location.pathname.slice(1) || "dashboard"]);
  const navigate = useNavigate();

  console.log(33, location);

  const handleItemClick = (info: any) => {
    const { item, key, keyPath, domEvent } = info;
    console.log(1, { item, key, keyPath, domEvent });
    setSelectedKeys([key]);
    navigate(key);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items: MenuProps["items"] = [
    getItem("dashboard", "dashboard", <AppstoreOutlined />),
    // getItem("Navigation Two", "sub2", <AppstoreOutlined />, [getItem("Option 5", "question"), getItem("Option 6", "paper")]),
    getItem("Navigation Three", "333", <SettingOutlined />, 
    [ getItem("Users", "users"), getItem("Weibos", "weibos"),getItem("Images", "Images"),]),
  ];

  return (
    <Layout id={"layout"}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultOpenKeys={["333"]} selectedKeys={selectedKeys} items={items} onClick={handleItemClick} />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "trigger",
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {/*Content*/}
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;

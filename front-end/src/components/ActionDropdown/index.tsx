import React, { useState, useEffect } from "react";
import { Button, Dropdown, Menu, MenuProps } from "antd";
import { MenuUnfoldOutlined, DownOutlined } from "@ant-design/icons";

const ActionDropdown: React.FC<{
  type?: "inline";
  menu: { label?: string; onClick?: () => void; isShow?: boolean; children?: string }[];
}> = (props) => {
  // inline  指的是 ,单行显示
  if (props.type === "inline") {
    return (
      <div>
        {props?.menu.map((item) => {
          return (
            <a style={{ display: "inline-block", paddingRight: "15px" }} key={item.label} onClick={item.onClick}>
              {item.label}
            </a>
          );
        })}
      </div>
    );
  }

  const MENU = props?.menu.filter((item) => item.isShow === undefined || item.isShow);
  // const menu = (
  //   <Menu>
  //     {MENU.map((item, index) => {
  //       return (
  //         <Menu.Item key={index}>
  //           <a onClick={item.onClick}>{item.label}</a>
  //         </Menu.Item>
  //       );
  //     })}
  //   </Menu>
  // );
  const items: MenuProps["items"] = MENU.map((item, i) => ({ ...item, key: i }));

  return MENU.length > 1 ? (
    <Dropdown menu={{ items }} placement="bottomLeft">
      <Button type="link" style={{ backgroundColor: "#ffffff" }}>
        <MenuUnfoldOutlined style={{ marginRight: "2px" }} />
        <DownOutlined />
      </Button>
    </Dropdown>
  ) : MENU.length > 0 ? (
    <a onClick={MENU[0].onClick}>{MENU[0].label}</a>
  ) : null;
};

export default ActionDropdown;

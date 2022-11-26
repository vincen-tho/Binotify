import { Avatar, Button, Layout, Menu, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const { Header, Content, Sider } = Layout;

const LayoutComponent = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          backgroundColor: "rgb(220, 157, 0)",
          position: "fixed",
          zIndex: 5,
          width: "100%",
        }}
      >
        <div className="flex justify-between">
          <div className="flex">
            <div className="bg-yellow-600 px-4">Binotify Premium</div>
            <div className="flex flex-col items-start ml-4">
              <p className="mx-4 my-0 leading-normal">Name: {user?.name}</p>
              <p className="mx-4 my-0 leading-normal font-semibold">
                <span className="font-semibold">ROLE: </span>
                {user.isAdmin ? "Admin" : "Penyanyi"}
              </p>
            </div>
          </div>
          <div>
            <NavLink to="/logout">
              <Button>LOGOUT</Button>
            </NavLink>
          </div>
        </div>
      </Header>
      <Layout style={{ marginTop: 64 }}>
        <Sider width={260} theme={"light"}>
          <Menu mode="inline">
            <Menu.Item key="1">
              <NavLink to="/subscription">Subscription</NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content
            style={{
              padding: 12,
              margin: 0,
            }}
          >
            {props.content}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;

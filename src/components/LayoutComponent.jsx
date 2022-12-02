import { Avatar, Button, Layout, Menu, Tooltip } from "antd";
import { NavLink } from "react-router-dom";

const { Header, Content, Sider } = Layout;

const LayoutComponent = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
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
            <div className="px-4 font-extrabold italic underline ">
              Binotify Premium
            </div>
            <div className="flex flex-col items-start ml-4">
              <p className="mx-4 my-0 leading-normal">Name: {user?.name}</p>
              <p className="mx-4 my-0 leading-normal font-semibold">
                <span className="font-semibold">ROLE: </span>
                {user.isAdmin == "true" ? "Admin" : "Penyanyi"}
              </p>
            </div>
          </div>
          <div>
            <NavLink to="/logout">
              <Button type="danger">LOGOUT</Button>
            </NavLink>
          </div>
        </div>
      </Header>
      <Layout style={{ marginTop: 64 }}>
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

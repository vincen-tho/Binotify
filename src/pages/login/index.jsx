import { authState } from "@/atoms/authState";
import Background from "@/components/background/Background";
import { Button, Card, Form, Input, Layout } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

const LoginPage = () => {
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
    setAuth({
      isAuth: true,
    });

    navigate("/subscription");
  };

  return (
    <>
      <Background />
      <Layout style={{ minHeight: "100vh" }}>
        <Layout.Content
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            title="Binotify Premium Login"
            style={{ maxWidth: 350, width: "100%", borderRadius: 15 }}
          >
            <Form onFinish={onFinish}>
              Username
              <Form.Item
                name="nik"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>
              Password
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  shape="round"
                  // loading={loading}
                  htmlType="submit"
                  size="large"
                  block
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <p>
              Don't have an account?{" "}
              <NavLink to="/register">Register Here</NavLink>
            </p>
          </Card>
        </Layout.Content>
      </Layout>
    </>
  );
};

export default LoginPage;

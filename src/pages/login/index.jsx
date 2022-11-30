import { authState } from "@/atoms/authState";
import Background from "@/components/background/Background";
import { Button, Card, Form, Input, Layout, notification } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { postLogin } from "@/services/auth";
import { useState } from "react";
import LoadingPage from "@/components/LoadingPage";

const LoginPage = () => {
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await postLogin(values);
      setAuth({
        isAuth: true,
      });
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.token);
      response.user.isAdmin == "true"
        ? navigate("/subscription")
        : navigate("/songs");
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Error",
        description: "Username or password is incorrect",
      });
    } finally {
      setLoading(false);
    }
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
          {loading ? (
            <LoadingPage />
          ) : (
            <Card
              title="Binotify Premium Login"
              style={{ maxWidth: 350, width: "100%", borderRadius: 15 }}
            >
              <Form onFinish={onFinish}>
                Username
                <Form.Item
                  name="username"
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
          )}
        </Layout.Content>
      </Layout>
    </>
  );
};

export default LoginPage;

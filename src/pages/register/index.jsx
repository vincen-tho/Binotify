import Background from "@/components/background/Background";
import { Button, Card, Form, Input, Layout, notification } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import LoadingPage from "@/components/LoadingPage";
import { useState } from "react";
import { postRegister } from "@/services/auth";
import { useSetRecoilState } from "recoil";
import { authState } from "@/atoms/authState";

const RegisterPage = () => {
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    if (values.confirm_password !== values.password) {
      notification.error({
        message: "Error",
        description: "Password and confirm password does not match",
      });
    } else {
      setLoading(true);
      try {
        const response = await postRegister(values);
        setAuth({
          isAuth: true,
        });
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token", response.token);
        navigate("/songs");
      } catch (error) {
        console.log(error);
        notification.error({
          message: "Error",
          description: "Username or email is already registered",
        });
      } finally {
        setLoading(false);
      }
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
              title="Binotify Premium Register"
              style={{ maxWidth: 350, width: "100%", borderRadius: 15 }}
            >
              <Form onFinish={onFinish}>
                Name
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Please input your name!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                Username
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                Email
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
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
                Confirm Password
                <Form.Item
                  name="confirm_password"
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
                Already have an account?{" "}
                <NavLink to="/login">Login Here</NavLink>
              </p>
            </Card>
          )}
        </Layout.Content>
      </Layout>
    </>
  );
};

export default RegisterPage;

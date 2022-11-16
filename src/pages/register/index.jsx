import Background from "@/components/background/Background";
import { Button, Card, Form, Input, Layout } from "antd";
import { NavLink } from "react-router-dom";

const RegisterPage = () => {
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
            title="Binotify Premium Register"
            style={{ maxWidth: 350, width: "100%", borderRadius: 15 }}
          >
            <Form onFinish={() => {}}>
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
              Already have an account? <NavLink to="/login">Login Here</NavLink>
            </p>
          </Card>
        </Layout.Content>
      </Layout>
    </>
  );
};

export default RegisterPage;

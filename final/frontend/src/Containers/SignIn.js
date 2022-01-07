import { Button, Input, Space } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import Title from "../Components/Title";
import SignInBox from "../Components/SignInBox";


const SignIn = ({ me, setMe, setSignedIn, displayStatus, setRegistered, navigate }) => (
  <>
    <Title>
      <h1>NTU Tutor</h1>
    </Title>
    <SignInBox>
      <Space direction="vertical">
        <Input
          prefix={<UserOutlined />}
          value={me}
          enterButton="Sign In"
          onChange={(e) => setMe(e.target.value)}
          placeholder="Enter your name"
          size="large"
        />
      </Space>
      <Space direction="vertical">
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="input password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </Space>
      <Button
        onClick={(me) => {
          if (!me)
            displayStatus({
              type: "error",
              msg: "Missing user name",
            });
          else navigate('/body')
        }}
      >
        Sign In
      </Button>
      <Button>Register</Button>
    </SignInBox>
  </>
);
export default SignIn;

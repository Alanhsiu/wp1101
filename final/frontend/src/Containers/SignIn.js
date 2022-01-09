import { Button, Input, Space } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import Title from "../Components/Title";
import SignInBox from "../Components/SignInBox";
import { useState, React } from "react";

const SignIn = ({
  me,
  setMe,
  username,
  setUserName,
  password,
  setPassword,
  setSignedIn,
  displayStatus,
  setRegistered,
  navigate,
}) => (
  <>
    <Title>
      <h1>NTU Tutor</h1>
    </Title>
      <Space direction="vertical">
        <Input
          prefix={<UserOutlined />}
          value={me}
          enterButton="Sign In"
          onChange={(e) => setMe(e.target.value)}
          placeholder="Username"
          size="large"
        />
      {/* </Space>
      <Space direction="vertical"> */}
        <Input.Password
          prefix={<LockOutlined />}
          value={password}
          placeholder="Password"
          size="large"
          onChange={(e) => setPassword(e.target.value)}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </Space>
    <SignInBox>

    <Space>
      <Button
        onClick={() => {
          if (!me)
            displayStatus({
              type: "error",
              msg: "Missing Username",
            });
          else if (!password) {
            displayStatus({
              type: "error",
              msg: "Missing Password",
            });
          } else {
            setSignedIn(true);
            navigate("/body");
          }
        }}
      >
        Sign In
      </Button>
    </Space>
    <Space>
      <Button>Register</Button>
    </Space>
    </SignInBox>

  </>
);
export default SignIn;

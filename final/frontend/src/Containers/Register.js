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

const Register = (props) => {
  const [newUserName, setNewUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [registered, setRegistered] = useState(false);
  const [back, setBack] = useState(false);
  return (
    <>
      <Title>
        <h1>NTU Tutor</h1>
      </Title>
      <Space direction="vertical">
        <Input
          prefix={<UserOutlined />}
          value={newUserName}
          enterButton="Sign In"
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="Username"
          size="large"
        />
        {/* </Space>
      <Space direction="vertical"> */}
        <Input.Password
          prefix={<LockOutlined />}
          value={newPassword}
          placeholder="Password"
          size="large"
          onChange={(e) => setNewPassword(e.target.value)}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </Space>
      <SignInBox>
      <Space>
        <Button
        //這邊要註冊然後檢查有沒有重複
          onClick={() => {
              props.navigate("/");
          }}
        >
          Register
        </Button>
      </Space>
      <Space>
        <Button
          onClick={() => {
            props.navigate("/");
        }}
        >
          Back
        </Button>
      </Space>
    </SignInBox>
    </>
  );
};

export default Register;

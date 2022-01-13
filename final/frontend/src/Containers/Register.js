import { Button, Input, Space } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import Title from "../Components/Title";
import SignInBox from "../Components/SignInBox";
import { useState, React } from "react";
import userAPI from "../utils/userAPI";

const Register = (props) => {
  const [newUserName, setNewUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newUserID, setNewUserID] = useState("");
  const [registered, setRegistered] = useState(false);
  const [back, setBack] = useState(false);
  return (
    <>
      <Title>
        <h1 onClick={() => {
          props.navigate("/");
        }}>NTU Tutor</h1>
      </Title>
      <Space direction="vertical" class="bodrer">
        <Input
          prefix={<UserOutlined />}
          value={newUserID}
          enterButton="Sign In"
          onChange={(e) => setNewUserID(e.target.value)}
          placeholder="UserID"
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
        <Input
          prefix={<GlobalOutlined/>}
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="Your Real Name"
          size="large"
        />
      </Space>
      <SignInBox>
        <Space>
          <Button
            //這邊要註冊然後檢查有沒有重複
            onClick={() => {
              userAPI.postUser({
                userID: newUserID,
                password: newPassword,
                userName: newUserName,
              });
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

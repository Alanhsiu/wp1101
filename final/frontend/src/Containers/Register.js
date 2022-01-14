import { Button, Input, Space } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
  GlobalOutlined,
  CarOutlined
} from "@ant-design/icons";
import Title from "../Components/Title";
import SignInBox from "../Components/SignInBox";
import { useState, React } from "react";
import userAPI from "../utils/userAPI";
import Border from "../Components/Border";
import PrimaryPinkButton from "../Components/primary-pink-button";
import OutlineGrayButton from "../Components/outline-gray-button";

const Register = ({me,navigate}) => {
  const [newUserName, setNewUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newUserID, setNewUserID] = useState("");
  const [studentID, setStudentID] = useState("");
  const [registered, setRegistered] = useState(false);
  const [back, setBack] = useState(false);
  return (
    <>
      <Title>
        <h1
          onClick={() => {
            navigate("/");
          }}
        >
          NTU Tutor
        </h1>
      </Title>
      <Space direction="vertical" class="bodrer">
        <Border>
          <Input
            prefix={<UserOutlined />}
            value={newUserID}
            enterButton="Sign In"
            onChange={(e) => setNewUserID(e.target.value)}
            placeholder="UserID"
            size="large"
          />
        </Border>
        <Border>
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
        </Border>
        <Border>
          <Input
            prefix={<GlobalOutlined />}
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="Real Name"
            size="large"
          />
        </Border>
        <Border>
          <Input
            prefix={<CarOutlined />}
            value={studentID}
            onChange={(e) => setStudentID(e.target.value)}
            placeholder="Student ID"
            size="large"
          />
        </Border>
      </Space>
      <SignInBox>
        <Space>
          <div
            onClick={() => {
              userAPI.postUser({
                userID: newUserID,
                password: newPassword,
                userName: newUserName,
              });
              navigate("/");
            }}
          >
            <PrimaryPinkButton button="Register" />
          </div>
        </Space>
        <Space>
          <div
            onClick={() => {
              navigate("/");
            }}
          >
            <OutlineGrayButton button="Back" />
          </div>
        </Space>
      </SignInBox>
    </>
  );
};

export default Register;

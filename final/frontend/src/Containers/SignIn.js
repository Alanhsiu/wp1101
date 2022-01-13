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
import PrimaryPinkButton from "../Components/primary-pink-button";
import OutlineGrayButton from "../Components/outline-gray-button";
import projectStyles from "../style.module.css";
import styles from "./home.module.css";
import Border from "../Components/Border";


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
      <h1
        onClick={() => {
          navigate("/");
        }}
      >
        NTU Tutor
      </h1>
    </Title>
    <SignInBox>
      <Space direction="vertical" class="bodrer">
        <Border>
        <Input
          prefix={<UserOutlined />}
          value={me}
          onChange={(e) => setMe(e.target.value)}
          placeholder="Username"
          size="large"
          font-weight="bold"
          outline="none"
        />
        </Border>
        <Border>
        <Input.Password
          prefix={<LockOutlined />}
          value={password}
          placeholder="Password"
          size="large"
          onChange={(e) => setPassword(e.target.value)}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          font-weight="bold"
        />
        </Border>
      </Space>
      <Space>
        <div
          className={styles["container03"]}
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
          <PrimaryPinkButton button="Sign In" />
        </div>
      </Space>
      <Space>
        <div
          className={styles["container03"]}
          onClick={() => {
            setRegistered(true);
            navigate("/register");
          }}
        >
          <OutlineGrayButton button="Register" />
        </div>
      </Space>
    </SignInBox>
  </>
);
export default SignIn;

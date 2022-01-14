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

import sessionAPI from "../utils/sessionAPI"

const SignIn = ({
  me,
  setMe,
  id,
  setId,
  displayStatus,
  navigate,
}) => {
  const [password, setPassword] = useState("");
  const [userID, setUserID] = useState("");
  return(
  <div className="signin">
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
              console.log("go")
              const {tuserId ,userName } = sessionAPI.postSession({userID, password})          
              setId("tuserId");
              setMe("userName");
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
            navigate("/register");
          }}
        >
          <OutlineGrayButton button="Register" />
        </div>
      </Space>
    </SignInBox>
  </div>
);
}
export default SignIn;

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
import sessionAPI from "../utils/sessionAPI";

const SignIn = ({ me, setMe, displayStatus, navigate }) => {
  const [password, setPassword] = useState("");
  const [userID, setUserID] = useState("");
  return (
    <>
      <Title>
        <h1>NTU Tutor</h1>
      </Title>
      <Space direction="vertical">
        <Input
          prefix={<UserOutlined />}
          value={userID}
          enterButton="Sign In"
          onChange={(e) => setUserID(e.target.value)}
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
            onClick={async () => {
              if (!userID)
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
                console.log("go");
                const data = await sessionAPI.postSession({ userID, password });
                setMe(data.userName);
                navigate("/body");
              }
            }}
          >
            Sign In
          </Button>
        </Space>
        <Space>
          <Button
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </Button>
        </Space>
      </SignInBox>
    </>
  );
};
export default SignIn;
>>>>>>> login and register

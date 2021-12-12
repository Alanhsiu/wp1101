import { Button, Input, Space } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import Title from "../Components/Title";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 30px;
  align-items: center;
  justify-content: center;
`;

const SignIn = ({ me, setMe, setSignedIn, displayStatus, setRegistered}) => (
  <>
    <Title>
      <h1>NTU Tutor</h1>
    </Title>
    <Wrapper>
      <Input
        prefix={<UserOutlined />}
        value={me}
        enterButton="Sign In"
        onChange={(e) => setMe(e.target.value)}
        placeholder="Enter your name"
        size="large"
        style={{ width: 300, margin: 50 }}
      />
      <Space direction="vertical">
        <Input.Password
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
          else setSignedIn(true);
        }}
      >
        Sign In
      </Button>
      <Button>
        Register
      </Button>
    </Wrapper>
  </>
);
export default SignIn;

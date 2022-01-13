import React from "react";
import Logo from "./logo.svg";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { Mail } from "@material-ui/icons";
// import AccountCircle from '@mui/icons-material/AccountCircle';

function Appbar(props) {
  return (
    <AppBar position="fixed" color="inherit">
      <Toolbar className="toolbar">
        <div className="appbar-left">
          <img className="logo" src={Logo} alt="Logo" />
          <span className="app-name" onClick={() => props.navigate("/")}>
            NTU TUTOR WEB
          </span>
        </div>
        <div className="appbar-left">
            <Mail
              onClick={() => props.navigate("/chatroom")}
              style={{
                fontWeight: "Bold",
                fontSize: 30,
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
                paddingRight:"5px"
              }}
            />
            <Button color="inherit" onClick={() => props.navigate("/publish")}>
              Case Publish
            </Button>

            <Button
              color="inherit"
              onClick={() => props.navigate("/resumeDisplay")}
            >
              Profile
            </Button>
            <Button color="inherit" onClick={() => props.navigate("/")}>
              Log out
            </Button>
        </div>

        {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <AccountCircle />
          </IconButton> */}
      </Toolbar>
    </AppBar>
  );
}
// function Appbar(props) {
//   return (
//     <AppBar position="fixed" color="inherit">
//       <Title >
//           <span onClick={() => props.navigate('/body')}>
//           NTU Tutor Web
//           </span>
//     </Title>
//     </AppBar>
//   )
// }

export default Appbar;

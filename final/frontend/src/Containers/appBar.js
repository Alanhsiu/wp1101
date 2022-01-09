import React from "react";
import Logo from "./logo.svg";
import { AppBar, Toolbar, Button } from "@material-ui/core";
// import AccountCircle from '@mui/icons-material/AccountCircle';

function Appbar(props) {
  return (
    <AppBar position="fixed" color="inherit">
      <Toolbar className="toolbar">
        <div className="appbar-left">
          <img className="logo" src={Logo} alt="Logo" />
          <span className="app-name" onClick={() => props.navigate("/body")}>
            NTU TUTOR WEB
          </span>
        </div>
        <div className="appbar-left">
          <span>
            <Button color="inherit" onClick={() => props.navigate("/profile")}>Profile</Button>
            <Button color="inherit" onClick={() => props.navigate("/")}>Log out</Button>
          </span>
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

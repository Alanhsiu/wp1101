import React from "react";
import Logo from "./logo.svg";
import { AppBar, Toolbar } from "@material-ui/core";

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

import React, { Component } from "react";
import { DrawerNavigator } from "react-navigation";

import About from "../about/index.js";
import ToDoList from "../toDoList/index.js";
import Sidebar from "./Sidebar.js";

const Navigator = DrawerNavigator(
  {
    ToDoList: { screen: ToDoList },
    About: { screen: About }
  },
  {
    contentComponent: props => <Sidebar {...props} />
  }
);
export default Navigator;
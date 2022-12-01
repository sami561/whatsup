import React from "react";
import "./sidebar.css";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import { IconButton, Avatar } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import SidebarChat from "./SidebarChat";
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src="https://i.imgur.com/bpfP5SH.jpg" />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchIcon />
          <input placeholder="search or start new chat " type="text" />
        </div>
      </div>
      <div className="sidebar_chats">
<SidebarChat />
<SidebarChat />
<SidebarChat />
      </div>
    </div>
  );
}

export default Sidebar;

// SocketContext.js
import React, { createContext, useContext } from "react";
import { io } from "socket.io-client";
import { webSocketUrl } from "./requestUrl";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = io(webSocketUrl); // 创建 socket 实例
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

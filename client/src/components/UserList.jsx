import React, { useState, useEffect } from "react";

const UserList = ({ socket }) => {
  const [connectedUsers, setConnectedUsers] = useState([]);

  useEffect(() => {
    socket.on("userList", (users) => {
      setConnectedUsers(users);
    });

    socket.on("disconnected", (connectedUsers) => {
      setConnectedUsers(connectedUsers);
    });
  }, [socket]);

  return (
    <div className="bg-green-900 white p-1 overflow-y-auto">
      <ul className="text-xl text-white space-y-3 p-5">
        {connectedUsers.map((user, index) => (
          <li
            key={index}
            className="flex flex-row justify-between border-b border-white pb-2"
          >
            <p className="flex flex-row items-center">
              <span className="rounded-full w-3 h-3 mr-3 bg-green-300"></span>
              {user.id}
            </p>
            <p>5km</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

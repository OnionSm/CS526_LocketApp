import React, { useState, createContext, ReactNode } from "react";
import { FriendData } from "../types/FriendData";
import { UserConversation } from "../types/UserConversation";
import { Conversation } from "../types/Conversation";


const UserDataContext = createContext<any>(null);

interface UserDataProviderProps 
{
  children: ReactNode; 
}

function UserDataProvider({ children }: UserDataProviderProps) 
{
    const [user_avt, set_user_avt] = useState("");
    const [first_name, set_first_name] = useState("");
    const [last_name, set_last_name] = useState("");
    const [user_id, set_user_id] = useState("");

  const value = 
  {
    user_avt,
    first_name,
    last_name,
    user_id,
    set_user_avt,
    set_first_name,
    set_last_name,
    set_user_id
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}

export { UserDataContext, UserDataProvider };

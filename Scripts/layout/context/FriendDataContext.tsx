import React, { useState, createContext, ReactNode } from "react";
import { FriendData } from "../types/FriendData";
import { UserConversation } from "../types/UserConversation";



const FriendDataContext = createContext<any>(null);

interface FriendDataProviderProps 
{
  children: ReactNode; 
}

function FriendDataProvider({ children }: FriendDataProviderProps) {
  const [data_friend, set_data_friend] = useState<Array<FriendData>>([]);

  const value = 
  {
    data_friend,
    set_data_friend,
  };

  return (
    <FriendDataContext.Provider value={value}>
      {children}
    </FriendDataContext.Provider>
  );
}

export { FriendDataContext, FriendDataProvider };

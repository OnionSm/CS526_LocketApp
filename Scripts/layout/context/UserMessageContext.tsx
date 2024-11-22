import React, { useState, createContext, ReactNode } from "react";


type UserMessageContextType = {
  friend: string | null; 
  ChooseFriendMessage: (id: string, friend_name : string) => void; 
  friend_name : string | null;
};

const UserMessageContext = createContext<UserMessageContextType | null>(null);

interface UserMessageProviderProps 
{
  children: ReactNode; 
}

function UserMessageProvider({ children }: UserMessageProviderProps) {
  const [friend, setFriend] = useState<string | null>(null);
  const [friend_name , setFriendName] = useState<string|null>(null);

  const ChooseFriendMessage = (id: string, friend_name : string) => {
    console.log(id);
    setFriend(id);
    setFriendName(friend_name);
  };

  const value = {
    friend,
    ChooseFriendMessage,
    friend_name
  };

  return (
    <UserMessageContext.Provider value={value}>
      {children}
    </UserMessageContext.Provider>
  );
}

export { UserMessageContext, UserMessageProvider };

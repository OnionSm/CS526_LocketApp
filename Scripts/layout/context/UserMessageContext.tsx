import React, { useState, createContext, ReactNode } from "react";
import { FriendData } from "../types/FriendData";
import { UserConversation } from "../types/UserConversation";
import { Conversation } from "../types/Conversation";

// type UserMessageContextType = {
//   friend: string | null; 
//   ChooseFriendMessage: (id: string, friend_name : string) => void; 
//   friend_name : string | null;
//   setFriend: (
// };

const UserMessageContext = createContext<any>(null);

interface UserMessageProviderProps 
{
  children: ReactNode; 
}

function UserMessageProvider({ children }: UserMessageProviderProps) 
{
  const [conversation_choosen, set_conversation_choosen] = useState<Conversation|null>(null);
  const [data_friend, set_data_friend] = useState<Array<FriendData>>([]);
  const [user_conversations, set_user_conversations] = useState<UserConversation>();
  const [all_user_message, set_all_user_message] = useState<UserConversation>();

  const value = 
  {
    conversation_choosen,
    set_conversation_choosen,
    data_friend,
    set_data_friend,
    user_conversations,
    set_user_conversations,
    all_user_message,
    set_all_user_message
  };

  return (
    <UserMessageContext.Provider value={value}>
      {children}
    </UserMessageContext.Provider>
  );
}

export { UserMessageContext, UserMessageProvider };

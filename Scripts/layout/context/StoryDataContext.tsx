import React, { useState, createContext, ReactNode } from "react";
import { FriendData } from "../types/FriendData";
import { UserConversation } from "../types/UserConversation";
import { Conversation } from "../types/Conversation";
import { Story } from "../types/Story";

const StoryDataContext = createContext<any>(null);

interface StoryDataProviderProps 
{
  children: ReactNode; 
}

function StoryDataProvider({ children }: StoryDataProviderProps) 
{
    const [list_story, set_list_story] = useState<Array<Story>>([]);

  const value = 
  {
    list_story,
    set_list_story
  };

  return (
    <StoryDataContext.Provider value={value}>
      {children}
    </StoryDataContext.Provider>
  );
}

export { StoryDataContext, StoryDataProvider };

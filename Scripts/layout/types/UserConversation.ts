import { Conversation } from "./Conversation";

export type UserConversation = {
    id: string;
    userConversations: Array<Conversation>;
    userId: string;
};
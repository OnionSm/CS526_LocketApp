import { Message } from "./Message";

export type ConversationRespone = {
    createdAt: Date;
    updatedAt: Date;
    id: string;
    groupName: string,
    groupAvatarUrl: string,
    participants: Array<string>;
    lastMessage: Message | null;
    listMessages: Array<Message>;
};
import { Message } from "./Message";

export type Conversation = {
    createdAt: Date;
    updatedAt: Date;
    id: string;
    participants: Array<string>;
    lastMessage: Message | null;
    listMessages: Array<Message>;
};
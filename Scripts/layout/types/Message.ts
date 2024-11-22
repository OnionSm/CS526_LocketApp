export type Message = {
    content: string;
    conversationId: string;
    id: string;
    replyToStoryId: string | null;
    sendAt: Date;
    senderId: string;
    status: string | null;
};
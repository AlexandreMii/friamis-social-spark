
import { useState } from 'react';
import MessagesList from './MessagesList';
import ChatView from './ChatView';

const MessagesModule = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  if (selectedChat) {
    return <ChatView chatId={selectedChat} onBack={() => setSelectedChat(null)} />;
  }

  return <MessagesList onSelectChat={setSelectedChat} />;
};

export default MessagesModule;

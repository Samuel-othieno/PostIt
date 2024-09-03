import { useState } from "react";
import "@mantine/core/styles.css";
import { Avatar, MantineProvider } from "@mantine/core";
import Register from "./Components/Register";
import Group from "./Components/Group";
import InputField from "./Components/Messages/InputField";
import TypingIndicator from "./Components/Messages/TypingIndicator";
import MessagesList from "./Components/Messages/Group message List";
// import Register from "./Components/Register";

function App() {
  const [messages, setMessages] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (message) => {
    const newMessage = {
      text: message,
      sent: true,
      Avatar: Avatar.png,
      timestamp: new Date().toLocaleTimeString,
    };
    setMessages([...message, newMessage])
  }


  return (

  <MantineProvider withGlobalStyles withNormalizeCSS>
    {
      <>
        <div>
          <Register />
          <Group />
        </div>
        <div className="app-container max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <MessagesList messages={messages} />
          <TypingIndicator isTyping={isTyping} />
          <InputField onSend={handleSend} />
        </div>
      </>
    }
  </MantineProvider>
  );
}

export default App;

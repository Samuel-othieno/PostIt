import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NullifyActiveChat, removeChat } from "../Services/Actions/Chat/action";

export default function HomeChat() {
  const state = useSelector((state) => state.chat.AllChats);
  const dispatch = useDispatch();
  const [chatModel, setChatModel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const chatfn = (chatid)=>{
        console.log("Remove the ChatBar from the ID", chatid)
        dispatch(removeChat(chatid));
        dispatch(NullifyActiveChat());
    }

    
  })

  return <div></div>;
}

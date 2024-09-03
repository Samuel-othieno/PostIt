import { useState } from "react";
import { Button, TextInput } from "@mantine/core";


const InputField = ({onSend})=>{
    const [message, setMessage] = useState('');

    const handleSend = ()=>{
        if (message.trim()){
            onSend(message.trim);
            setMessage('');
        }
    };

    return (
        <div className="input-field flex items-center p-4 border-t">
            <TextInput value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Type a message" className="flex-grow mr-2"/>
                <Button onClick={handleSend}>Send</Button>
        </div>
    )
}
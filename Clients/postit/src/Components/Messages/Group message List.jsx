/* eslint-disable react/prop-types */
import { Avatar } from '@mantine/core';
import propTypes from 'prop-types';



const MessagesList = ({messages}) =>{
    return (
        <div className="message-list">
            {messages.map((message, index)=>(
                <div key={index} className={`message &{message.sent ? 'Sent' : 'Received'} flex items-center mb-4`}>
                    c
                    <div className="message-content bg-gray-200 p-2 rounded-lg">
                        <p>
                            {message.text}
                        </p>
                        <span className='timestamp text-xs text-gray-500'>
                            {message.timestamp}
                        </span>
                    </div>
                    {message.sent && <Avatar src={message.Avatar} radius="xl" size="md" className="ml-2"/>}
                </div>
            ))}
        </div>
    );
};

MessagesList.propTypes={
    message: propTypes.arrayOf(
        propTypes.shape({
            text: propTypes.string.isRequired,
            sent: propTypes.bool.isRequired,
            Avatar: propTypes.string.isRequired,
            timestamp: propTypes.string.isRequired
        })
    ).isRequired,
};

export default MessagesList;
import { Avatar } from '@mantine/core';
import PropTypes from 'prop-types';



const MessagesList = ({ messages }) => {
    return (
        <div className="message-list p-4 h-screen bg-gray-200 overflow-auto">
            {messages.map((message, index) => (
                <div key={index} className={`message ${message.sent ? 'sent' : 'received'} flex items-center mb-4`}>
                    {!message.sent && <Avatar src={message.avatar} radius="xl" size="md" className="mr-2 bg-" />}
                    <div className="message-content bg-gray-200 p-2 rounded-lg">
                        <p>{message.text}</p>
                        <span className="timestamp text-xs text-gray-500">{message.timestamp}</span>
                    </div>
                    {message.sent && <Avatar src={message.avatar} radius="xl" size="md" className="ml-2" />}
                </div>
            ))}
        </div>
    );
};

MessagesList.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            sent: PropTypes.bool.isRequired,
            Avatar: PropTypes.string.isRequired,
            timestamp: PropTypes.string.isRequired
        })
    ).isRequired,
};

export default MessagesList;
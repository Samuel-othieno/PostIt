import PropTypes from 'prop-types';


const TypingIndicator = ({isTyping}) => {
    return (
        isTyping && <div className="typing-indicator p-2 text-gray-500">User is typing...</div>
    );
};

TypingIndicator.propTypes ={
    isTyping: PropTypes.node,
}

export default TypingIndicator;
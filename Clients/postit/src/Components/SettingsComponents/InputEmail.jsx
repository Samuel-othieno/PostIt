import { TextField } from "@mui/material";
import PropTypes from 'prop-types';

export default function InputEmail({ email, setEmail }) {
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <TextField
        id="outlined-read-only-input"
        label="Email"
        onChange={emailHandler}
        value={email}
        style={{ width: "40%" }}
      />
    </div>
  );
}

InputEmail.propTypes = {
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
}
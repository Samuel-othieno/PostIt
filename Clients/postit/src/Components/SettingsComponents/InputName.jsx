import { TextField } from "@mui/material";
import PropTypes from "prop-types";

export default function InputName({ name, setName }) {
  const nameHandler = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <TextField
        value={name}
        onChange={nameHandler}
        id="outlined-read-only-input"
        label="Name"
        style={{ width: "40%" }}
      />
    </div>
  );
}

InputName.propTypes = {
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
};

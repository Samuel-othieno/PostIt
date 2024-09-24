import { SearchOutlined } from "@mui/icons-material";
import PropTypes from "prop-types";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

export default function SearchBar({ onChange, SearchHandler }) {
  return (
    <div className=" h-[10%] w-[100%] flex box-border justify-center py-2 relative">
      <SearchOutlined className="absolute l-[0%]"></SearchOutlined>
      <input
        className="w-[60%] font-Roboto text-lg border-2 p-2 rounded-md focus:border-[#4BB8FE] focus:outline-none"
        type="text"
      ></input>
      <FormControl sx={{ m: 1, width: "60%" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>
        <OutlinedInput
          onChange={onChange}
          id="outlined-adornment-password"
          type="text"
          spellCheck={false}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={SearchHandler}>
                <SearchOutlined></SearchOutlined>
              </IconButton>
            </InputAdornment>
          }
          label="Search"
        />
      </FormControl>
    </div>
  );
}
SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  SearchHandler: PropTypes.func.isRequired,
};

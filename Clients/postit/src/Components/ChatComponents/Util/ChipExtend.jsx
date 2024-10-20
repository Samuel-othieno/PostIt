import { Chip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PropTypes from "prop-types";

export default function ChipExtend({ value, remove }) {
  // const color=randomColor({luminosity:"dark"});
  const handleDelete = () => {
    remove(value._id);
  };

  return (
    <Chip
      color="primary"
      style={{
        color: "black",
        fontSize: "14px",
        fontWeight: "bold",
        marginLeft: "5px",
        marginTop: "5px",
      }}
      avatar={
        <Avatar
          referrerPolicy="no-referrer"
          alt="Natacha"
          src={
            value.pic.startsWith("user")
              ? `${URL}/${value.pic}` ///// Add Endpoit
              : `${value.pic}`
          }
        />
      }
      onDelete={handleDelete}
      label={value.name.split(" ")[0]}
      variant="outlined"
    />
  );
}

ChipExtend.propTypes = {
    value:PropTypes.node.isRequired,
    remove: PropTypes.func.isRequired

}
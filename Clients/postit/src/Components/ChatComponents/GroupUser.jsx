import ChipExtend from "./Util/ChipExtend";
import PropTypes from "prop-types";

export default function GroupUserList({ users, remove }) {
  return (
    <div className="self-start flex flex-row mt-4 flex-wrap">
      {users.map((data, index) => (
        <ChipExtend remove={remove} value={data} key={index}></ChipExtend>
      ))}
    </div>
  );
}

GroupUserList.propTypes = {
  users: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
};
import { Avatar } from "@mui/material";
import PropTypes from "prop-types";
import { MotionAnimate } from "react-motion-animate";

export default function User({ values, add }) {

  const clickHandler = () => {
    add(values);
  };
  

  return (
    <div>
      <MotionAnimate>
        <div
          onClick={clickHandler}
          className="flex flex-row box-border cursor-pointer items-center mt-2  hover:bg-gray-100 py-1 px-1"
        >
          <Avatar
            referrerPolicy="no-referrer"
            alt="User-pic"
            sx={{ width: 48, height: 48 }}
            src={
              values.pic.startsWith("user")
                ? `${URL}/${values.pic}`
                : `${values.pic}`
            }
          />
          {/* Add Endpoint for Picture*/}

          <div className="flex flex-col ml-2">
            <div className="font-bold font-Roboto text-sm">{values.name}</div>
            <div className="text-xs  text-[#979797]">{values.email}</div>
          </div>
        </div>
      </MotionAnimate>
    </div>
  );
}

//PropTypes Configuartion.
User.propTypes = {
  values: PropTypes.node,
  add: PropTypes.node,
};

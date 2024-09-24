import { Avatar } from "@mui/material";
import { MotionAnimate } from "react-motion-animate";
// import image from "../../assets/images/user-img.jpg";
import PropTypes from "prop-types";

export default function User({ values, accessChat }) {
  const accessChatHandler = () => {
    accessChat(values);
  };

  return (
    <MotionAnimate reset={true}>
      <div
        onClick={accessChatHandler}
        className="flex flex-row box-border cursor-pointer items-center mt-2 hover:bg-gray-100 py-1 px-1"
      >
        <Avatar
          referrerPolicy="no-referrer"
          alt="User-pic"
          sx={{ width: 48, height: 48 }}
          src={
            values.pic.startsWith("user")
              // eslint-disable-next-line no-undef
              ? `${process.env.REACT_APP_API_URL}/${values.pic}`
              : `${values.pic}`
          }
        />
        <div className="flex flex-col ml-2">
          <div className="font-bold font-Roboto text-sm">{values.name}</div>
          <div className="text-xs  text-[#979797]">{values.email}</div>
        </div>
      </div>
    </MotionAnimate>
  );
}

User.propTypes ={
  values: PropTypes.string.isRequired,
  accessChat: PropTypes.string.isRequired,
}

import { Avatar } from "@mui/material";
import PropTypes from "prop-types";
import { MotionAnimate } from "react-motion-animate";

export default function User({ values, accessChat }) {
  const accessChatHandler = () => {
    accessChat(values);
  };

  return (
    <div>
      <MotionAnimate reset={true}>
        <div
          onClick={accessChatHandler}
          className="flex flex-row box-border cursor-pointer items-center mt-2 hover:bg-gray-100 py-1 px-1"
        >
          <Avatar
            referrerPolicy="no-referrer"
            alt="User-pic"
            sx={{ width: 48, height: 48 }}
            src={values.pic.startsWith()}
          />
        </div>
      </MotionAnimate>
    </div>
  );
}

User.PropTypes = {
  values: PropTypes.node,
  accessChat: PropTypes.node,
};

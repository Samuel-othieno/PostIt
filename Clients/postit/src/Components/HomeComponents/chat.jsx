import { MotionAnimate } from 'react-motion-animate';
import PropTypes from 'prop-types';

export default function Chat({message,isMale}) {

  return (
    <MotionAnimate animation="fadeInUp">
       {isMale&&<div className='bg-[#FFAF3A] max-[1500px]:text-sm max-[528px]:text-xs rounded-t-[20px] rounded-br-[20px] px-[5%] py-[4%] my-[5%] text-black font-Roboto font-bold'>{message}</div>}
       {!isMale&&<div className='bg-[#FFFFFF] max-[1500px]:text-sm max-[528px]:text-xs rounded-t-[20px] rounded-bl-[20px] px-[5%] py-[4%] my-[5%] text-black font-Roboto font-bold'>{message}</div>}
    </MotionAnimate>
  )
}

Chat.propTypes = {
    message: PropTypes.string.isRequired,
    isMale: PropTypes.string.isRequired,
}

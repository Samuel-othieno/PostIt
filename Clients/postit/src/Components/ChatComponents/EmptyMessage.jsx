import img from "../../assets/images/empty.png"; // Add Empty Image from Gallery

export default function EmptyMessages() {
  return (
    <div className="flex flex-col justify-center h-[100%] items-center">
      <img className="w-[15%]" src={img}></img>
      <div className="text-[#AEC0D8]">Nothing Here</div>
      <div className="flex gap-2">
        <div className="text-[#AEC0D8] text-sm">No active chats </div>
        <div className="text-[#6FB9FF] text-sm font-bold">
          Start a New Chat{" "}
        </div>
      </div>
    </div>
  );
}

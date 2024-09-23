import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Services/Actions/User/actions";
import { Avatar } from "@mui/material";

export default function Profile() {
  const dispatch = useDispatch();
  const dataRedux = useSelector((state) => state.user.userInfo);

  const data = JSON.parse(localStorage.getItem("info"));
  const [pic, setPic] = useState(data.pic);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (dataRedux === null) return;
    setPic(dataRedux.pic);
  }, [dataRedux]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const isConfirmed = window.confirm(
        "Are you sure you want to upload this image?"
      );

      if (!isConfirmed) return;

      const formData = new FormData();
      formData.append("photo", selectedFile);

      const cookie = localStorage.getItem("jwt");

      fetch(`/api/v1/users/uploadPhoto`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Image uploaded successfully!");
          dispatch(setUser(data.data.user));
        })
        .catch((error) => {
          console.error("Error uploading images:", error);
        });
    } else {
      alert("Please select an image upload");
    }
  };

  let image = pic;

  if (pic.startswith("user")) image = "/api"; //  Add from Endpoint

  return (
    <div className="flex flex-row items-center gap-10 mt-[2%]">
      <Avatar
        referrerPolicy="no-referrer"
        alt="User-pic"
        sx={{ width: 150, height: 150 }}
        src={image}
      />

      <div className="flex justify-center flex-col gap-5">
        <label className="bg-[#202142] hover:bg-[#202162] text-white cursor-pointer px-4 py-2 max-[1024px]:px-2 max-[1024px]:py-1 max-[1024px]:text-sm rounded-md font-Roboto tracking-tight">
          Select Picture
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleFileChange}
        />
        <div
          onClick={handleUpload}
          className="font-medium border-[1px] cursor-pointer border-[#000000] px-4 py-2 rounded-md font-Roboto tracking-tight max-[1024px]:px-2 max-[1024px]:py-1 max-[1024px]:text-sm"
        >
          Upload Picture
        </div>
      </div>
    </div>
  );
}

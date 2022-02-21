import React, { useState } from "react";
import Image from "next/image";
import ProfileMenu from "./profile-menu";

interface IUserProfileProps {
  userImg: string;
  userName: string;
}

const UserProfile: React.FC<IUserProfileProps> = ({ userImg, userName }) => {
  const [isShowMenu, setIsShowMenu] = useState(false);

  function showMenu() {
    setIsShowMenu(true);
  }

  function hideMenu() {
    setIsShowMenu(false);
  }

  return (
    <div
      className="relative"
      onMouseEnter={showMenu}
      onClick={showMenu}
      onMouseLeave={hideMenu}
    >
      {isShowMenu && (
        <div className={`absolute top-full -right-2`}>
          <ProfileMenu />
        </div>
      )}
      <div className={`relative w-12 h-12`}>
        <Image
          className="rounded-full"
          src={userImg}
          layout="fill"
          alt={`${userName}-profile`}
        />
      </div>
    </div>
  );
};
export default UserProfile;

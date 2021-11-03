import MenuIcon from "@assets/icons/menu-icon";
import React, { useState } from "react";
import Button from "./storybook/button";

const Category = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <Button
        className="border flex-center rounded-md !h-9 px-2"
        variant="custom"
      >
        <MenuIcon className="hover:text-light" />
      </Button>
    </div>
  );
};

export default Category;

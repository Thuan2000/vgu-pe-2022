import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import Typography from "@components/ui/storybook/typography";

interface TeamMemberProps {
  name: string;
  position: string;
  imgUrl: string;
  description: string;
}

const TeamMember: React.FC<TeamMemberProps> = (props) => {
  const { name, position, imgUrl, description } = props;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`relative`}>
      <div
        className={`rounded-sm overflow-hidden relative w-[250px] h-[300px]`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image objectFit="cover" src={imgUrl} alt="image" layout="fill" />

        {isHovered && (
          <motion.div
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className={`absolute top-0 bg-white bg-opacity-80 p-5 w-full h-full opacity-0`}
          >
            <Typography
              className={`border-b-2 pb-2 mb-3 border-primary`}
              text={name}
              weight="bold"
              align="center"
              color="dark-blue"
              size="xl"
            />

            <Typography
              color="gray-400"
              weight="bold"
              align="center"
              className={`opacity-90`}
              size="lg"
              text={position}
            />
            <Typography
              size="md"
              color="gray-400"
              align="center"
              text={description}
            />
          </motion.div>
        )}
      </div>

      <Typography
        color="dark-blue"
        className={`my-1`}
        size="md"
        weight="bold"
        text={name}
      />
      <Typography color="dark-blue" text={position} />
    </div>
  );
};
export default TeamMember;

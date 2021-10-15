import React from "react";

interface IProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {}

const ProjectCard: React.FC<IProjectCardProps> = ({ className, ...props }) => {
  return (
    <div className="flex items-center border rounded-md relative">
      <img src="/favicon.ico" width={165} height={170} />
    </div>
  );
};
export default ProjectCard;

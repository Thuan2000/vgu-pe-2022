import { useRouter } from "next/router";
import React from "react";

interface IFPPositionProps {}

const FPPosition: React.FC<IFPPositionProps> = ({}) => {
  const { query } = useRouter();
  const step = parseInt((query.step as string) || "1");

  return (
    <div className={`fic space-x-4 justify-center !mt-10`}>
      <FPPositionItem isActive={step === 1} />
      <FPPositionItem isActive={step === 2} />
      <FPPositionItem isActive={step === 3} />
    </div>
  );
};

export default FPPosition;

interface IFPPositionItemProps {
  isActive: boolean;
}

const FPPositionItem: React.FC<IFPPositionItemProps> = ({ isActive }) => {
  return (
    <div
      className={`h-2 rounded-sm transition-all duration-150 ${
        isActive ? "bg-primary w-8" : "bg-gray-100 w-2"
      }`}
    ></div>
  );
};

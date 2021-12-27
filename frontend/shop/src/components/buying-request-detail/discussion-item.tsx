import Typography from "@components/ui/storybook/typography";
import { IUser } from "@graphql/types.graphql";
import { formatDateWithHour } from "@utils/functions";
import React from "react";

interface IDiscussionItemProps {
  user: IUser;
  companyName: string;
  createdAt: string;
  text: string;
}

const DiscussionItem: React.FC<IDiscussionItemProps> = ({
  user,
  companyName,
  createdAt,
  text,
}) => {
  return (
    <div>
      <div className="fic space-x-2">
        <Typography
          text={`${user.firstName} ${user.lastName}`}
          variant="smallTitle"
        />
        <Typography text={companyName} color="gray" />
      </div>
      <Typography text={text} />
      <Typography
        text={formatDateWithHour(createdAt || "")}
        variant="description"
      />
    </div>
  );
};
export default DiscussionItem;

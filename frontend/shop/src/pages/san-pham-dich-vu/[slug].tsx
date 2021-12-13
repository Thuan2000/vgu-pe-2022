import { IService } from "@graphql/types.graphql";
import React from "react";

interface IServiceDetailProps {
  service: IService;
}

const ServiceDetail: React.FC<IServiceDetailProps> = ({ service }) => {
  return <div>Service</div>;
};

export default ServiceDetail;

import React from "react";
import { Components } from ".";
const Modals: React.FC<any> = ({
  component,
  isOpen,
  onClose,
  data,
  updateData,
}) => {
  return component ? (
    React.createElement(Components[component], {
      isOpen,
      onClose,
      data,
      updateData,
    })
  ) : (
    <></>
  );
};

export default Modals;

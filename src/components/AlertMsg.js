import React from "react";

const AlertMsg = (props) => {
  return <div className={`alert alert-${props.type}`}>{props.text}</div>;
};

export default AlertMsg;

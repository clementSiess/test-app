/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./BHstyle.css";

export const Group = ({ property1, className }) => {
  return (
    <div className={`group ${className}`}>
      <div className="text-wrapper">4 minute</div>
    </div>
  );
};

Group.propTypes = {
  property1: PropTypes.oneOf(["variant-2", "default"]),
};

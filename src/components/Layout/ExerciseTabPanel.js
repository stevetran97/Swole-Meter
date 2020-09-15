import React from "react";
import PropTypes from "prop-types";

export default function ExerciseTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel" // accessibility
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`} // accessibility
      aria-labelledby={`full-width-tab-${index}`} // accessibility
      {...other}
    >
      {/* Embed HTML elements here */}
      {children}
    </div>
  );
}

// Used to type check the component.
//  - children: required to be HTML nodes
//  - index: required
//  - value: required
ExerciseTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

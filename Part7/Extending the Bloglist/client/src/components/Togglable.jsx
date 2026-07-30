import { useState, useImperativeHandle } from "react";

const Toggleable = ({ children, buttonLabel = "create new blog", ref }) => {
  // First create a state for it's visibility
  const [visibility, setVisibility] = useState(false);

  // Then variables for when it's hidden or not
  const hideWhenVisible = { display: visibility ? "none" : "" };
  const showWhenVisible = { display: visibility ? "" : "none" };

  // Make a function that changes the value of 'visibility'
  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>

      <div style={showWhenVisible}>
        {children}

        <button type="button" onClick={toggleVisibility}>
          cancel
        </button>
      </div>
    </div>
  );
};

export default Toggleable;

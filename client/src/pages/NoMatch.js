import React from "react";
import Return from "../components/Return";

const NoMatch = () => {
  return (
    <div>
      <Return>
        <h1>404 Page Not Found</h1>
        <h1>
          <span role="img" aria-label="Face With Rolling Eyes Emoji">
            🙄
          </span>
        </h1>
      </Return>
    </div>
  );
};

export default NoMatch;

import React, { memo } from "react";
import "./index.scss";

const Loader = () => (
    <div className="lds-eclipse">
      <div />
    </div>
);

export default memo(Loader);

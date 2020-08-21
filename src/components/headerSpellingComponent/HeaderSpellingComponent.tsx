import "./style.scss";

import React from "react";

interface Props {
  headerSpelling: string;
}

const HeaderSpellingComponent: React.FunctionComponent<Props> = ({
  headerSpelling,
}) => {
  return (
    <div className={"header__spelling__container"}>
      <span>{headerSpelling}</span>
    </div>
  );
};

export default HeaderSpellingComponent;

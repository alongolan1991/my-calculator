import React from "react";
import styled from "styled-components";

const Icon = ({ icon, onClick, command }) => {
  return <StyledIcon onClick={() => onClick(command)} src={icon}></StyledIcon>;
};

const StyledIcon = styled.img`
  width: 32px;
  height: 32px;
  display: inline-block;
  flex: 0.5;
  margin-left: 292px;
`;

export default Icon;

import React from "react";
import styled from "styled-components";

const Icon = ({ icon, onClick }) => {
  return <StyledIcon onClick={onClick} src={icon}></StyledIcon>;
};

const StyledIcon = styled.img`
  width: 32px;
  height: 32px;
  display: inline-block;
`;

export default Icon;

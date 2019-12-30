import React from "react";
import styled, { css } from "styled-components";

const Card = ({ src, isHidden, hideCursor, onClick }) => {
  return (
    <Image
      src={src}
      isHidden={isHidden}
      hideCursor={hideCursor}
      onClick={onClick}
    />
  );
};

const Image = styled.div`
  border: 10px solid white;
  cursor: pointer;
  background-color: white;
  background-image: url(${({ src }) => src});
  min-height: 200px;

  @media screen and (max-width: 500px) {
    grid-template-columns: auto auto;
  }

  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  ${({ isHidden }) =>
    isHidden &&
    css`
      background: black;
      border: 10px solid black;
    `};

  ${({ hideCursor }) =>
    hideCursor &&
    css`
      cursor: default;
    `};
`;

export default Card;

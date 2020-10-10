import styled, { css } from 'styled-components';

const Day = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;

  ${({ isCurrent }) =>
    !isCurrent &&
    css`
      color: #739ec880;
    `}

  ${({ isCurrent }) =>
    isCurrent &&
    css`
      color: #193451;
      cursor: pointer;
    `}

  ${({ hasEvent }) =>
    hasEvent &&
    css`
      height: 40px;
      width: 40px;
      margin: 5px;
      background-color: #fab78b;
      border-radius: 50%;
    `}
`;

export default Day;

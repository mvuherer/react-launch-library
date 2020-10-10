import styled, { css, keyframes } from 'styled-components';

const pulsate = keyframes`
  0% {
    opacity: 0.25;
  }
  50% {
    opacity: 1.0;
  }
  100% {
    opacity: 0.25;
  }
`;

const Header = styled.div`
  font-size: 32px;
  padding-left: 52.5px;
  margin-bottom: 25px;

  ${({ isLoading }) =>
    isLoading &&
    css`
      animation: ${pulsate} 1s ease-out infinite;
    `}
`;

export default Header;

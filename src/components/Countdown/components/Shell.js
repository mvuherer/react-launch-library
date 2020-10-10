import styled from 'styled-components';

import launch from 'src/images/launch.jpg';

const Shell = styled.div`
  background-image: url('${launch}');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 25px 0px 0px 25px;
  padding: 37.5px;
  width: 400px;
  color: #fff;
`;

export default Shell;

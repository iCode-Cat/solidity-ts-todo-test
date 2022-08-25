import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../theme-context';

const Wrapper = styled.div`
  width: 20px;
  height: 20px;
  background: red;
  position: absolute;
  z-index: 999;
  border-radius: 100%;
`;

const Checkmark = () => {
  const Theme = useContext(ThemeContext);

  return <Wrapper theme={Theme} />;
};

export default Checkmark;

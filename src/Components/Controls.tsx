import React, { useContext } from 'react';
import styled from 'styled-components';
import { ControlContext } from '../control-context';
import { mediaQuery } from '../MediaQuery';
import { ThemeContext } from '../theme-context';

const Wrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  gap: 1.9rem;
  margin-top: 1.6rem;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.labelPassive};
  padding: 1.5rem 0rem;
  position: relative;
  z-index: 2;
  font-size: 1.4rem;
  line-height: 14px;
  letter-spacing: -0.19px;
  font-weight: 700;
  border-radius: 6px;
  transition: color 0.3s !important;
  p {
    cursor: pointer;
  }
  @media (min-width: ${mediaQuery.web}) {
    margin-top: 0;
    padding: 0;
    p:hover {
      color: ${(props) => props.theme.labelHover} !important;
    }
  }
`;

const controls = [
  {
    id: 1,
    name: 'All',
  },
  {
    id: 2,
    name: 'Active',
  },
  {
    id: 3,
    name: 'Completed',
  },
];

const Controls = ({ completedExists, className }: any) => {
  const theme = useContext(ThemeContext);
  const [controlStatus, setControlStatus] = useContext(ControlContext);

  return (
    <Wrapper className={className} theme={theme}>
      {controls
        .filter((cf) => {
          if (!completedExists) {
            return cf.name !== 'Completed';
          }
          return cf;
        })
        .map((a) => (
          <p
            style={{
              color:
                controlStatus === a.name
                  ? theme.labelActive
                  : theme.labelPassive,
            }}
            onClick={() => setControlStatus(a.name)}
            key={a.id}
          >
            {a.name}
          </p>
        ))}
    </Wrapper>
  );
};

export default Controls;

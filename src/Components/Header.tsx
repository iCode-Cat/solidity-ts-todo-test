import React, { useContext } from 'react';
import styled from 'styled-components';
import { mediaQuery } from '../MediaQuery';
import { ThemeContext, HandleTheme } from '../theme-context';

interface Props {
  bg: any;
}

const Wrapper = styled.header<Props>`
  width: 100%;
  height: 200px;

  background-image: url(${(props) => props.bg});
  background-size: cover;
  position: absolute;
  z-index: 1;
  padding-top: 7rem;
  .header {
    &_text {
      width: 100%;
      max-width: 108.14px;
    }
    &_icon {
      width: 100%;
      max-width: 26px;
      cursor: pointer;
    }
  }
  @media (min-width: ${mediaQuery.web}) {
    height: 300px;
    .header {
      &_text {
        max-width: 167px !important;
      }
      &_icon {
        width: 26px !important;
        cursor: pointer;
      }
    }
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
  align-items: center;
`;

const Header = () => {
  const theme = useContext(ThemeContext);
  const handleTheme = useContext(HandleTheme);

  return (
    <Wrapper
      className='global-pd'
      bg={
        theme.mode === 'light' ? '/bg-mobile-light.jpg' : '/bg-mobile-dark.jpg'
      }
    >
      <Container className='todo-wrapper'>
        <img className='header_text' src='/text.svg' alt='icon' />
        <img
          onClick={handleTheme}
          className='header_icon'
          src={theme.mode === 'light' ? '/shape.svg' : '/dark-shape.svg'}
          alt='icon'
        />
      </Container>
    </Wrapper>
  );
};

export default React.memo(Header);

import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../theme-context';
import { mediaQuery } from '../MediaQuery';

const Wrapper = styled.div`
  position: relative;

  img {
    position: absolute;
    bottom: 14px;
    left: 20px;
    z-index: 3;
  }
  @media (min-width: ${mediaQuery.web}) {
    img {
      left: 24px;
      width: 24px;
      bottom: 20px;
    }
  }
`;

const InputStyle = styled.input`
  width: 100%;
  height: 48px;
  position: relative;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 12px;
  letter-spacing: -0.16px;

  z-index: 2;
  margin-top: 10.8rem;
  border-radius: 5px;
  border: 0;
  background: ${(props) => props.theme};
  padding: 1.4rem 5.2rem;
  color: ${(props) => props.theme.typing};
  ::placeholder {
    color: ${(props) => props.theme.inputText};
  }
  @media (min-width: ${mediaQuery.web}) {
    margin-top: 15.8rem;
    height: 64px;
    font-size: 1.8rem;
    padding: 2.3rem 7.2rem;
    line-height: 18px;
    letter-spacing: -0.25px;
  }
`;

interface InputProps {
  addTodo: (todo: string) => void;
}

const Input = ({ addTodo }: InputProps) => {
  const theme = useContext(ThemeContext);
  const [value, setValue] = useState('');

  return (
    <Wrapper>
      <img
        src={theme.mode === 'light' ? '/inputDot.svg' : '/inputDotDark.svg'}
        alt='icon'
        onClick={() => {
          if (value) {
            addTodo(value);
          }
        }}
      />
      <InputStyle
        onChange={(e) => setValue(e.target.value)}
        placeholder='Create a new todo…'
        theme={theme}
      />
    </Wrapper>
  );
};

export default React.memo(Input);

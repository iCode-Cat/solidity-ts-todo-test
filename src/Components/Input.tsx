import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../theme-context';

const Wrapper = styled.div`
  position: relative;
  img {
    position: absolute;
    bottom: 14px;
    left: 20px;
    z-index: 3;
  }
`;

const InputStyle = styled.input`
  width: 100%;
  height: 48px;
  position: relative;
  z-index: 2;
  margin-top: 10.8rem;
  border-radius: 5px;
  border: 0;
  background: ${(props) => props.theme};
  padding: 1.4rem 5.2rem;
  color: ${(props) => props.theme.inputText};
  ::placeholder {
    color: ${(props) => props.theme.inputText};
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

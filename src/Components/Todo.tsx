import React, { useContext } from 'react';
import styled from 'styled-components';
import { Column } from '../styles/Column';
import { ThemeContext } from '../theme-context';

interface Props {
  completed: any;
}

const Wrapper = styled.div<Props>`
  color: ${(props) => props.theme.todo};
  border-bottom: 1px solid ${(props) => props.theme.border};
  font-size: 1.2rem;
  line-height: 12px;
  font-weight: 400;
  letter-spacing: -0.17px;
`;

interface TodoProps {
  completed: boolean;
  todo: string;
  id: any;
  updateTodoStatus: (status: boolean, id: string) => void;
  removeTodo: (id: number) => void;
  index: number;
}

const Todo = ({
  todo,
  completed,
  id,
  updateTodoStatus,
  removeTodo,
  index,
}: TodoProps) => {
  const theme = useContext(ThemeContext);

  const statusHandler = () => {
    updateTodoStatus(!completed, id);
  };
  return (
    <Wrapper theme={theme} completed={completed}>
      <Column
        column='0fr 1fr 0fr'
        align='center'
        gap='12px'
        padding='1.6rem 2rem'
        theme={theme}
      >
        {completed ? (
          <img onClick={statusHandler} src='/check-active.svg' alt='icon' />
        ) : (
          <img
            onClick={statusHandler}
            src={theme.mode === 'light' ? '/inputDot.svg' : '/inputDotDark.svg'}
            alt='icon'
          />
        )}
        {todo}
        <img
          src={theme.mode === 'light' ? '/close-light.svg' : '/close-dark.svg'}
          alt='icon'
          onClick={() => removeTodo(index)}
        />
      </Column>
    </Wrapper>
  );
};

export default Todo;

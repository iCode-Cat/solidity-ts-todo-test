import React, { useContext } from 'react';
import styled from 'styled-components';
import { mediaQuery } from '../MediaQuery';
import { Column } from '../styles/Column';
import { ThemeContext } from '../theme-context';

interface Props {
  completed: any;
}

const Wrapper = styled.div<Props>`
  color: ${(props: any) => props.theme.todo};
  border-bottom: 1px solid ${(props: any) => props.theme.border};
  font-size: 1.2rem;
  line-height: 12px;
  font-weight: 400;
  letter-spacing: -0.17px;
  .todo_area {
    @media (min-width: ${mediaQuery.web}) {
      font-size: 1.8rem;
      line-height: 18px;
      letter-spacing: -0.25px;
      padding: 2rem 2.4rem;
      gap: 24px;
      transition: visibility 0.3s;
      img {
        width: 24px;
        cursor: pointer;
      }
      .close {
        width: 18px;
        visibility: hidden;
      }
      :hover {
        .close {
          visibility: visible;
        }
        p {
          color: ${(props) => props.theme.labelHover} !important;
        }
      }
    }
  }
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
        padding='1.6rem 2.2rem'
        theme={theme}
        className='todo_area'
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
        <p
          style={{
            textDecoration: completed ? 'line-through' : 'unset',
            color: completed ? theme.completed : 'unset',
          }}
        >
          {todo}
        </p>
        <img
          src={theme.mode === 'light' ? '/close-light.svg' : '/close-dark.svg'}
          alt='icon'
          onClick={() => removeTodo(index)}
          className='close'
        />
      </Column>
    </Wrapper>
  );
};

export default Todo;

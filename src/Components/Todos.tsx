import React, { useContext } from 'react';
import styled from 'styled-components';
import { ControlContext } from '../control-context';
import { mediaQuery } from '../MediaQuery';
import { Column } from '../styles/Column';
import { ThemeContext } from '../theme-context';
import Controls from './Controls';
import Todo from './Todo';

const Wrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;

  /* padding: 1.6rem 2rem; */
  margin-top: 1.6rem;
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 5px;
  overflow: hidden;
  .clear {
    cursor: pointer;
  }
  .todo_controls {
    display: none;
  }
  .todo_info {
    font-size: 1.2rem;
    color: ${(props) => props.theme.labelPassive};
    font-weight: 400;
    line-height: 12px;
    letter-spacing: -0.17px;
  }
  @media (min-width: ${mediaQuery.web}) {
    margin-top: 2.4rem;
    .todo_info {
      grid-template-columns: repeat(3, auto);
      justify-items: center;
      justify-content: space-between;
      align-items: center;
      padding: 1.6rem 2.4rem;
    }
    .todo_controls {
      display: grid;
    }
    .clear:hover {
      color: ${(props) => props.theme.labelHover} !important;
    }
  }
`;

interface ITodos {
  todos: ITodo[];
  updateTodoStatus: (status: boolean, id: string) => void;
  removeTodo: (id: number) => void;
}

export interface ITodo {
  completed: boolean;
  id?: string;
  todo: string;
  owner?: string;
}

const Todos = ({ todos, updateTodoStatus, removeTodo }: ITodos) => {
  const theme = useContext(ThemeContext);
  const [controlStatus] = useContext(ControlContext);

  return (
    <Wrapper theme={theme}>
      {todos
        .filter((tf) => {
          if (controlStatus === 'All') {
            return true;
          }
          if (controlStatus === 'Active') {
            return !tf.completed;
          }
          if (controlStatus === 'Completed') {
            return tf.completed;
          }
          return false;
        })
        .map((a, index) => (
          <Todo
            key={a.id}
            updateTodoStatus={updateTodoStatus}
            removeTodo={removeTodo}
            todo={a.todo}
            completed={a.completed}
            id={a.id}
            index={index}
          />
        ))}
      <Column
        className='todo_info'
        column='1fr auto'
        gap='12px'
        padding='1.6rem 1.9rem 2.2rem 1.6rem'
        theme={theme}
      >
        <p>{todos.length} items left</p>
        <Controls
          className='todo_controls'
          completedExists={todos.find((to) => to.completed)}
        />
        <p className='clear'>Clear Completed</p>
      </Column>
    </Wrapper>
  );
};

export default React.memo(Todos);

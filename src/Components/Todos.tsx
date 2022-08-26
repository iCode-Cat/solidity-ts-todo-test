import React, { useContext } from 'react';
import styled from 'styled-components';
import { ControlContext } from '../control-context';
import { Column } from '../styles/Column';
import { ThemeContext } from '../theme-context';
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
  .todo_info {
    font-size: 1.2rem;
    color: ${(props) => props.theme.labelPassive};
    font-weight: 400;
    line-height: 12px;
    letter-spacing: -0.17px;
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
        <p>Clear Completed</p>
      </Column>
    </Wrapper>
  );
};

export default React.memo(Todos);

import React, { useContext } from 'react';
import styled from 'styled-components';
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

  return (
    <Wrapper theme={theme}>
      {todos.map((a, index) => (
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
    </Wrapper>
  );
};

export default React.memo(Todos);

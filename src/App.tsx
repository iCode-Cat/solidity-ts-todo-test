import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from './contract/abi.json';
import { useNotification } from '@web3uikit/core';
import styled from 'styled-components';
import Header from './Components/Header';
import Input from './Components/Input';
import { ThemeContext, themes, HandleTheme } from './theme-context';

import './App.css';
import Todos from './Components/Todos';

const Wrapper = styled.div`
  position: relative;
  background: ${(props) => props.theme.topbg};
  min-height: 100vh;
`;

declare global {
  interface Window {
    ethereum: any;
  }
}

interface ITodo {
  completed: boolean;
  id: string;
  todo: string;
  owner: string;
}

function App() {
  const [currentAccount, setCurrentAccount] = useState('');
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [theme, setTheme] = useState(themes.light);
  const [init, setInit] = useState(false);
  const dispatch = useNotification();

  const handleTheme = () => {
    setTheme(theme === themes.light ? themes.dark : themes.light);
  };

  // WEB3 settings
  const contractAddress = '0xAE8F0d29128d432900F5112b044602f80cb67542';
  const contractABI = abi.abi;

  const connectWallet = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      return alert('Get metamask');
    }
    try {
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      console.log('Connected', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewNotification = (text: string) => {
    dispatch({
      type: 'info',
      message: text,
      title: 'Notification',
      position: 'topR',
      // icon: "check",
    });
  };

  const removeTodo = async (index: number) => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log('Make sure you have metamask!');
    } else {
      console.log('We have the ethereum object', ethereum);
    }

    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const removeItem = await contract.removeTodo(index);
      await removeItem.wait();
      console.log('Removed item', removeItem);
      handleNewNotification('Item removed.');
      setTodos([]);
    } catch (error) {
      console.log('error');
    }
  };

  const getTodos = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log('Make sure you have metamask!');
    } else {
      console.log('We have the ethereum object', ethereum);
    }

    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const todos = await contract.getTodos();
      setInit(true);
      setTodos([]);
      todos.forEach((arr: any, index: any) => {
        console.log(index);
        if (Number(arr.owner) === Number(currentAccount)) {
          setTodos((prev) => [
            ...prev,
            {
              completed: arr.completed,
              id: ethers.BigNumber.from(arr.id).toString(),
              todo: arr.todo,
              owner: arr.owner,
            },
          ]);
        }
      });
      if (!init) {
        handleNewNotification('Todos fetched');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodoStatus = async (status: boolean, id: string) => {
    console.log(id);

    const { ethereum } = window;
    if (!ethereum) {
      return alert('Get metamask');
    }
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const todoStatus = await contract.updateTodoStatus(Number(id), status, {
        gasLimit: 300000,
      });
      console.log('Mining...', todoStatus.hash);
      await todoStatus.wait();
      getTodos();
      console.log('Mined.', todoStatus.hash);
      handleNewNotification('Status Updated!');
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async (todo: string) => {
    const { ethereum } = window;
    if (!ethereum) {
      return alert('Get metamask');
    }
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const addTodo = await contract.addTodo(todo, {
        gasLimit: 300000,
      });
      console.log('Mining...', addTodo.hash);
      await addTodo.wait();
      getTodos();
      console.log('Mined.', addTodo.hash);
      handleNewNotification('Todo Added!');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  useEffect(() => {
    if (currentAccount) {
      getTodos();
    }
  }, [currentAccount]);

  console.log(currentAccount);

  if (!currentAccount) {
    return <button onClick={connectWallet}>CONNECT</button>;
  }
  return (
    <ThemeContext.Provider value={theme}>
      <HandleTheme.Provider value={handleTheme}>
        <Wrapper theme={theme}>
          <Header />
          <div className='todo-wrapper global-pd'>
            <Input addTodo={addTodo} />
            <Todos
              updateTodoStatus={updateTodoStatus}
              todos={todos}
              removeTodo={removeTodo}
            />
          </div>
        </Wrapper>
      </HandleTheme.Provider>
    </ThemeContext.Provider>
  );
}

export default App;

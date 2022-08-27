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
import Controls from './Components/Controls';
import { ControlContext } from './control-context';
import { mediaQuery } from './MediaQuery';

const Wrapper = styled.div`
  position: relative;
  background: ${(props) => props.theme.topbg};
  min-height: 100vh;

  .todo-wrapper {
    margin: 0 auto;
    max-width: 540px;
  }
  @media (min-width: ${mediaQuery.web}) {
    .control_mob {
      display: none;
    }
  }
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
  const [loading, setLoading] = useState(false);
  const [controlStatus, setControlStatus] = useState<
    'All' | 'Active' | 'Completed'
  >('All');
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

      setCurrentAccount(accounts[0]);
    } catch (error) {}
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
    } else {
    }

    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const removeItem = await contract.removeTodo(index);
      await removeItem.wait();

      handleNewNotification('Item removed.');
      setTodos([]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getTodos = async () => {
    const { ethereum } = window;
    if (!ethereum) {
    } else {
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
    } catch (error) {}
  };

  const updateTodoStatus = async (status: boolean, id: string) => {
    const { ethereum } = window;
    if (!ethereum) {
      return alert('Get metamask');
    }
    try {
      setLoading(true);
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

      await todoStatus.wait();
      setLoading(false);
      getTodos();
      handleNewNotification('Status Updated!');
    } catch (error) {
      setLoading(false);
    }
  };

  const addTodo = async (todo: string) => {
    const { ethereum } = window;
    if (!ethereum) {
      return alert('Get metamask');
    }
    try {
      setLoading(true);
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
      await addTodo.wait();
      setLoading(false);
      getTodos();
      handleNewNotification('Todo Added!');
    } catch (error) {
      setLoading(false);
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

  if (!currentAccount) {
    return (
      <button className='connect' onClick={connectWallet}>
        CONNECT
      </button>
    );
  }

  return (
    <ThemeContext.Provider value={theme}>
      <HandleTheme.Provider value={handleTheme}>
        <ControlContext.Provider value={[controlStatus, setControlStatus]}>
          {loading && <p className='loading'>MINTING...</p>}
          <Wrapper
            style={{
              opacity: loading ? '0.5' : '1',
              pointerEvents: loading ? 'none' : 'unset',
            }}
            theme={theme}
          >
            <Header />
            <div className='todo-wrapper global-pd'>
              <Input addTodo={addTodo} />
              <Todos
                updateTodoStatus={updateTodoStatus}
                todos={todos}
                removeTodo={removeTodo}
              />
              <Controls
                className='control_mob'
                completedExists={todos.find((to) => to.completed)}
              />
            </div>
          </Wrapper>
        </ControlContext.Provider>
      </HandleTheme.Provider>
    </ThemeContext.Provider>
  );
}

export default App;

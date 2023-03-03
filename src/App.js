import './App.css';
import { useEffect, useState, Suspense, useRef, createContext } from 'react';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { createTodo } from './graphql/mutations';
import { listTodos} from './graphql/queries';
import awsExports from "./aws-exports";

import React from 'react';
import Syrups from './components/Syrups.js';
import Milks from './components/Milks.js';
import Espressos from './components/Espressos.js';
import { Link, Route, Routes } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import Navigation from './components/Navigation';
import Theater from './components/Theater';

Amplify.configure(awsExports);

const initialState = { name: '', description:'' }

export const ordersContext = createContext();

function App({ signOut, user }) {
  const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

  const [formState, setFormState] = useState(initialState);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos()
  }, []);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  };

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      const todo = todoData.data.listTodos.items
      setTodos(todos);
    } catch (err) { console.log('error fetching todos')}
  };

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return
      const todo = { ...formState };
      setTodos([...todos, todo]);
      setFormState(initialState)
      await API.graphql(graphqlOperation(createTodo, {input: todo})) 
    }catch (err) {
        console.log('error creating todo', err);
      }
    }

  const oneOrder = [
    { size: "big",
      drink: "triangle",
      syrup: ['red', 'blue'],
      milk: "one"
    },
    { size: "small",
      drink: "rectangle",
      syrup: ['gree', 'blue', 'blue'],
      milk: "two"
    },
  ];
  const [value, setValue] = useState(2);
  const MAX = 10;
  const getBackgroundSize = () => {
    return {
      backgroundSize: `${(value * 100) / MAX}% 100%`,
    };
  };

  const defaultScale = 1.0;

  const [randomShapeScale, setRandomShapeScale] = useState(defaultScale);

  const [orders, setOrders] = useState(oneOrder);

  const orderCallback = (value)=>{
    const defaultOrder =
      { size: "medium",
        drink: "Latte",
        syrup: [],
        milk: "2%"
      };
    let newValue = [...value];
    newValue.push(defaultOrder);
    setOrders(newValue);
  };

  const deleteOrder = (orderNumber, orders) => {
    orders.splice(orderNumber, 1);
    const newOrder = [...orders];
    setOrders(newOrder);
  }

  return (

    <ordersContext.Provider value={{orders, setOrders}}>
    <Navigation />
    <div style={styles.container}>
      <Heading level={1}>Hello {user.username}</Heading>
      <Button onClick={signOut}>Sign out</Button>
      <h2>Amplify Todos</h2>
      <input
        onChange={event => setInput('name', event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={event => setInput('description', event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <button style={styles.button} onClick={addTodo}>Create Todo</button>
      {
        todos.map((todo, index) => (
          <div key={todo.id ? todo.id : index} style={styles.todo}>
            <p style={styles.todoName}>{todo.name}</p>
            <p style={styles.todoDescription}>{todo.description}</p>
          </div>
        ))
      }
    </div>
    <div className="App">
      <div className="Main" style={{height: '100vh'}}>
        <Routes>
          <Route path="/Syrups"
            element={<Syrups />}
          />
          <Route path="/Milks"
            element={<Milks order={orders} setOrder={setOrders}/>}
          />
          <Route path="/Espressos"
            element={<Espressos order={orders} setOrder={setOrders}/>}
          />
        </Routes>
        <div className="Receipt">
          <h2 className="NoMargin">Order</h2>
          <h3 className="NoMargin">-------------</h3>
          {orders.map((item,i)=>{
            return (
              <div className="GridDiv" key={`order ${i}`}>
                <h2 className="NoMargin">{item.size}</h2>
                <h2 className="NoMargin">{item.drink}</h2>
                <h3 className="NoMargin">{item.milk}</h3>
                {item.syrup.map((moreItem,j)=>{
                  return (<h3 className="NoMargin" key={`moreItem ${j}`}>{moreItem}</h3>)
                })}
                <button className="NoMargin" className="Button" onClick={()=>deleteOrder(i, orders)}> delete </button>
                <h3 className="NoMargin">-------------</h3>
              </div>
            )
          })}
          <h2>end of order</h2>
        </div>

        <div className="Drinks">
          <button className="Button"><Link to="/Espressos">Espressos</Link></button>
          <button className="Button" background={"#00ff00"} onClick={()=>orderCallback(orders)}>Next Drink</button>
          <button className="Button" onClick={()=>setRandomShapeScale(randomShapeScale+1)}>Scale</button>
          <button onClick={()=>setRandomShapeScale(randomShapeScale-1)}>ScaleDown</button>
        </div>

        <Theater />

        <div className="Modifier">
              <button className="Button"><Link to="/Syrups">Syrups</Link></button>
              <button className="Button"><Link to="/Milks">Milks</Link></button>
              <input className="Input" type="range" />
              <input
                type="range"
                min="0"
                max={MAX}
                onChange={(e) => setValue(e.target.value)}
                style={getBackgroundSize()}
                value={value}
              />
              <div>{value}</div>
        </div>
      </div>
    </div>
    </ordersContext.Provider>
  );

}

export default withAuthenticator(App);

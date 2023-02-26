import '../App.css';
import { useState, Suspense, useRef, createContext } from 'react';
import Syrups from './Syrups.js';
import Milks from './Milks.js';
import Espressos from './Espressos.js';
import { Link, Route, Routes } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import Navigation from './Navigation';
import Theater from './Theater';

export const ordersContext = createContext();

export default function App() {
  let oneOrder = [
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


import { useContext } from 'react';
import { ordersContext } from '../App';


function Buttons(props) {
  const buttons = props.buttons;
  const buttonsClass = props.buttonsClass;
  const { orders, setOrders } = useContext(ordersContext);

  const action = (changedItem, orders, setOrders) => {
    let item = orders.pop();
    switch (props.type) {
      case "syrup": {
        item.syrup = item.syrup.concat(changedItem);
        break;
      }
      case "milk": {
        item.milk = changedItem;
        break;
      }
      case "drink": {
        item.drink = changedItem;
        break;
      }
    }
    orders.push(item);
    setOrders([...orders]);
  };

  return (
    <div className={buttonsClass}>
    {buttons.map((button,i) => {
      return(<button key = {i} className="Button" onClick={()=>action(button, orders, setOrders)}>{button}</button>) })}
    </div>
  );
}

export default Buttons;

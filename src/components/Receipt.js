import { createUseStyles } from 'react-jss';
import { useContext } from 'react';

export default function Receipt() {


  const deleteOrder = (orderNumber, order) => {
    order.splice(orderNumber, 1);
    const newOrder = [...order];
    setOrder(newOrder);
  }

  return(
        <div className="Receipt">
          <h2 className="NoMargin">Order</h2>
          <h3 className="NoMargin">-------------</h3>
          {order.map((item,i)=>{
            return (
              <div className="GridDiv" key={`order ${i}`}>
                <h2 className="NoMargin">{item.size}</h2>
                <h2 className="NoMargin">{item.drink}</h2>
                <h3 className="NoMargin">{item.milk}</h3>
                {item.syrup.map((moreItem,j)=>{
                  return (<h3 className="NoMargin" key={`moreItem ${j}`}>{moreItem}</h3>)
                })}
                <button className="NoMargin" className="Button" onClick={()=>deleteOrder(i, order)}> delete </button>
                <h3 className="NoMargin">-------------</h3>
              </div>
            )
          })}
          <h2>end of order</h2>
        </div>
  );

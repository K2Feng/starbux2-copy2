import '../App.css';
import Buttons from './Buttons';

function Espressos(props) {

  const espressos = ["Latte", "Capuccino", "Cortado", "Macchiato"];

  return (
    <Buttons type="drink" buttonsClass="Button-group" buttons={espressos}>
    </Buttons>
  );

}

export default Espressos;

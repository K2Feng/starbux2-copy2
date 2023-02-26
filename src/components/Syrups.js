import '../App.css';
import Buttons from './Buttons';

function Syrups() {

  const syrups = ['red', 'blue', 'yellow', 'green'];

  return (
    <Buttons type="syrup" buttonsClass="Button-group" buttons={syrups}>
    </Buttons>
  );

}

export default Syrups;

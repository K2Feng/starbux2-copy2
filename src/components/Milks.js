import '../App.css';
import Buttons from './Buttons';

function Milks(props) {

  const Milks = ['one', 'two', 'three', 'four', 'five'];
  const WithMilks = Milks.map((milk)=>{return (`with ${milk}`)});

  return (
    <>
    <Buttons type="milk" buttonsClass="Button-group-milk" buttons={Milks}>
    </Buttons>
    <Buttons type="milk" buttonsClass="Button-group-milk-right" buttons={WithMilks}>
    </Buttons>
    </>
  );

}

export default Milks;

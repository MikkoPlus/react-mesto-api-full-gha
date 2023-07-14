import spinner from "../../images/icons/spinner.gif";

function Spinner({isLoading}) {
  return <img className={`spinner spinner_${isLoading ? 'visible' : 'hidden'}`} src={spinner} alt="spinner" />;
}

export default Spinner;

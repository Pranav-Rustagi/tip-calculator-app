import Heading from './Heading';
import Calculator from './Calculator';

const sortArr = arr => arr.sort((a, b) => (a - b));

const App = () => {
  const tipRates = [10, 15, 5, 50, 25];
  const heading = "splitter";

  return (
    <div className="container d-flex flex-column justify-content-between justify-content-sm-center h-100 px-0 py-sm-5">
      <Heading title={ heading } />
      <Calculator tipRates={ sortArr(tipRates) } />
    </div>
  );
}

export default App;

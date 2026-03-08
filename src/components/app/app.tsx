import Homepage from '../homepage/homepage';

type AppProps = {
  offersCount: number;
};

function App({offersCount}: AppProps): JSX.Element {
  return <Homepage offersCount={offersCount} />;
}

export default App;

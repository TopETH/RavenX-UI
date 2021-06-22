import trees from './assets/svg/trees.svg';
import './App.css';
import ChasersList from './views/ChasersList';
import ChasingPanel from './views/ChasingPanel';
import Header from './views/Header';
import Footer from './views/Footer';
import Container from '@material-ui/core/Container';
import Title from './views/Title';
import configureStore from './store';
import Updater from './store/updater'
import { Provider as ReduxProvider } from 'react-redux'

import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

function getLibrary(provider) {
  const library = new Web3Provider(provider, 'any')
  library.pollingInterval = 15000
  return library
}

const store = configureStore();

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ReduxProvider store={store}>
        <div className="App">
          <Container style={{maxWidth: "590px"}}>
            <Updater/>
            <Header/>
            <Title/>
            <ChasingPanel/>
            <ChasersList/>
            <Footer/>
          </Container>
          <img src={trees} className="trees" alt="trees"/>
        </div>
      </ReduxProvider>
    </Web3ReactProvider>
  );
}

export default App;

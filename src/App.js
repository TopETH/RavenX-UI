import trees from './assets/svg/trees.svg';
import './App.css';
import ChasersList from './views/ChasersList';
import ChasingPanel from './views/ChasingPanel';
import Header from './views/Header';
import Footer from './views/Footer';
import Container from '@material-ui/core/Container';
import Title from './views/Title';
import configureStore from './store';
import Updater from './store/updater';
import Web3ReactManager from './components/Web3ReactManager';
import { Provider as ReduxProvider } from 'react-redux'
import { NetworkContextName } from './constants'
import { Web3ReactProvider, createWeb3ReactRoot } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

function getLibrary(provider) {
  const library = new Web3Provider(provider, 'any')
  library.pollingInterval = 15000
  return library
}

const store = configureStore();

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <ReduxProvider store={store}>
          <div className="App">
            <Container style={{maxWidth: "590px"}}>
              <Web3ReactManager>
                <Updater/>
                <Header/>
                <Title/>
                <ChasingPanel/>
                <ChasersList/>
                <Footer/>
              </Web3ReactManager> 
            </Container>
            <img src={trees} className="trees" alt="trees"/>
          </div>
        </ReduxProvider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  );
}

export default App;

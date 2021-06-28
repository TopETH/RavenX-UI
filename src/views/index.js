import Header from "./Header";
import ChasersList from './ChasersList';
import ChasingPanel from './ChasingPanel';
import Title from './Title';
import Footer from './Footer';
import ChasingEnd from "./ChasingEnd";
import { useLotteryStatus, useRound } from '../store/hooks'

export default function Main(){
    const lotteryStatus = useLotteryStatus();
    const round = useRound();
    return(
        <>
            <Header/>
            <Title/>
            {
                
                lotteryStatus===0 && round>0? 
                <ChasingEnd/>:
                (<>
                <ChasingPanel/>
                <ChasersList/>
                </>)
            }
            
            <Footer/>
        </>
    )
}

import { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { BigNumber } from '@ethersproject/bignumber';

import { PreRoundDialog } from '../components/PreRoundDialog';
import { LOTTERY_ADDRESS } from '../constants';
import LOTTERY_ABI from '../constants/abis/Lottery.json';
import { useContract, useWeb3React } from '../hooks';
import { useRound } from '../store/hooks';
import { formatBalance } from '../utils/web3';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 20,
        position: 'relative',
        textAlign: 'center',
        zIndex: 1
      },
    text:{
        textAlign: 'center',
        font: '14px/30px Rubik Regular',
        letterSpacing: '0px',
        color: '#E32858',
        height: 17,
        marginTop: 32,
        lineHeight: 1.4,
        paddingBottom: 20
    },
    outlineBtn: {
        border: '2px solid #E32858',
        borderRadius: '8px',
        font: "16px/19px Rubik Regular",
        letterSpacing: '0px',
        color: '#F2F3F5',
        height: 40,
        width: 190
    }
}));

export default function Footer(){
    const classes = useStyles();
    const round  = useRound();
    const [open, setOpen] = useState(false);
    const [lastWinners, setLastWinners] = useState({});
    const { chainId } = useWeb3React();
    const contract = useContract(LOTTERY_ADDRESS[chainId], LOTTERY_ABI, false);

    const handlePrevRound = () => {
        try{
            contract.getLastLotteryInfo(parseInt(round)-1).then((res)=>{
                console.log("getLastLotteryInfo")
                console.log(res)
                var timestamps = [];
                var wons = [];
                res[2].forEach(val => {
                    timestamps.push(BigNumber.from(val).toNumber())
                });
                res[3].forEach(val => {
                    wons.push(formatBalance(val))
                });
                setLastWinners({round: parseInt(round)-1, winners: res[0], timestamps: timestamps, wons: wons});
                setOpen(true)
            })
        }
        catch(e){
            console.log(e)
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return(
        <>
            <div className={classes.root}>
                {round>1?<Button className={classes.outlineBtn} style={{textTransform: 'none'}} variant="outlined" color="secondary" onClick={handlePrevRound}>See round {round-1} winners</Button>:''}
                <div className={classes.text}>Read more about game's rules</div>
            </div>
            <PreRoundDialog data={lastWinners} open={open} onClose={handleClose} />
        </>
    )
}

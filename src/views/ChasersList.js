import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRound } from '../store/hooks';
import ChaserPanel from '../components/ChaserPanel';
import { useCombinedCands } from '../store/hooks';
import { PreRoundDialog } from '../components/PreRoundDialog';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop:8,
        paddingLeft: 24,
        paddingRight: 24,
        position: 'relative',
        paddingBottom: 12,
        zIndex: 1,
        textAlign: 'center',
      },
    label:{
        textAlign: 'center',
        font: '20px/30px Rubik Medium',
        letterSpacing: '0px',
        color: '#F2F3F5',
        height: 24,
        lineHeight: 1.4
    },
    header:{
        marginTop: 16,
        height: 18,
        textAlign: 'left',
        font: '14px/26px Rubik Regular',
        letterSpacing: '0px',
        color: '#B1B6C3',
        display: 'flex',
        paddingLeft: '5%',
        paddingRight: '5%',
        lineHeight: 1.5,
        minWidth:"220px"
    },
    col1:{
        width: "12%",
        textAlign: "left"
    },
    col2:{
        width: "35%",
        textAlign: "left"
    },
    col3:{
        width: "26%",
        textAlign: "right"
    },
    col4:{
        width: "27%",
        textAlign: "right"
    },
    outlineBtn: {
        border: '2px solid #E32858',
        borderRadius: '8px',
        font: "16px/19px Rubik Regular",
        letterSpacing: '0px',
        color: '#F2F3F5',
        height: 40,
        marginTop: 32,
    }

}));
export default function ChasersList(){
    const classes = useStyles();
    const chasers = useCombinedCands();
    const round  = useRound();
    const [open, setOpen] = useState(false);
    const handlePrevRound = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false);
    };

    return(
    <div className={classes.root} style={chasers.length===0?{display:'none'}:{}}>
        <div className={classes.label}>Last 4 chasers</div>
        <div className={classes.header} >
            <span className={classes.col1}>#</span>
            <span className={classes.col2}>Chaser</span>
            <span className={classes.col3}>Put in</span>
            <span className={classes.col4}>Will win</span>
        </div>
        {
            chasers.map((info)=>{
                return (<ChaserPanel key={info['id']} chaserInfo={info}/>)
            })
        }
        {round>1?<Button className={classes.outlineBtn} style={{textTransform: 'none'}} variant="outlined"  onClick={handlePrevRound}>See round {round-1} winners</Button>:''}
        <PreRoundDialog round={parseInt(round)-1} open={open} onClose={handleClose} />
    </div>
    )
}
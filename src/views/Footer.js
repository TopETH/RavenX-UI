import { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { PreRoundDialog } from '../components/PreRoundDialog';
import { RuleDialog } from '../components/RuleDialog';
import { useRound } from '../store/hooks';

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
    const [openR, setOpenR] = useState(false);

    const handlePrevRound = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseR = () =>{
        setOpenR(false);
    }

    const handleShowR = () =>{
        setOpenR(true);
    }

    return(
        <>
            <div className={classes.root}>
                {round>1?<Button className={classes.outlineBtn} style={{textTransform: 'none'}} variant="outlined" color="secondary" onClick={handlePrevRound}>See round {round-1} winners</Button>:''}
                <br></br>
                <Button className={classes.text} style={{textTransform: 'none'}} onClick={handleShowR}>Read more about game's rules</Button>
                <div style={{height: 5}}></div>
            </div>
            <PreRoundDialog round={parseInt(round)-1} open={open} onClose={handleClose} />
            <RuleDialog open={openR} onClose={handleCloseR} />
        </>
    )
}

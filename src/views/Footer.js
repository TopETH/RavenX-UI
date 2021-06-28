import { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { RuleDialog } from '../components/RuleDialog';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        textAlign: 'center',
        zIndex: 1,
        marginTop: 10,
      },
    text:{
        textAlign: 'center',
        font: '14px/30px Rubik Regular',
        letterSpacing: '0px',
        color: '#E32858',
        height: 17,
        lineHeight: 1.4,
    },

}));

export default function Footer(){
    const classes = useStyles();
    const [openR, setOpenR] = useState(false);

    const handleCloseR = () =>{
        setOpenR(false);
    }

    const handleShowR = () =>{
        setOpenR(true);
    }

    return(
        <div className={classes.root}>
            <Button className={classes.text} style={{textTransform: 'none'}} onClick={handleShowR}>Read more about game's rules</Button>
            <div style={{height: 5}}></div>
            <RuleDialog open={openR} onClose={handleCloseR} />
        </div>
    )
}

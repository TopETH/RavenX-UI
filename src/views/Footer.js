import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 20,
        position: 'relative',
        textAlign: 'center'
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
        // textAlign: center;
        font: "16px/19px Rubik Regular",
        letterSpacing: '0px',
        color: '#F2F3F5',
        height: 40,
        width: 190
    }
    }));

export default function Footer(){
    const classes = useStyles();
    return(
    <div className={classes.root}>
       <Button className={classes.outlineBtn} style={{textTransform: 'none'}} variant="outlined" color="secondary">See round 1 winners</Button>
       <div className={classes.text}>Read more about game's rules</div>
    </div>
    )
}
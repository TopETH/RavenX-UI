import React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const MyButton = styled(Button)({
    border: '2px solid #E32858',
    borderRadius: '8px',
    font: "16px/19px Rubik Regular",
    letterSpacing: '0px',
    color: '#F2F3F5',
    height: 40
});

export default function StyledOutlineButton() {
  return <MyButton style={{textTransform: 'none'}} variant="outlined" color="secondary">See round 1 winners</MyButton>
}
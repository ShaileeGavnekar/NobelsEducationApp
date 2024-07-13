import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import TrialFormWrapper from '../admin/trialForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    lpheading: {
      display: 'flex',
      flexDirection: 'column',
      height: '15%',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.8rem',
      fontFamily: 'Lato',
      fontStyle: 'normal',
      fontWeight: '600',
      textAlign: 'center',
      [theme.breakpoints.down('md')]: {
        height: '10%',
      },
    },
    card: {
      borderRadius: '2em',
      backgroundColor: 'rgba(219,201,253)',
      padding: '2em',
      [theme.breakpoints.down('md')]: {
        borderRadius: '0em',
      },
    },
  })
);

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('rgba(136, 76, 248, 1)'),
  backgroundColor: 'rgba(136, 76, 248, 1)',
  '&:hover': {
    backgroundColor: 'rgba(136, 76, 248, 1)',
  },
}));

export default function Contact() {
  const classes = useStyles();
  const [openTrial, setOpenTrial] = React.useState(false);

  return (
    <>
      {openTrial && (
        <>
          <TrialFormWrapper open={openTrial} setOpenTrial={setOpenTrial} />
        </>
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          margin: '0 auto',
          marginTop: '5em',
          border: 'none',
          width: '60%',
        }}
      >
        <Card
          sx={{
            border: 'none',
            marginTop: '5em',
          }}
          elevation={0}
          className={classes.card}
        >
          <Box>
            <CardContent>
              <Typography>
                <h2 style={{ color: '#0E007A' }}>
                  Tap that spark in your child
                </h2>
              </Typography>
              <Typography style={{ color: '#0E007A' }}>
                <b>Request a callback or book a free trial</b>
              </Typography>
            </CardContent>
            <br />
            <Typography sx={{ paddingLeft: '1em' }}>
              <ColorButton
                sx={{ padding: '5px', height: '40px', width: '180px' }}
                variant='contained'
                onClick={() => setOpenTrial(true)}
              >
                Book a FREE trial ⮕
              </ColorButton>
            </Typography>
          </Box>
        </Card>
      </Box>
    </>
  );
}

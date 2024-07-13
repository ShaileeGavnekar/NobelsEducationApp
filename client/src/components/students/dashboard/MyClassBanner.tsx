import React from 'react';
// import "./styles/navbarcomp.css"
import Navbarcomp from '../../common/navBarCom';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme, useTheme } from '@mui/material/styles';
import { H1 } from '../../common/typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    BannerContainer: {
      // height: '40vh',
      width: '100%',
      // backgroundImage: "url('/BG.jpg')",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      // [theme.breakpoints.down('md')]: {
      //   backgroundImage: "url('/resbackground.png')",
      // },
    },

    Bannerhero: {
      // height: '70.5%',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
      },
    },

    BannerLeft: {
      width: '50%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      margin: '0 auto',

      [theme.breakpoints.down('md')]: {
        width: '100%',
        height: '60%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
    },

    Bannercontent: {
      width: '80%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      margin: '0 auto',
      gap: '20px',
      [theme.breakpoints.down('md')]: {
        textAlign: 'center',
        alignItems: 'center',
        marginLeft: '2em',
      },
    },

    heading: {
      fontFamily: 'Lato',
      fontStyle: 'normal',
      fontWeight: '800',
      fontSize: '3rem',
      color: theme.palette.text.primary,
      // color: '#0e007a',
      letterSpacing: '0.2px',
      [theme.breakpoints.down('md')]: {
        fontSize: '2rem',
      },
    },

    child: {
      color: '#884cf8',
    },

    para: {
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '1rem',
      color: '#000000',
      width: '70%',
      letterSpacing: '0.1px',

      [theme.breakpoints.down('md')]: {
        width: '90%',
      },
    },

    bookbtn: {
      width: '150px',
      height: '40px',
      border: 'none',
      backgroundColor: '#884cf8',
      color: '#ffffff',
      borderRadius: '20px',
      fontSize: '0.8rem',
    },

    // @media all and (max-width: 800px) {
    //   .Banner-container {
    //     /* background-image: url("../../../../Assets/resbackground.png"); */
    //   }
    //   .Banner-hero {
    //     flex-direction: column;
    //   }
    //   .Banner-left {
    //     width: 100%;
    //     height: 60%;
    //     display: flex;
    //     flex-direction: column;
    //     align-items: center;
    //   }
    //   .Banner-right {
    //     width: 100%;
    //     height: 40%;
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    //   }
    //   .bannerimg {
    //     height: 100%;
    //     width: 100%;
    //     object-fit: contain;
    //   }
    //   .Banner-content {
    //     align-items: center;
    //     text-align: center;
    //   }

    //   .heading {
    //     font-size: 2rem;
    //   }
    //   .para {
    //     width: 90%;
    //   }
    //   .bannerimg {
    //     display: none;
    //   }
    //   .bannerimgs {
    //     display: block;
    //     height: 100%;
    //   }
    // }
  })
);

function Banner() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className={classes.BannerContainer}>
      {/* <Navbarcomp /> */}
      <div className={classes.Bannerhero}>
        <div className={classes.Bannercontent}>
          <h1 className={classes.heading}>My Classes</h1>
        </div>
      </div>
    </div>
  );
}

export default Banner;

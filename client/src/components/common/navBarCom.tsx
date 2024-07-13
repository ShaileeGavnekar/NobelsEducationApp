import React, { useState } from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme, useTheme } from "@mui/material/styles";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import HomeIcon from "@mui/icons-material/Home";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import { useMutation, useQueryClient } from "react-query";
import useCustomSnackbar from "../../hooks/useSnackbar";
import { Logout } from "../../lib/logout";
import MenuIcon from "@mui/icons-material/Menu";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "30px",
      lineHeight: "46px",
      color: "#36c394",
      //   fontWeight: '700',
    },

    navbarcompContainer: {
      // height: "60px",
      // width: "100%",
      // display: "flex",
      // justifyContent: "center",
      // alignItems: "center",
      // zIndex: 100,
    },

    og: {
      color: "#fca70c",
    },

    navHero: {
      width: "80%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      [theme.breakpoints.down("md")]: {
        width: "90%",
      },
    },

    navLeft: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "40px",
      color: "#0E007A",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "1rem",
      //   fontWeight: '500',
      marginTop: "8px",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },

    links: {
      display: "flex",
      flexDirection: "row",
      gap: "30px",
    },

    booknowbtn: {
      width: "100px",
      height: "36px",
      border: "none",
      background: "#ffffff",
      boxShadow: "0px 14px 20px rgba(136, 76, 248, 0.1)",
      borderRadius: "28px",

      // fontWeight: "500",
      color: "#884cf8",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        fontSize: "1.1rem",
        fontWeight: "600",
        height: "45px",
        backgroundColor: "#36c394",
        color: "white",
      },
    },

    menuicon: {
      height: "35px",
      width: "35px",
      marginTop: "10px",
      cursor: "pointer",
      display: "none",
      [theme.breakpoints.down("md")]: {
        display: "block",
      },
    },

    img: {
      height: "100%",
      width: "100%",
    },

    responsive: {
      height: "100%",
      width: "75%",
      position: "absolute",
      top: "0px",
      left: "0px",
      backgroundColor: "white",
      borderRadius: "4px",
      boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.068)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-evenly",
      color: "#0e007a",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "1rem",
      //   fontWeight: '500',
      zIndex: 100,
    },

    resLinks: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-evenly",
      height: "100%",
    },

    reslinksa: {
      textDecoration: "none",
    },

    linksa: {
      textDecoration: "none",
      cursor: "pointer",
    },

    // @media all and (max-width: 800px) : {
    //   navHero: {
    //     width: '90%',
    //   },
    // }

    // @media all and (max-width: 700px) :  {
    //   navLeft {
    //     display: 'none',
    //   },
    //   menuicon {
    //     display: 'block',
    //   },
    //   booknowbtn {
    //     width: '100%',
    //     fontSize: '1.1rem',
    //     fontWeight: '600',
    //     height: '45px',
    //     backgroundColor: '#36c394',
    //     color: 'white',
    //   }
    // }
  })
);
const pages = ["Products", "Pricing", "Blog"];
const realPages = [
  {
    title: "Home",
    route: "/",
  },
  { title: "Explore Courses", route: "/exploreCourses" },
  { title: "Blogs", route: "/blog" },
  { title: "Register", route: "/auth/signup" },
];

function Navbarcomp() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useCustomSnackbar();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { mutate } = useMutation(Logout, {
    onSuccess: (data) => {
      queryClient.setQueriesData("user", undefined);
      showSuccess("Logout up successfully");
      router.push("/");
    },
    onError: (e: any) => {
      showError(e.message);
    },
  });
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(open);
    };

  return (
    <>
      <div className={classes.navbarcompContainer}>
        <>
          {true && (
            <AppBar position="fixed">
              <Container maxWidth="xl">
                <Toolbar disableGutters>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    className={classes.logo}
                    sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                  >
                    {/* L<span className={classes.og}>og</span>o */}
                    <img
                      src="./logo.png"
                      style={{ width: "100px", height: "80px" }}
                    />
                  </Typography>

                  <Box
                    sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                  >
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={toggleDrawer(true)}
                      color="inherit"
                    >
                      <MenuIcon />
                    </IconButton>
                  </Box>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    className={classes.logo}
                    sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                  >
                    No<span className={classes.og}>bel</span>s
                  </Typography>
                  <Box
                    sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
                  ></Box>

                  {realPages.map((rp) => {
                    return (
                      <Box
                        mx={"16px"}
                        sx={{
                          flexGrow: 0,
                          display: { xs: "none", md: "flex" },
                        }}
                      >
                        <Button
                          onClick={() => {
                            router.push(rp.route);
                          }}
                          sx={{ color: "white", display: "block" }}
                        >
                          {rp.title}
                        </Button>
                      </Box>
                    );
                  })}

                  <Box
                    sx={{
                      flexGrow: 0,
                      marginLeft: "24px",
                      display: { xs: "none", md: "flex" },
                    }}
                  >
                    <Button
                      className={classes.booknowbtn}
                      style={{
                        borderRadius: "20px",
                        backgroundColor: "white",
                        color: "#884CF8",
                      }}
                      onClick={() => router.push("/auth/login")}
                    >
                      Login
                    </Button>
                  </Box>
                </Toolbar>
              </Container>
            </AppBar>
          )}
        </>
        {/* <nav className={classes.navHero}>
          <div>
            <h1 className={classes.logo}>
              L<span className={classes.og}>og</span>o
            </h1>
          </div>

          <div className={classes.navLeft}>
            <div className={classes.links}>
              <a className={classes.linksa} href="/">
                Home
              </a>
              <a className={classes.linksa} href="/exploreCourses">
                Explore Courses
              </a>
              <a className={classes.linksa} href="/blog">
                Blog
              </a>
              <a
                className={classes.linksa}
                onClick={() => router.push("/auth/signup")}
              >
                Register
              </a>
              {user && (
                <>
                  <a
                    className={classes.linksa}
                    href="/dashboard/student/myCourses"
                  >
                    My Courses
                  </a>
                  <a className={classes.linksa} href="/dashboard/student">
                    Dashboard
                  </a>
                </>
              )}
            </div>

            <div className="nav-btn">
              {user ? (
                <Button
                  className={classes.booknowbtn}
                  style={{
                    borderRadius: "20px",
                    backgroundColor: "white",
                    color: "#884CF8",
                  }}
                  onClick={() => mutate()}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  className={classes.booknowbtn}
                  style={{
                    borderRadius: "20px",
                    backgroundColor: "white",
                    color: "#884CF8",
                  }}
                  onClick={() => router.push("/auth/login")}
                >
                  Login
                </Button>
              )}
            </div>
          </div>

          
        </nav> */}
        <Box>
          <div className={classes.menuicon}>
            <img
              src="/bars.svg"
              className={classes.img}
              onClick={() => setOpen(!open)}
            />
          </div>
        </Box>

        {open && (
          <React.Fragment key={"left"}>
            <Drawer anchor={"left"} open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ width: 256 }}>
                <List>
                  <ListItem
                    button
                    onClick={() => router.push("/")}
                    selected={router.pathname === "/"}
                  >
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Home"} />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => router.push("/exploreCourses")}
                    selected={router.pathname === "/exploreCourses"}
                  >
                    <ListItemIcon>
                      <MenuBookIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Explore Courses"} />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => router.push("/blog")}
                    selected={router.pathname === "/blog"}
                  >
                    <ListItemIcon>
                      <RssFeedIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Blog"} />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => router.push("/auth/signup")}
                    selected={router.pathname === "/auth/signup"}
                  >
                    <ListItemIcon>
                      <HowToRegIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Register"} />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => router.push("/auth/login")}
                    selected={router.pathname === "/auth/login"}
                  >
                    <ListItemIcon>
                      <LoginIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Login"} />
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </React.Fragment>
        )}
      </div>
    </>
  );
}

export default Navbarcomp;

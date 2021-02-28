import React from 'react';
import {Button, ClickAwayListener, Grow, Paper, Popper, MenuList, MenuItem, Link} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch } from 'react-redux'
import {Redirect} from 'react-router-dom'
// import Profile from './Profile'
// import Avatar from '@material-ui/core/Avatar';
// import menubutton from './menubutton.png'

// const avatarStyle = {backgroundColor: 'white'}

const useStyles = makeStyles((theme) => ({
    root: {
      padding: '10px'
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }));

  export default function MenuListComposition() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
  
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
  
      setOpen(false);
    };
  
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      }
    }
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
  
      prevOpen.current = open;
    }, [open]);
        
    const dispatch = useDispatch()
    const handleLogout = () => {
        localStorage.clear()
        dispatch({
            type: 'SET_USER',
            user: {}
        })
      
      }

  return (
    <div className={classes.root}>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Menu
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <Link href='/profile'>
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                    </Link>
                    <Link href='/account'>
                      <MenuItem onClick={handleClose}>My Account</MenuItem>
                    </Link>
                    {!localStorage.token && <Redirect to="/login"/>}
                    
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>

  );
}

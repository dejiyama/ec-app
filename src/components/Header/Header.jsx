import React from 'react'
import {makeStyles} from '@material-ui/styles'
import logo from '../../assets/img/icons/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { getIsSignedIn } from '../../reducks/users/selectors'
import { AppBar, Toolbar } from '@material-ui/core'
import { push } from 'connected-react-router'
import HeaderMenus from './HeaderMenus'

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    menuBar: {
        backgroundColor:"#fff",
        color: "#444",
    },
    toolBar: {
        margin: '0 auto',
        maxWidth: 1024,
        width: '100%'
    },
    iconButtons: {
        margin: '0 0 0 auto'
    }
})

const Header = () => {
    const classes = useStyles();
    const selector = useSelector((state) => state)
    const isSignedIn = getIsSignedIn(selector)

    const dispatch = useDispatch()
    
    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.menuBar}>
                <Toolbar className={classes.toolBar}>
                    <img src={logo} alt="Logo" width="128"
                    onClick={() => dispatch(push('/'))}
                />
                {isSignedIn && (
                    <div className={classes.iconButtons}>
                        <HeaderMenus />
                    </div>
                )}
                </Toolbar>
            </AppBar>
        </div>
    )

}

export default Header
import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import { SearchRounded } from '@material-ui/icons'
import React, { useCallback, useState } from 'react'
import {TextInput} from '../Uikit/index'
import SearchIcon from '@material-ui/icons/Search'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import HistoryIcon from '@material-ui/icons/History'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from'@material-ui/icons/ExitToApp'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { signOut } from '../../reducks/users/operations'


const useStyles = makeStyles((theme) =>({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            flexShrink: 0,
            width: 256
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: 256
    },
    searchField: {
        alignItmes: 'center',
        display: 'flex',
        marginLeft: 32
    }
}))
const ClosableDrawer = (props) => {
    const classes = useStyles()
    const {container} = props
    const dispatch = useDispatch()

    const [keyword, setKeyword] = useState("")

    const inputKeyword = useCallback((event) => {
        setKeyword(event.target.value)
    },[setKeyword])

    const selectMenu = (event, path) => {
        dispatch(push(path))
        props.onClose(event)
    }

    const menus = [
        {func: selectMenu, label: "商品登録", icon: <AddCircleIcon />, id: "register", value: "/product/edit"},
        {func: selectMenu, label: "注文履歴", icon: <HistoryIcon/>, id: "history", value: "/oder/history"},
        {func: selectMenu, label: "プロフィール", icon: <PersonIcon/>, id: "profile", value: "/user/mypage"},

    ];


    return (
        <nav className={classes.drawer}>
            <Drawer
                container={container}
                variant="temporary"
                anchor="right"
                open={props.open}
                onClose={(e) => props.onClose(e)}
                classes={{paper: classes.drawerPaper}}
                ModalProps={{keepMounted: true}}
            >
                <div>
                    <div className={classes.searchField}>
                        <TextInput
                            fullWidth={false} label={'キーワードを入力'} multiline={false}
                            onChange={inputKeyword} required={false} rows={1} value={keyword} type={"text"}
                        />
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {menus.map(menu => (
                            <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
                                <ListItemIcon>
                                    {menu.icon}
                                    </ListItemIcon>
                                <ListItemText primary={menu.label} />
                            </ListItem>
                        ))}
                        <ListItem button key="logout" onClick={() => dispatch(signOut())}>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Logout"}/>
                        </ListItem>
                    </List>
                </div>

            </Drawer>
        </nav>
    )

}

export default ClosableDrawer
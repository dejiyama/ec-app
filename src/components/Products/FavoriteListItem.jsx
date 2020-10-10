import { makeStyles } from '@material-ui/styles'
import React from 'react'
import DeleteIcon from "@material-ui/icons/Delete"
import { Divider, IconButton, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { getUserId } from '../../reducks/users/selectors'
import { db } from '../../firebase'



const useStyles = makeStyles({
    list: {
        height:128
    },
    image: {
        objectFit: 'cover',
        margin: 16,
        height:96,
        width:96,
    },
    text: {
        width: '100%'
    }

})

const FavoriteListItem = (props) => {
    const classes = useStyles()
    const selector = useSelector((state) => state)
    const uid = getUserId(selector)


    const image = props.product.images[0].path
    const name = props.product.name
    const price = props.product.price.toLocaleString()
    const size  =props.product.size

    const removeProductFromFavorite = (id) => {
        return db.collection('users').doc(uid)
                 .collection('favorite').doc(id)
                 .delete()
    }

    return (
        <>
            <ListItem className={classes.list}>
                <ListItemAvatar>
                    <img className={classes.image} src={image} alt="商品画像"/>
                </ListItemAvatar>
                <div>
                    <ListItemText
                        primary={name}
                        secondary={"サイズ:" + size}
                    />
                    <ListItemText
                        primary={"¥" + price}
                    />
                </div>
                <IconButton onClick={() => removeProductFromFavorite(props.product.favoriteId)}>
                    <DeleteIcon />
                </IconButton>
            </ListItem>
            <Divider/>
        </>
    )
}

export default FavoriteListItem
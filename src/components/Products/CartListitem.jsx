import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/styles'
import { Divider, IconButton, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { db } from '../../firebase/index'
import { getUserId } from '../../reducks/users/selectors'

const useStyles = makeStyles({
    list: {
        height: 128
    },
    image: {
        objectFit: 'cover',
        margin: 16,
        height: 96,
        width: 96
    },
    text: {
        width: '100%'
    }
})

const CartListItem = (props) => {
    const classes = useStyles()
    const selector = useSelector((state) => state)
    const uid = getUserId(selector)

    const image = props.product.images[0].path
    const name = props.product.name
    const price = props.product.price.toLocaleString()
    const size = props.product.size

    const removeProductFromCart = id => {
        return db.collection('users').doc(uid)
                 .collection('cart').doc(id)
                 .delete()
    }
    return (
        <>
            <ListItem>
                <ListItemAvatar>
                    <img className={classes.image} src={image} alt="商品画像" />
                </ListItemAvatar>
                <div className={classes.text}>
                    <ListItemText
                        primary={name}
                        secondary={"サイズ:" + size }
                    />
                    <ListItemText
                        primary={"¥" + price}
                    />
                    <IconButton onClick={() => removeProductFromCart(props.product.cartId)}>
                        <DeleteIcon />
                    </IconButton>
                    <Divider />
                </div>
            </ListItem>
        </>
    )
}

export default CartListItem
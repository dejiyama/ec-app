import React, { useCallback } from 'react'
import List from '@material-ui/core/List'
import { Divider, ListItem, ListItemAvatar, ListItemText, makeStyles } from '@material-ui/core'
import {PrimaryButton} from '../Uikit'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

const useStyles = makeStyles({
    list: {
        background: '#fff',
        height: 'auto'
    },
    image: {
        objectFit:'cover',
        margin: '8px 16px 8px 0',
        height:96,
        width: 96
    },
    text: {
        width: '100%'
    }
})


const OrderedProducts = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const products = props.products
    
    const goToProductDetail = useCallback((id) => {
        dispatch(push('/product/' + id))
    },[])

    return (
        <List>
            {Object.keys(products).map(key => {
                const product = products[key]
                
                return (
                    <section key={product.id}>
                        <ListItem className={classes.list}>
                            <ListItemAvatar>
                                <img className={classes.image} src={product.images[0].path} alt={"Orderd Product"}/>
                            </ListItemAvatar>
                        <div className={classes.text}>
                            <ListItemText
                                primary={product.name}
                                secondary={"サイズ：" + product.size}
                            />
                            <ListItemText
                                primary={"¥" + product.price.toLocaleString()}
                            />
                        </div>
                        <PrimaryButton
                            label={"商品詳細を見る"}
                            onClick={() => goToProductDetail(product.id)}
                        />
                        </ListItem>
                        <Divider/>
                    </section>
                )
            })}
        </List>
    )
}

export default OrderedProducts
import React, { useMemo } from 'react'
import {PrimaryButton, TextDetail} from '../components/Uikit'
import { Divider, List, makeStyles } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsInCart } from '../reducks/users/selectors'
import { CartListItem } from '../components/Products'


const useStyles = makeStyles((theme) => ({
    detailBox: {
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
            width: 320
        },
        [theme.breakpoints.up('md')]: {
            width: 512
        }
    },
    orderBox: {
        border: '1px solid rgba(0,0,0,0.2)',
        borderRadius: 4,
        boxShadow: '0 4px 2px 2px rgba(0,0,0,0.2)',
        height: 256,
        margin: '24px auto 16px auto',
        padding: 16,
        width: 288
        
    }
}))

const OrderConfirm = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const productsInCart = getProductsInCart(selector)

    const subtotal = useMemo(() => {
        return productsInCart.reduce((sum, product) => sum += product.price, 0)
    },[productsInCart])
    const sippingFee = (subtotal >= 10000) ? 0 : 210
    const tax = (subtotal + sippingFee) * 0.1;
    const total = (subtotal + sippingFee + tax)

    return (
        <section className="c-section-wraping">
            <h2 className="u-text__headline">注文の確認</h2>
                <div className="p-grid__row">
                    <div className={classes.detailBox}>
                        <List>
                            {console.log('hi')}
                            {productsInCart.length > 0 && (
                                productsInCart.map(product => <CartListItem product={product} key={product.cartId} />)
                            )}
                        </List>
                    </div>  
                    <div className={classes.orderBox}>
                        <TextDetail label={"商品合計"} value={"¥" + subtotal.toLocaleString()}/>
                        <TextDetail label={"送料"} value={"¥" + sippingFee.toLocaleString()}/>
                        <TextDetail label={"消費税"} value={"¥" + tax}/>
                        <Divider/>
                        <TextDetail label={"合計（税込）"} value={"¥" + total.toLocaleString()}/>
                    </div>
                </div>
        </section>

    )
} 

export default OrderConfirm
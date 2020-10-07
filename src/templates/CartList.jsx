import { List } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { push } from 'connected-react-router'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartListitem from '../components/Products/CartListitem'
import { GreyButton } from '../components/Uikit'
import PrimaryButton from '../components/Uikit/PrimaryButton'
import {getProductsInCart} from '../reducks/users/selectors'

const useStyles = makeStyles({
    root: {
        margin: '0 auto',
        maxWidth: 512,
        width: '100%'
    }
})

const CartList = () => {
    const classes = useStyles()
    //redux全体のstate
    const selector = useSelector((state) => state)
    const dispatch = useDispatch()
    const productsInCart = getProductsInCart(selector)
    const goToOrder = useCallback ( () => {
        dispatch(push('/order/confirm'))
    }, [])

    const backToHome = useCallback(() => {
        dispatch(push('/'))
    }, [])

    return(
        <section className='c-section-wraping'>
            <h2 className="u-text__headline">
                ショッピングカート
            </h2>
            <List className={classes.root}>
                {productsInCart.length > 0 && (
                    productsInCart.map(product => <CartListitem key={product.cartId} product={product}/>)
                )}
            </List>
            <div className="module-spacer--medium" />
            <div className="p-grid__column">
                <PrimaryButton label={"レジへ進む"} onClick={goToOrder} />
                <div className="module-spacer--extra-extra-small"/>
                <GreyButton label={"ショッピングを続ける"} onClick={backToHome} />
            </div>
        </section>
    )
}

export default CartList
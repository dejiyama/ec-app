import React, { useCallback } from 'react'
import List from '@material-ui/core/List'
import { getProductsInFavorite } from '../reducks/users/selectors'
import { FavoriteListItem } from '../components/Products'
import { GreyButton } from '../components/Uikit'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        margin:'0 auto',
        maxWidth: 512,
        width: '100%å'
    }
})

const FavoriteList = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const productsInFavorite = getProductsInFavorite(selector)

    const backToHome = useCallback(() => {
        dispatch(push('/'))
    },[])

    return (
        <section className="c-section-wraping">
            <h2 className="u-text__headline">
                お気に入り商品
            </h2>
            <List className={classes.root}>
                {productsInFavorite.length > 0 && (
                    productsInFavorite.map(product => <FavoriteListItem key={product.favoriteId} product={product}/> )
                )}
            </List>
            <div className="module-spacer--medium"/>
            <div className="p-grid__column">
               <GreyButton label={"ショッピングを続ける"} onClick={backToHome}/> 
            </div>
        </section>
    )
}

export default FavoriteList
import React from 'react'
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { makeStyles } from '@material-ui/styles'
import { IconButton, Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core'

const useStyle = makeStyles({
    iconCell: {
        padding: 0,
        height: 48,
        width: 48
    }
})

const SizeTable = (props) => {
    const classes = useStyle()

    const sizes = props.sizes

    return (
        <TableContainer>
            <Table>
                <TableBody>
                    {sizes.length > 0 && (
                        sizes.map(size => (
                            <TableRow key={size.size}>
                                <TableCell component="th" scope="row">
                                    {size.size}
                                </TableCell>
                                <TableCell>
                                    残り{size.quantity}点
                                </TableCell>
                                <TableCell className={classes.iconCell}>
                                    {size.quantity > 0 ? (
                                        <IconButton onClick={() => props.addProduct(size.size)}>
                                            <ShoppingCartIcon />
                                        </IconButton>
                                    ) : (
                                        <div>売切</div>
                                    )}
                                </TableCell>
                                <TableCell className={classes.iconCell}>
                                    {/* onClickはアロー関数の仮引数でeventを取得することができる */}
                                    {/* onClickのタイミングでdiableをtrueにする。 */}
                                    <IconButton onClick={() => (props.addFavorite(size.size),alert('お気に入りに追加しました。ヘッダーのお気に入りボタンから、お気に入り商品の確認・削除ができます。'))} >
                                        <FavoriteBorderIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )

}

export default SizeTable;
import { Divider } from '@material-ui/core'
import React from 'react'
import { OrderedProducts } from './index'
import { TextDetail } from '../Uikit'


const datetimeToString = (date) => {
    return date.getFullYear() + "-"
        + ('00' + (date.getMonth()+1)).slice(-2) + "-"
        + ('00' + date.getDate()).slice(-2) + " "
        + ('00' + date.getHours()).slice(-2) + ":"
        + ('00' + date.getMinutes()).slice(-2) + ":"
        + ('00' + date.getSeconds()).slice(-2)
}

const dateToString = (date) => {
    return date.getFullYear() + "-"
        + ('00' + (date.getMonth()+1)).slice(-2) + "-"
        + ('00' + date.getDate()).slice(-2) + " "
}

const OrderHistoryItem = (props) => {
    console.log('orderhistoryitem');
    console.log(props.order.products.length);
    const products = props.order.products
    const order = props.order
    const orderedDatetime = datetimeToString(order.updated_at.toDate())
    const shippingDate = dateToString(order.shipping_date.toDate())
    const price = "¥" + order.amount.toLocaleString()

    return (
        <div>
            <div className="module-spacer--small"/>
            <TextDetail label={"注文ID"} value={order.id}/>
            <TextDetail label={"注文日時"} value={orderedDatetime}/>
            <TextDetail label={"発送予定日"} value={shippingDate}/>
            <TextDetail label={"注文金額"} value={price}/>
            {Object.keys(products).length > 0 && (
                <OrderedProducts products={products}/>
            )}
            <div className="module-spacer--extra-extra-small"/>
            <Divider/>
        </div>
    )
}

export default OrderHistoryItem
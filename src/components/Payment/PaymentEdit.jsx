import React, { useCallback, useEffect, useState, useMemo } from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {PrimaryButton, TextDetail} from '../Uikit'
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { registerCard, retrievePaymentMethod } from '../../reducks/payment/operations';
import { getCustomerId, getPaymentMethodId } from '../../reducks/users/selectors';

const PaymentEdit = () => {
    const dispatch = useDispatch()
    const stripe = useStripe()
    const elements = useElements()
    const selector = useSelector(state => state)
    const customerId = getCustomerId(selector)
    const paymentMethodId = getPaymentMethodId(selector)

    const [card, setCard] = useState({})

    const register = useCallback(() => {
        dispatch(registerCard(stripe, elements, customerId))
    }, [stripe, elements, customerId])

    const goToBackToMyPage = useCallback(() => {
        dispatch(push('/user/mypage'))
    },[dispatch])

    useEffect(() => {
        (async() => {
            const cardData = await retrievePaymentMethod(paymentMethodId)
            console.log(cardData, 'carddata');
            if (cardData) {
                setCard(cardData)
            }
        })()
    },[customerId])

    //末尾4桁処理
    const cardNumber = useMemo(() => {
        console.log(card,'card');
        if (card.last4) {
            return "**** **** **** " + card.last4
        } else {
            return "未登録"
        }
    }, [card])


    return (
        <section className="c-section-container">
            <h2 className="u-text__headline u-text-center">クレジットカード情報の登録・編集</h2>
            <div className="module-spacer--medium" />
            <h3>現在登録されているカード情報</h3>
            <div className="module-spacer--small" />
            <TextDetail label={card.brand} value={cardNumber}/>
            <CardElement
                options={{
                    style: {
                    base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                        color: '#aab7c4',
                        },
                    },
                    invalid: {
                        color: '#9e2146',
                    },
                    },
                }}
            />
            <div className="module-spacer--medium" />
            <div className="center">
                <PrimaryButton
                    label={"カード情報を保存する"}
                    onClick={register}
                />
                <PrimaryButton
                    label={"マイページに戻る"}
                    onClick={goToBackToMyPage}
                />
            </div>
        </section>
    )
}

export default PaymentEdit
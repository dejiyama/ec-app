import React, { useCallback } from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {PrimaryButton} from '../Uikit'
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { registerCard } from '../../reducks/payment/operations';

const PaymentEdit = () => {
    const dispatch = useDispatch()
    const stripe = useStripe()
    const elements = useElements()

    const register = useCallback(() => {
        dispatch(registerCard(stripe, elements))
    }, [stripe, elements])

    const goToBackToMyPage = useCallback(() => {
        dispatch(push('/user/mypage'))
    },[dispatch])

    return (
        <section className="c-section-container">
            <h2 className="u-text__headline u-text-center">クレジットカード情報の登録・編集</h2>
            <div className="module-spacer--medium" />
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
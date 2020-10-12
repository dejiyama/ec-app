import React from 'react'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js/pure';
import { PaymentEdit } from '../components/Payment';



// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_JJ1eMdKN0Hpk_test_51HbM6ZBjLSb3BS4SvTRbLvepxhVsESSOSb5tDC93qGhXPqHpB2Shn8v6BvqLb8T73FGd2Nxd2pWY7CyZO4tzFggS00U1Ggfqjpp4UFJ6kWXWO4ix00jtXzq5XG');

const CheckoutWrapper = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentEdit />
        </Elements>
    )
}

export default CheckoutWrapper
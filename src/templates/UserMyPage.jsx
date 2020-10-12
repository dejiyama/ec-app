import { push } from 'connected-react-router'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {PrimaryButton, TextDetail} from '../components/Uikit'
import {getUsername} from '../reducks/users/selectors'

const UserMypage = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const username = getUsername(selector)

    const transition = useCallback((path) => {
        dispatch(push(path))
    },[dispatch])

    return (
        <section className="c-section-container">
            <h2 className="u-text__headline u-text-center">マイページ</h2>
            <div className="module-spacer--medium" />
            <TextDetail label={"ユーザー名"} value={username}/>
            <div className="module-spacer--medium" />
            <div className="center">
                <PrimaryButton
                    label={"カード情報の編集"}
                    onClick={() => transition('/user/payment/edit')}
                />
                <PrimaryButton
                    label={"注文履歴"}
                    onClick={() => transition('/order/history')}
                />
            </div>
        </section>
    )
}

export default UserMypage
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCashRegister, faCreditCard } from '@fortawesome/free-solid-svg-icons'

import classes from './payment.module.scss'
import {Link, useNavigate} from "react-router-dom";
import {Routes} from "../routes";
import {useCallback, useMemo, useState} from "react";
import {toast} from "react-toastify";
import {usePostOrderPayed} from "../order/hooks/usePostOrderPayed";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../store";
import {addPayedOrder} from "../order/orderSlice";

export const Payment = () => {
    const orderHook = usePostOrderPayed()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {order} = useSelector((state: AppState) => state.order)

    const [chosen, setChosen] = useState(false)

    const cashSelectedClass = `${classes.cash} ${chosen && classes.chosen}`

    const pickPaymentOption = useCallback(() => {
        setChosen(true)
    }, [])

    const totalPrice = useMemo(() => {
        let count = 0
        order !== undefined && order.items.forEach(item => count += item.quantity*item.price)
        return parseInt(count.toFixed(2))
    }, [order])

    const payOrder = useCallback(() => {
        if (order !== undefined) {
            return orderHook(order.id, totalPrice)
                .then((response) => {
                    dispatch(addPayedOrder({...order, ...response}))
                    navigate(Routes.order, {replace: true})
                })
                .catch(e => {
                    toast.error("There was a problem registering your order try again.")
                })
            }
    }, [order])

    return (
        <div className={classes.container}>
            <div className={classes.boxes}>
                <div className={cashSelectedClass} onClick={pickPaymentOption}>
                    Cash
                    <FontAwesomeIcon icon={faCashRegister} color={'black'}/>
                </div>
                <div className={classes.card}>
                    Card
                    <FontAwesomeIcon icon={faCreditCard} color={'black'}/>
                </div>
            </div>
            <div className={classes.bottomBar}>
                {!chosen && <span>Please choose a payment option</span>}
                <button><Link to={Routes.home}>Cancel</Link></button>
                <button disabled={!chosen} onClick={payOrder}>Finish Order</button>
            </div>
        </div>
    )
}
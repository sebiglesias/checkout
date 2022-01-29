import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCashRegister, faCreditCard } from '@fortawesome/free-solid-svg-icons'

import classes from './payment.module.scss'
import {Link} from "react-router-dom";
import {Routes} from "../routes";
import {useCallback, useState} from "react";

export const Payment = () => {
    const [chosen, setChosen] = useState(false)


    const cashSelectedClass = `${classes.cash} ${chosen && classes.chosen}`

    const pickPaymentOption = useCallback(() => {
        setChosen(true)
    }, [])

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
                <button disabled={chosen}><Link to={Routes.order}>Finish Order</Link></button>
            </div>
        </div>
    )
}
import express from "express"
import { PrismaClient } from '@prisma/client'
import {Payment} from "./models/models";

const prisma = new PrismaClient()
const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

// endpoints
app.get('/menu', async (req, res) => {
    // just returning exception for now, will handle it better later on
    return prisma.item.findMany().then(items => res.json(items)).catch(e => res.json(e))
})

app.post('/orders', async (req, res) => {
    const { store, client, payments, items  } = req.body;
    return prisma.orderHeader.create({
        data: {
            store: {
                connect: { id: store }
            },
            client: {
                connect: { id: client }
            },
            payments: {
                create: payments?.map((payment: Payment) => {
                    return { paymentType: { connect: {id: payment.paymentType }}, ammount: payment.ammount }
                })
            },
            orderItems: {
                create: items?.map((item: {id: number, quantity: number}) => {
                    return { item: { connect: {id: item.id}}, quantity: item.quantity }
                })
            }
        }
    }).then(order => {
        res.json(order)
    }).catch(e => {
        console.log(e)
        return res.json(e)
    })
})

app.get('/orders', (req, res) => {
    prisma.orderHeader.findMany().then(orders => res.json(orders)).catch(e => res.json(e))
})

    // this one should be a different service but for now it stays here
app.post('/pay', async (req, res) => {
    res.json('OK')
})

// listen
app.listen(port, () => `Listening on port ${port}`)

import express from "express"
import { PrismaClient } from '@prisma/client'
import {Payment} from "./models/models";
// import cors from "cors"

const prisma = new PrismaClient()
const app = express()

const port = process.env.PORT || 8080

app.use(express.json())
// app.use(cors)
// app.options('*', cors)

// endpoints
app.get('/menu', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    // just returning exception for now, will handle it better later on
    return prisma.item.findMany().then(items => res.json(items)).catch(e => res.json(e))
})

app.get('/categories', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    return prisma.category.findMany().then(categories => res.json(categories)).catch(e => res.json(e))
})

app.post('/orders', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
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
    res.header("Access-Control-Allow-Origin", "*")
    prisma.orderHeader.findMany().then(orders => res.json(orders)).catch(e => res.json(e))
})

    // this one should be a different service but for now it stays here
app.post('/pay', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.json('OK')
})

// listen
app.listen(port, () => console.log(`Listening on port ${port}`))

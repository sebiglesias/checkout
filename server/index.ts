import express from "express"
import { PrismaClient } from '@prisma/client'
import {Payment} from "./models/models";

import cors from 'cors'

const prisma = new PrismaClient()
const app = express()

const port = process.env.PORT || 8080

app.use(express.json())
app.use(cors())

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


/**
 * This endpoint will receive order info related to any of the 2 steps of an order and will validate accordingly. To check the 2
 * steps, check the docs/logs/01-29-2022.md file.
 */
app.post('/orders', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const { id, orderHeaderStateId, store, client, payments, items  } = req.body;
    // In a real life scenario I would never pass a text coming from a client directly to a search in the db, a sanitization
    // should be performed but it out-scopes this project a bit I believe.
    // Would perform some validations for each item, so as not to trust the price that comes from the client-side, as it may be tampered.
    // but due to time constraints I won't do so. They would require to search each item id in the database and use the values coming
    // from it as real

    if (client !== undefined && store !== undefined) {
        return prisma.orderHeader.create({
            data: {
                store: {
                    connect: { id: store }
                },
                client: {
                    connect: { id: client }
                },
                orderItems: {
                    create: items?.map((item: {id: number, quantity: number, price: number}) => {
                        return { item: { connect: {id: item.id}}, quantity: item.quantity, price: item.price }
                    })
                },
                state: {
                    connect: { id: orderHeaderStateId }
                }
            }
        }).then(order => {
            return prisma.orderHeader.findFirst({
                where: {
                    id: order.id
                },
                include: {
                    orderItems: true
                },
            }).then(result => res.json(result))
        }).catch(e => {
            console.log(e)
            return res.json(e)
        })
    }
    if (id !== undefined && payments !== undefined) {
        return prisma.orderHeader.update({
            where: {
                id: id
            },
            data: {
                payments: {
                    create: payments?.map((payment: Payment) => {
                        return { paymentType: { connect: {id: payment.paymentType }}, ammount: payment.ammount }
                    })
                },
                state: {
                    connect: { id: orderHeaderStateId }
                }
            }
        }).then(order => {
            return prisma.orderHeader.findFirst({
                where: {
                    id: order.id
                },
                include: {
                    payments: true,
                    orderItems: true
                },
            }).then(result => res.json(result))
        }).catch(e => {
            console.log(e)
            return res.json(e)
        })
    }
})

app.get('/orders', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    prisma.orderHeader.findMany().then(orders => res.json(orders)).catch(e => res.json(e))
})

// listen
app.listen(port, () => console.log(`Listening on port ${port}`))

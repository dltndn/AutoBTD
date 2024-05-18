const express = require('express');
const serviceOrdersRoute = require('./serviceOrder.route')

const router = express.Router();

const DEFAULT_ROUTE = ''

const defaultRoutes = [
    {
        path : '/service-orders',
        route: serviceOrdersRoute,
    },
    
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router
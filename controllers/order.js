const { validationResult } = require('express-validator');

const Order = require('../models/order');

exports.getOrders = async (req, res, next) => {
    // const currentPage = Number.parseInt(req.query.page) || 1;
    // const perPage = Number.parseInt(req.query.perpage) || 4;
    try {
        const totalOrders = await Order.find().countDocuments();
        const orders = await Order.find();
            // .skip((currentPage - 1) * perPage)
            // .limit(perPage);

        res.status(200).json({ orders, totalOrders });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getOrder = async (req, res, next) => {
    const orderId = req.params.orderId;
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            const error = new Error('Could not find order.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ order });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.createOrder = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation Error.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const { status, type, province,city,district,street,startDate,dueDate,project,period,priority } = req.body;

        const order = new Order({
            status, type, province,city,district,street,startDate,dueDate,project,period,priority,
            creator: req.userId
        });
        await order.save();

        res.status(201).json({ message: 'Order created.', order });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateOrder = async (req, res, next) => {
    const orderId = req.params.orderId;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        const { status, type, province,city,district,street,startDate,dueDate,project,period,priority } = req.body;
        // if (req.file) {
        //     imageUrl = `images/${req.file.filename}`;
        // }
        if (!imageUrl) {
            const error = new Error('No image picked.');
            error.statusCode = 422;
            throw error;
        }

        const order = await Order.findById(orderId);

        if (!order) {
            const error = new Error('Could not find the order.');
            error.statusCode = 404;
            throw error;
        }

        // if (imageUrl !== order.imageUrl) {
        //     console.log(order.imageUrl);
        //     clearImage(order.imageUrl);
        // }

        order.status=status;
        order.type=type;
        order.province=province
        order.city=city;
        order.district=district
        order.street=street;
        order.startDate=startDate
        order.dueDate=dueDate;
        order.project=project;
        order.period=period;
        order.priority=priority;


        await order.save();

        res.status(200).json({ message: 'order updated.', order });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteOrder = async (req, res, next) => {
    const orderId = req.params.orderId;

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            const error = new Error('Could not find the order.');
            error.statusCode = 404;
            throw error;
        }
        //clearImage(order.imageUrl);
        await Order.findByIdAndRemove(orderId);

        res.status(200).json({ message: 'order has been deleted.' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

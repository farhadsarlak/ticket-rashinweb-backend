const { validationResult } = require('express-validator');

const Ticket = require('../models/ticket');

exports.getTickets = async (req, res, next) => {
    // const currentPage = Number.parseInt(req.query.page) || 1;
    // const perPage = Number.parseInt(req.query.perpage) || 4;
    try {
        const totalTicket = await Ticket.find().countDocuments();
        const tickets = await Ticket.find();
        // .skip((currentPage - 1) * perPage)
        // .limit(perPage);

        res.status(200).json({ tickets, totalTicket });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getTicket = async (req, res, next) => {
    const ticketId = req.params.userId;
    try {
        const ticket = await Ticket.findById(creator);
        if (!ticket) {
            const error = new Error('Could not find ticket.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ ticket });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.createTicket = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation Error.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const { status, title, date, body, creator } = req.body;

        const ticket = new Ticket({
            status, title, body, date,
            creator: req.userId
        });
        await ticket.save();

        res.status(201).json({ message: 'ticket created.', ticket });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateTicket = async (req, res, next) => {
    const TicketId = req.params.ticketId;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        const { status, title, date, body, creator } = req.body;


        const ticket = await Ticket.findById(ticketId);

        if (!ticket) {
            const error = new Error('Could not find the ticket.');
            error.statusCode = 404;
            throw error;
        }

        ticket.status = status;
        ticket.title = title;
        ticket.body = body;
        ticket.date = date;
        ticket.creator = creator

        await ticket.save();

        res.status(200).json({ message: 'ticket updated.', ticket });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteTicket = async (req, res, next) => {
    const ticketId = req.params.ticketId;

    try {
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            const error = new Error('Could not find the ticket.');
            error.statusCode = 404;
            throw error;
        }

        await Ticket.findByIdAndRemove(ticketId);

        res.status(200).json({ message: 'ticket has been deleted.' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

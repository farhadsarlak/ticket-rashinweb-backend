const express = require('express');
const { body } = require('express-validator');

const ticketController = require('../controllers/ticket');
const { isAuth } = require('../middlewares/is-auth');
const upload = require('../utils/multer');

const router = express.Router();

//──── GET Http Methods ──────────────────────────────────────────────────────────────────
// GET /api/tickets
router.get('/tickets', ticketController.getTickets);

// GET /api/ticket/:UserId
router.get('/ticket/:userId', ticketController.getTicket);
//──── GET Http Methods ──────────────────────────────────────────────────────────────────


//──── POST Http Methods ─────────────────────────────────────────────────────────────────
// POST /api/ticket
router.post(
    '/ticket',
    [
        body('status')
            .trim()
            .isLength({ min: 5 })
            .not()
            .isEmpty(),
        body('title')
            .trim()
            .not()
            .isEmpty(),
        body('body')
            .trim()
            .not()
            .isEmpty(),
        body('date')
            .trim()
            .not()
            .isEmpty(),
        body('creator')
            .trim()
            .not()
            .isEmpty()
    ],
    ticketController.createTicket
);
//──── POST Http Methods ─────────────────────────────────────────────────────────────────



//──── PUT Http Methods ──────────────────────────────────────────────────────────────────
// PUT /api/ticket/:ticketId
router.put(
    '/ticket/:ticketId',
    isAuth,
    [
        body('status')
            .trim()
            .isLength({ min: 5 })
            .not()
            .isEmpty(),
        body('title')
            .trim()
            .isLength({ min: 5 })
            .not()
            .isEmpty(),
        body('body')
            .trim()
            .isLength({ min: 10 })
            .not()
            .isEmpty(),
        body('date')
            .trim()
            .not()
            .isEmpty(),
        body('creator')
            .trim()
            .not()
            .isEmpty(),

    ],
    ticketController.updateTicket
);
//──── PUT Http Methods ──────────────────────────────────────────────────────────────────

//──── DELETE Http Methods ───────────────────────────────────────────────────────────────
// DELETE /api/ticket/:ticketId
router.delete('/ticket/:ticketId', isAuth, ticketController.deleteTicket);
//──── DELETE Http Methods ───────────────────────────────────────────────────────────────

module.exports = router;

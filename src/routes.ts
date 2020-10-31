import express from 'express';
import exchangeController from './controllers/exchange';

const router = express.Router();

// Exchanges routes

router.get('/exchange', exchangeController.exchange);

router.get('/currencies', exchangeController.getSupportedCurrencies);
router.post('/currencies', exchangeController.addSupportedCurrencies);
router.delete('/currencies', exchangeController.removeSupportedCurrencies);

export default router;

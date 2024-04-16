import express from 'express';
import { add, list, updateQuantity } from './cart-item.controller';
import { CreateCartItemDTO } from './cart-item.dto';
import { validate } from '../../utils/validation-middleware';

const router = express.Router();

router.get('/', list);
router.post('/', validate(CreateCartItemDTO), add);
router.patch('/:id', updateQuantity);

export default router;
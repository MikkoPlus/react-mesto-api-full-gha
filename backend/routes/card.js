const router = require('express').Router();
const {
  createCardValidation,
  checkCardId,
} = require('../middlewares/celebrateValidation');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCardValidation, createCard);
router.delete('/:cardId', checkCardId, deleteCard);
router.put('/:cardId/likes', checkCardId, likeCard);
router.delete('/:cardId/likes', checkCardId, dislikeCard);

module.exports = router;

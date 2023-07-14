const router = require('express').Router();
const userRoutes = require('./user');
const cardRoutes = require('./card');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { createUser, login } = require('../controllers/users');
const {
  userRegistrationValidation,
} = require('../middlewares/celebrateValidation');

router.post('/signin', userRegistrationValidation, login);
router.post('/signup', userRegistrationValidation, createUser);
router.use(auth);
router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Такого метода или URL не существует'));
});

module.exports = router;

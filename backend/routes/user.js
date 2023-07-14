const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUserData,
  updateUserAvatar,
  getUserInfo,
} = require('../controllers/users');
const {
  userProfileDataValidation,
  userProfileAvatarValidation,
  checkUserId,
} = require('../middlewares/celebrateValidation');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:id', checkUserId, getUserById);
router.patch('/me', userProfileDataValidation, updateUserData);
router.patch('/me/avatar', userProfileAvatarValidation, updateUserAvatar);

module.exports = router;

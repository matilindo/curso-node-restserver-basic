const {Router} = require('express');

const {usersGet , usersPatch , usersPut , usersDelete , usersPost} = require('../controllers/users');

const router = Router();

router.get('/',usersGet)

router.put('/:id', usersPut)

router.patch('/', usersPatch)

router.post('/', usersPost)

router.delete('/', usersDelete)

module.exports = router;
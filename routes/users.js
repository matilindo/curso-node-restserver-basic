const {Router} = require('express');
const {usersGet , usersPatch , usersPut , usersDelete , usersPost} = require('../controllers/users');
const { check } = require('express-validator');
const {validateFields} = require('../middlewares/validate-fields')
const {isRoleValid,emailExist,idExist} = require ('../helpers/db-validators');

const router = Router();

router.get('/',usersGet);

router.put('/:id',[
    check('id','Id invalid').isMongoId(),
    check('id').custom(idExist),
    check('role').custom(isRoleValid),
    validateFields
],usersPut);

router.patch('/', usersPatch);

router.post('/',[
    check('email').custom(emailExist),
    check('email','This email is not valid').isEmail(),
    check('name','The name is required').not().isEmpty(),
    check('password','The password is required').isLength({min:6}),
    check('role').custom(isRoleValid),
    validateFields
] ,usersPost);

router.delete('/:id',[
    check('id','Id invalid').isMongoId(),
    check('id').custom(idExist),
    validateFields
] ,
usersDelete);

module.exports = router;
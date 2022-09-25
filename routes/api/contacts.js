const express = require('express')
const router = express.Router()

const guard = require('../../middleware/guard')
const {
  validationCreateContact,
  validationUpdateContact
} = require('../../middleware/validations')

const ctrl = require('../../controllers/contacts-controller')

router.post('/', guard, validationCreateContact, ctrl.createContact);

router.get('/', guard, ctrl.getAllContacts);

router.get('/:id',guard,  ctrl.getContactById);

router.delete('/:id',guard, ctrl.deleteContact);

router.put('/:id', guard, validationUpdateContact, ctrl.updateContact);


module.exports = router
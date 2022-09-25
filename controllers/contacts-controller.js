const { Contacts } = require('../models')



const createContact = async(req, res) => {
    try {
        const userId = req.user.id;
        const contact = await Contacts.create({...req.body, userId: userId })
        res.json({
            status: 'success',
            data: contact,
            code: 201
        })
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message,
            code: 400
        })
    }
}

const getAllContacts = async(req, res) => {
    try {
       const userId = req.user.id
        let { limit, page} = req.query
        page = page || 1
        limit = limit || 9
        const offset = page * limit - limit

        const contacts = await Contacts.findAndCountAll({where: {userId}, limit, offset})
        res.json({
            status: 'success',
            total: contacts.length,
            data: contacts,
            code: 200
        })
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message,
            code: 500
        })
    }
}

const getContactById = async(req, res) => {
    try {
        const  id  = req.params.id;
        const userId = req.user.id;
        const contact = await Contacts.findOne({ where: { userId, id } })
        if (contact) {
            return res.json({
                status: 'success',
                data: contact,
                code: 200
            })
        }
        res.json({
            status: 'error',
            message: 'Contact not found',
            code: 404
        })
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message,
            code: 500
        })
    }
}

const deleteContact = async(req, res) => {
    try {
        const  id  = req.params.id;
        const userId = req.user.id;
        const contact = await Contacts.findOne({ where: { userId, id } })
        if (contact) {
            await Contacts.destroy({ where: { userId, id } })
            return res.json({
                status: "succes",
                message: "contact deleted",
                code: 200
            })
        }
        res.json({
            status: 'error',
            message: 'Contact not found',
            code: 404
        })
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message,
            code: 500
        })
    }
}

const updateContact = async(req, res) => {
    try {
         const  id  = req.params.id;
        const userId = req.user.id;
        const contact = await Contacts.update(req.body, {where: {userId, id}})
        if (contact) {
            return res.json({
                status: 'success',
                data: await Contacts.findOne({ where: { userId, id } }),
                code: 200
            })
        }
        res.json({
            status: 'error',
            message: 'Contact not found',
            code: 404
        })
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message,
            code: 500
        })
    }
}

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    deleteContact,
    updateContact
}
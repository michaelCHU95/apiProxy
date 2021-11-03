const express = require('express');
const needle = require('needle');
const url = require('url');
const apicache = require('apicache');

const router = express.Router();
let cache = apicache.middleware;

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

router.get('/', cache('10 seconds'), async (req, res) => {

    try {

        // Parsing URL Query parameters in an Object
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            ...url.parse(req.url, true).query
        });

        // Sending Request to Target Host
        const apiRes = await needle('get', `${API_BASE_URL}?${params}`);
        const data = apiRes.body;

        // Check the Request of Public API
        if (process.env.NODE_ENV !== 'production') {
            console.log(`REQUEST: ${API_BASE_URL}?${params}`);
        };

        // Returning Data in JSON format
        res.status(200).json(data);

    } catch (error) {

        res.status(500).json(error);

    }

});

module.exports = router;
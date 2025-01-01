require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
require('datejs');

global.delay = ms => new Promise(resolve => setTimeout(resolve, ms));

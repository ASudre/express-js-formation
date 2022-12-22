module.exports = {
    HOST: 'localhost',
    PORT: 8000,
    DB_URL_TEMPLATE: 'mongodb://localhost:27017',
    DB_NAME_TEMPLATE: process.env.DB_NAME_TEMPLATE || 'unicorn_local_{{instance}}_db',
}
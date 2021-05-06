var path = require('path')
module.exports = {
    build: {
        // ...
    },
    buildStaging: {
        env: require('./staging.env'),
        // ...
    },
    buildProduction: {
        env: require('./prod.env'),
        // ...
    },
    devStaging: {
        env: require('./dev-staging.env'),
        port: 8080,
        // ...
    }
}

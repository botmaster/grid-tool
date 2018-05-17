'use strict';

module.exports = function (options) {

    // @see https://www.npmjs.com/package/ssh-deploy-release


    return {

        // Common configuration
        // These options will be merged with those specific to the environment
        common: {
            localPath: 'dist'
        },

        // Environment specific configuration
        environments: {

            review: {
                host: 'lamp.lahautesociete.int',
                username: 'bitnami',
                password: 'QSD1234qsd',
                deployPath: '/opt/bitnami/apache2/htdocs/lahautesociete/grid-tool/' + options.get('branch'),
                allowRemove: true
            },

            preproduction: {
                host: 'lamp.lahautesociete.int',
                username: 'bitnami',
                password: 'QSD1234qsd',
                deployPath: '/opt/bitnami/apache2/htdocs/lahautesociete/grid-tool/preproduction',
            },

            // TODO : production deployment config
            // production: {
            //     host: 'my.server.com',
            //     username: 'username',
            //     password: 'password',
            //     deployPath: '/path/to'
            // }

        }
    };
};

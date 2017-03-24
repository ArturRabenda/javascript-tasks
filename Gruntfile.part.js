/*jshint camelcase:false*/

module.exports = {
    jshint: {
        options: {
            jshintrc: '.jshintrc'

        },
        verify: {
            options: {
                jshintrc: true,
                reporter: 'checkstyle',
                reporterOutput: 'target/jshint.xml'
            },
            files: {src: ['app/**/*.js', 'test/**/*.js', '!app/bower_components/**/*.js']}
        }
    },
    karma: {
        unit: {
            configFile: 'test/karma.conf.js'
        }
    },
    wiredep: {
        task: {
            src: ['app/*.html'],
            exclude: ['app/bower_components/bootstrap/dist/js']
        }
    }
};

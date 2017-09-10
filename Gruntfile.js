module.exports = function(grunt) {

    // Setup & Validate Target Option
    var target  = grunt.option('target') || 'dev';

    if (!target.match('dev|dist')) {
        grunt.fail.fatal('"'+target+'" is not a valid target. Valid syntax: "grunt --target=[dev|dist]"');
    }

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Watch for newer files only
    grunt.loadNpmTasks('grunt-newer');

    // postCSS
    grunt.loadNpmTasks('grunt-postcss');

    // Project configuration.
    grunt.initConfig({

        // Browserify Tasks:
        // dev:  Compiles app.js into main.js
        // dist: Compiles app.js into main.max.js file, which uglify minifies into main.js
        browserify: {
            dev: {
                src: ['js/app.js'],
                dest: 'blog/static/blog/main.js',
                options: {
                    browserifyOptions: {
                        debug: true,
                    }
                }
            },
            dist: {
                src: ['js/app.js'],
                dest: 'blog/static/blog/main.max.js'
            }
        },


        // Uglify Tasks:
        // dev:  Do nothing
        // dist: Minify main.max.js into main.js
        uglify: {
            dev: {
                // Do nothing to "dev" builds
            },
            dist: {
                files: {
                    'blog/static/blog/main.js': 'blog/static/blog/main.max.js'
                }
            }
        },

        // SASS Tasks:
        // dev:  Compile style.scss into style.css
        // dist: Compile style.scss into style.max.css, which cssmin minifies into style.css
        sass: {
            dev: {
                files: {
                    'blog/static/blog/style.css': 'sass/style.scss'
                },
                // options: {
                //     sourceMap: true
                // }
            },
            dist: {
                files: {
                    'blog/static/blog/style.max.css': 'sass/style.scss'
                }
            }
        },


        // postCSS Task:
        postcss: {
            dev: {
                options: {
                    map: false,
                    syntax : require('postcss-scss'),
                    processors: [
                        // support sass syntax - variables, nesting and mixins
                        require('precss')(),
                        // sort css rules
                        require('postcss-sorting')(),
                        // please visit this url to see examples postcss-assets. https://github.com/assetsjs/postcss-assets
                        // image manipulation - inline image, base64, cache buster
                        require('postcss-assets')({  loadPaths: ['img/'], cachebuster: true}),
                        // autoprefixer
                        require('postcss-cssnext')({browsers: ['last 4 versions', 'ie 8', 'ie 9']})
                    ]
                },
                src: 'blog/static/blog/style.css',
                dest: 'blog/static/blog/style.css'

            },
            dist: {
                options: {
                    map: {
                        inline: false
                    },
                    syntax : require('postcss-scss'),
                    processors: [
                        // support sass syntax - variables, nesting and mixins
                        require('precss')(),
                        // sort css rules
                        require('postcss-sorting')(),
                        // please visit this url to see examples postcss-assets. https://github.com/assetsjs/postcss-assets
                        // image manipulation - inline image, base64, cache buster
                        require('postcss-assets')({  loadPaths: ['img/'], cachebuster: true}),
                        // minify css
                        require('cssnano')({ discardDuplicates: false, autoprefixer: false, zindex: false }),
                        // autoprefixer
                        require('postcss-cssnext')({browsers: ['last 4 versions', 'ie 8', 'ie 9']})
                    ]
                },
                src: 'blog/static/blog/style.max.css',
                dest: 'blog/static/blog/style.css'

            }
        },

        // Watch Task:
        // Watches source files for changes and runs tasks based on the changed files
        watch: {
            options: {
                livereload: true
            },
            sass: {
                files: ['sass/**/*.scss'],
                tasks: ['compile-css']
            },
        }
    });

    // Register Task: compile-js
    // Compiles the JavaScript code for the designated target
    grunt.registerTask('compile-js', function() {
        grunt.task.run([
            'browserify:'+target,
            'uglify:'+target
        ]);
    });

    // Register Task: compile-css
    // Compiles the Style Sheets code for the designated target
    grunt.registerTask('compile-css', function() {
        grunt.task.run([
            'sass:'+target,
            'postcss:'+target
        ]);
    });


    // Register Task: compile
    // Compiles the code for the designated target
    grunt.registerTask('compile', function() {
        grunt.task.run([
            'compile-js',
            'compile-css',
        ]);
    });


    // Register Task: serve
    // Compiles the code for the designated target and then watches for changes
    grunt.registerTask('serve', function() {
        grunt.task.run([
            'compile',
            'watch',
            // 'connect:livereload'
        ]);
    });


    // Register Default task(s)
    grunt.registerTask('default', ['serve']);

};
module.exports = function(grunt) {

    // load grunt modules
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-jsxhint');

        // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Web Server
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: 'www/'
                }
            }
        },

        // do something on file change
        watch: {
            // common options
            options: {
                livereload: true
            },
            // restart grunt on Gruntfile change
            gruntfile: {
                files: 'Gruntfile.js',
                reload: true,
                tasks: ['jshint', 'build-dev']
            },
            // restart grunt on Gruntfile change
            karmafile: {
                files: 'karma.conf.js',
                tasks: 'test'
            },
            // Re-build react js
            react: {
                files: ['src/**/*.js', 'src/**/*.jsx'],
                tasks: ['jshint', 'browserify:react']
            },
            // livereload on html change
            html: {
                files: 'src/*.html',
                tasks: 'copy:html'
            },
			libs: {
			    files: ['src/lib/**/*.js'],
			    tasks: ['copy:libs']
			},
            // compile sass on change
            sass: {
                files: 'src/sass/**/*.scss',
                tasks: ['clean:wwwcss', 'compass:dev']
            },
            test: {
                files: ['src/test/**/*.js', 'src/test/**/*.jsx'],
                tasks: ['jshint', 'browserify:test', 'karma:phantomjs']
            },
            assets: {
                files: 'src/font/**',
                tasks: ['copy:assets']
            }
        },

        // clean directories for re-compiling
        clean: {
            test: 'test/*',
            www: 'www/*',
            wwwcss: ['www/css/*.css', 'www/css/*.css.map']
        },

        copy: {
            // copy html files to www directory
            html: {
                expand: true,
                cwd: 'src/',
                src: '*.html',
                dest: 'www/',
                filter: 'isFile'
            },
			libs:  {
				expand: true,
				cwd: 'src/lib/',
				src: ['*.js', '*.css'],
				dest: 'www/lib/',
				filter: 'isFile'
            },
            assets:  {
                expand: true,
                cwd: 'src/assets/',
                src: ['**/*'],
                dest: 'www/assets/'
            }
        },

        // concatenate all files into one after react compilation
        browserify: {
            options: {
                transform: [ 'reactify' ]
            },
            // compile react js
            react: {
                src: ['src/react/index.jsx'],
                dest: 'www/js/app.built.js'
            },
            // compile test files
            test: {
                src: ['src/test/**/*.jsx', 'src/test/**/*.js'],
                dest: 'test/test.built.js'
            }
        },

        // compile sass
        compass: {
            options: {
                sassDir: 'src/sass',
                cssDir: 'www/css',
                imagesDir: 'www/images'
            },
            dev: {
                options: {
                    sourcemap: true
                }
            },
            dist: {
                options: {
                    outputStyle: 'compressed'
                }
            }
        },

        // compresses given js files (best for distribution)
        uglify: {
            wwwjs: {
                files: [{
                    expand: true,
                    cwd: 'www/js',
                    src: '**/*.js',
                    dest: 'www/js'
                }]
            },
            wwwlib: {
                files: [{
                    expand: true,
                    cwd: 'www/lib',
                    src: '**/*.js',
                    dest: 'www/lib'
                }]
            }
        },

        // checking JS files for correct code (even JSX)
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true
            },
            all: ['Gruntfile.js', 'src/react/**/*.js', 'src/react/**/*.jsx', 'src/test/**/*.js', 'src/test/**/*.jsx']
        },

        // testing environment
        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            phantomjs: {
                browsers: ['PhantomJS_unsecure'],
                singleRun: true
            },
            chrome: {
                browsers: ['Chrome_unsecure'],
                singleRun: false
            }
        }
    });


    // registering build tasks
    grunt.registerTask('build-dev', ['clean:www', 'compass:dev', 'browserify:react', 'copy']);
    grunt.registerTask('build-dist', ['clean:www', 'compass:dist', 'browserify:react', 'copy', 'uglify']);

    // registering test task (Use test-debug to debug tests)
    grunt.registerTask('test', ['clean:test', 'browserify:test', 'karma:phantomjs']);
    grunt.registerTask('test-debug', ['clean:test', 'browserify:test', 'karma:chrome']);

    // the default tasks
    grunt.registerTask('default', ['build-dev', 'connect', 'watch']);
    grunt.registerTask('dist', ['test', 'build-dist']);

};
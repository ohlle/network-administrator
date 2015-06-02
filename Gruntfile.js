module.exports = function(grunt) {

    var os=require('os');
    var ifaces=os.networkInterfaces();
    var lookupIpAddress = null;
    for (var dev in ifaces) {
        //We don't want internal interfaces or docker interfaces
        if (ifaces[dev][0].internal || dev.indexOf("docker") !== -1) {
            continue;
        }
        for (var key in ifaces[dev]) {
            if (ifaces[dev][key].family == 'IPv4') {
                lookupIpAddress = ifaces[dev][key].address;
                break;

            }
        }
    }

    lookupIpAddress = lookupIpAddress || "localhost";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                files: {
                    'dist/styles/style.css': 'src/styles/style.scss'
                }
            }
        },

        browserify:     {
            options:      {
                transform:  [ require('grunt-react').browserify ]
            },
            client:          {
                src:        'src/js/**/*.jsx',
                dest:       'dist/js/game.js'
            }
        },

        connect: {
            dev: {
                options: {
                    port: 9800,
                    livereload: true,
                    base: 'dist',
                    open: 'http://' + lookupIpAddress + ':9800/index.html'
                }
            }
        },

//        uglify: {
//            options: {
//                // the banner is inserted at the top of the output
//                banner: '/*!\n <%= asciify_appname %> \n*/\n',
//                sourceMap: true
//            },
//            dist: {
//                files: {
//                    'dist/js/<%= pkg.name %>.min.js': ['dist/js/<%= pkg.name %>.js']
//                }
//            }
//        },
//
        copy: {
            images: {
                files: [
                    {expand: true, flatten: true, src: ['src/images/*.svg'], dest: 'dist/images/'}
                ]
            },
            html: {
                files: [
                    {src: ['src/index.html'], dest: 'dist/index.html'}
                ]
            }
//            style: {
//                files: [
//                    {src: ['src/styles/style.css'], dest: 'dist/styles/style.css'},
//                ]
//            },
//            script: {
//                src: 'src/js/everysport-scoreboard-frontend.js',
//                dest: 'dist/js/everysport-scoreboard-frontend.js',
//                options: {
//                    process: function (content, srcpath) {
//                        //Will fix the reference to the CSS and JS-file in everysport-scoreboard-frontend
//                        //If any of the dist-tasks are running it will use the minifed version,
//                        //otherwise just the md5-prefixed version.
//                        var isDist = grunt.cli.tasks.indexOf("diststage") !== -1
//                            || grunt.cli.tasks.indexOf("dist") !== -1
//                            || grunt.cli.tasks.indexOf("distwatch") !== -1;
//                        for (key in grunt.filerev.summary) {
//                            var escapedKey = key.replace(/\\/g, "/").replace("/", "\/");
//                            if (isDist) {
//                                if (key.indexOf(".min.") !== -1) {
//                                    escapedKey = escapedKey.replace(".min", "");
//                                }else if (key.indexOf(".css") !== -1 || key.indexOf(".js") !== -1) {
//                                    continue;
//                                }
//                            }
//                            content = content.replace(new RegExp("@@MD5"+ escapedKey+"@@MD5"),
//                                grunt.filerev.summary[key].replace(/\\/g, "/").replace("dist/",""));
//                        }
//                        return content;
//                    }
//                }
//            }
        },
//
//        compress: {
//            main: {
//                options: {
//                    mode: 'tgz',
//                    archive: 'target/everysport-scoreboard.tgz'
//                },
//                files: [{
//                    expand: true,
//                    src: '**/*',
//                    cwd: 'dist/',
//                    dot: true
//                }]
//            },
//            extra: {
//                options: {
//                    mode: 'gzip'
//                },
//                files: [
//                    //Will compress js and css so that s3 can serve the gzip version
//                    {expand: true, src: ['dist/js/**.js'], dest: ''},
//                    {expand: true, src: ['dist/images/**.svg'], dest: ''},
//                    {expand: true, src: ['dist/styles/**.css'], dest: ''}
//                ]
//            }
//        },

        watch: {
            options: {
                livereload: true
            },
            files: [ "src/js/*.js", 'src/*.html',"src/js/**/*.jsx", "src/styles/*.scss", "src/images/*.svg"],
            tasks: ['clean', 'sass', 'browserify', 'copy']
        },

//        cssmin: {
//            minify: {
//                expand: true,
//                cwd: 'dist/styles/',
//                src: ['style.css', 'everysport-scoreboard.min.css'],
//                dest: 'dist/styles/',
//                ext: '.min.css'
//            }
//        },
        clean: {
            dist: ["dist/js", "dist/images", "dist/styles", "dist/index.html"]
        },
//        replace: {
//            dev: {
//                options: {
//                    patterns: [
//                        {
//                            match: "EVERYSPORT_SCOREBOARD_HOST",
//                            replacement: "http://" + lookupIpAddress + ":9800",
//                            expression: false
//                        },
//                        {
//                            match: "SOCKETIOURL",
//                            replacement: "http://office.menmo.se:5000",
//                            expression: false
//                        },
//                        {
//                            match: "KEENIO_PROJECT_ID",
//                            replacement: "5437d3ce80a7bd1d239dfe43",
//                            expression: false
//                        },
//                        {
//                            match: "KEENIO_WRITE_KEY",
//                            replacement: "b6a6f13e44bdaf2600168da06801ad9265452a4a3ca075c667729043ec5ff802285266b51270be3d22bdbfdd33e66c2c1a5a2d626594237d4b707c0bbec572306ed03b526d66fa3b560e351c243b3edda109d1a0d73f96c9867430bf076dca43237ddc53ae355a77c95bf9850ac1e16c",
//                            expression: false
//                        }
//                    ]
//                },files: [
//                    {expand: true, flatten: true, src: ['dist/js/everysport-scoreboard-frontend.js'], dest: 'dist/js'},
//                    {expand: true, flatten: true, src: ['dist/js/everysport-scoreboard-loader*.js'], dest: 'dist/js'},
//                ]
//            },
//            stage: {
//                options: {
//                    patterns: [
//                        {
//                            match: "EVERYSPORT_SCOREBOARD_HOST",
//                            replacement: "http://scoreboard-frontend-develop.s3-website-eu-west-1.amazonaws.com",
//                            expression: false
//                        },
//                        {
//                            match: "SOCKETIOURL",
//                            replacement: "http://es-push.herokuapp.com:80/",
//                            expression: false
//                        },
//                        {
//                            match: "KEENIO_PROJECT_ID",
//                            replacement: "5437d3ce80a7bd1d239dfe43",
//                            expression: false
//                        },
//                        {
//                            match: "KEENIO_WRITE_KEY",
//                            replacement: "b6a6f13e44bdaf2600168da06801ad9265452a4a3ca075c667729043ec5ff802285266b51270be3d22bdbfdd33e66c2c1a5a2d626594237d4b707c0bbec572306ed03b526d66fa3b560e351c243b3edda109d1a0d73f96c9867430bf076dca43237ddc53ae355a77c95bf9850ac1e16c",
//                            expression: false
//                        }
//                    ]
//                },files: [
//                    {expand: true, flatten: true, src: ['dist/js/everysport-scoreboard-frontend.js'], dest: 'dist/js'},
//                    {expand: true, flatten: true, src: ['dist/js/everysport-scoreboard-loader*.js'], dest: 'dist/js'}
//                ]
//            },
//            prod: {
//                options: {
//                    patterns: [
//                        {
//                            match: "EVERYSPORT_SCOREBOARD_HOST",
//                            replacement: "http://d1pld2ye72fhjx.cloudfront.net",
//                            expression: false
//                        },
//                        {
//                            match: "SOCKETIOURL",
//                            replacement: "http://es-push.herokuapp.com:80/",
//                            expression: false
//                        },
//                        {
//                            match: "KEENIO_PROJECT_ID",
//                            replacement: "5437a979709a395bab85413b",
//                            expression: false
//                        },
//                        {
//                            match: "KEENIO_WRITE_KEY",
//                            replacement: "016fdcdc9003dfc7719393992e2ee209e0f0c3c5be203588b1d115ff3440a9ca6f9ef23f31d6047f62ec5e20ae901e908d714b01ef0bc4dbd22d3a069aa9c7b16d4c3254a57959d2deb6a6964df7e851fa10f46ff5c061b76b40a36d68123722554c399d6ddda040a80869f1ea6b63b7",
//                            expression: false
//                        }
//                    ]
//                },files: [
//                    {expand: true, flatten: true, src: ['dist/js/everysport-scoreboard-frontend.js'], dest: 'dist/js'},
//                    {expand: true, flatten: true, src: ['dist/js/everysport-scoreboard-loader*.js'], dest: 'dist/js'}
//                ]
//            }
//        },
//        filerev: {
//            dev :{
//                files: {
//                    'dist/js/': [
//                        'dist/js/everysport-scoreboard-loader.js'
//                    ],
//                    'dist/styles': [
//                        'dist/styles/style.css'
//                    ]
//                }
//            },
//            dist :{
//                files: {
//                    'dist/js/': [
//                        'dist/js/everysport-scoreboard-loader.min.js'
//                    ],
//                    'dist/styles': [
//                        'dist/styles/style.min.css'
//                    ]
//                }
//            }
//        },
//        lineremover: {
//            removeLines: {
//                files: [{
//                    expand: true, flatten: true, src: ['dist/js/everysport-scoreboard-loader.js'], dest: 'dist/js/'
//                }],
//                options: {
//                    exclusionPattern: /\/\*\* -REMOVE-LINE- \*\*\//g
//                }
//            }
//        }
	});

    // Load all files starting with `grunt-`
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('distwatch',
        [
            'clean',
            'sass',
            'browserify',
            'lineremover',
            'uglify',
            'cssmin',
            'filerev:dist',
            'copy',
            'replace:dev',
            'compress:extra',
            'connect:dev',
            'watch'
        ]);
    grunt.registerTask('dist',
        [
            'clean',
            'sass',
            'browserify',
            'lineremover',
            'uglify',
            'cssmin',
            'filerev:dist',
            'copy',
            'replace:prod',
            'compress:extra',
            'compress'
        ]);
    grunt.registerTask('diststage',
        [
            'clean',
            'sass',
            'browserify',
            'uglify',
            'cssmin',
            'filerev:dist',
            'copy',
            'replace:stage',
            'compress:extra',
            'compress'
        ]);
    grunt.registerTask('default',
        [
            'clean',
            'sass',
            'browserify',
//            'filerev:dev',
            'copy',
//            'replace:dev',
            'connect:dev',
            'watch'
        ]);
};

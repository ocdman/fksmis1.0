// °ü×°º¯Êý

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            temp: {
                src: ["temp"]
            }
        },
        copy: {
            js_temp: {
                files: [{
                    expand: true,
                    src: ['**'],
                    cwd: '../scripts/',
                    dest: 'temp/scripts/'
                }]
            },
            css_temp: {
                files: [{
                    expand: true,
                    src: ['**'],
                    cwd: '../contents/',
                    dest: 'temp/contents/'
                }]
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'temp/scripts/',
                    src: '**/*.js',
                    dest: 'temp/scripts'
                }]
            }
        },
        //Ñ¹Ëõcss
        cssmin: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                beautify: {
                    ascii_only: true
                }
            },
            my_target: {
                files: [
                    {
                        expand: true,
                        cwd: 'temp/contents/',
                        src: '**/*.css',
                        dest: 'temp/contents/'
                    }
                ]
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['clean', 'copy', 'uglify', 'cssmin']);
};
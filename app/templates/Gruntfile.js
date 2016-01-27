module.exports = function(grunt) {

    var votenew = [{
        "js/koubeiout.js": [
        "src/velocity.min.js",
        "src/radio.js",
            "src/cookie.js",
            "src/vote.js",
            "src/koubei.js" 
        ]
    }];
    var lrPort=35729;
    // 使用 middleware(中间件)，就必须关闭 LiveReload 的浏览器插件
    var serveStatic = require('serve-static');
   var serveIndex = require('serve-index');
    // 使用connect-livereload模块，生成一个与LiveReload脚本
  // <script src="http://127.0.0.1:35729/livereload.js?snipver=1" type="text/javascript"></script>
     var lrSnippet = require('connect-livereload')({ port: lrPort });
     var lrMiddleware = function(connect, options) {
    return [
      // 把脚本，注入到静态文件中
      lrSnippet,
      // 静态文件服务器的路径
      serveStatic(options.base[0]),
      // 启用目录浏览(相当于IIS中的目录浏览)
      serveIndex(options.base[0])
    ];
  };
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        qunit: {
            files: ["**/*.html"]
        },
          // 通过connect任务，创建一个静态服务器
    connect: {
      options: {
        // 服务器端口号
        port: 8089,
        // 服务器地址(可以使用主机名localhost，也能使用IP)
        hostname: '127.0.0.1',
        // 物理路径(默认为. 即根目录) 注：使用'.'或'..'为路径的时，可能会返回403 Forbidden. 此时将该值改为相对路径 如：/grunt/reloard。
        base: '../../'
      },
      livereload: {
        options: {
          // 通过LiveReload脚本，让页面重新加载。
          middleware: lrMiddleware
        }
      }
    },
    // 通过watch任务，来监听文件是否有更改
    watch: {
      client: {
        tasks:['convotenew'],
        // 我们不需要配置额外的任务，watch任务已经内建LiveReload浏览器刷新的代码片段。
        options: {
          livereload: lrPort
        },
        // '**' 表示包含所有的子目录
        // '*' 表示包含所有的文件
        files: ['../../tel/*.html', 'css/*', 'src/*', 'image/**/*']
      }
    },
        jshint: {
            option: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            },
            files: [
                "static/js/idx.build.js"
            ]
        },
        cssmin: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */'
            },
            beautify: {
                ascii_only: true
            },
            index: {
                files: [{
                    "static/css/video-index.css": [
                        "static/css/video-index.dev.css"
                    ]
                }]
            }
        },
        concat: {
            options: {
                separator: ";",
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n'
            },
            votenew: {
                files: votenew
            }



        },
        uglify: {
            options: {
                mangle: true,
                preserveComments: false,
                compress: {
                    drop_console: true
                },
                report: "min",
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n'
            },
            votenew: {
                files: votenew
            }


        },
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 3 // png图片优化水平，3是默认值，取值区间0-7
                },
                files: [{
                    expand: true, // 开启动态扩展
                    cwd: "static/image/sp_vote/", // 当前工作路径
                    src: ["**/*.{png,jpg,gif}"], // 要出处理的文件格式(images下的所有png,jpg,gif)
                    dest: "static/image/dest/" // 输出目录(直接覆盖原图)
                }]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    //grunt.loadNpmTasks("grunt-contrib-qunit");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    //grunt.loadNpmTasks("grunt-css");
    //grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-connect');
   
 
  // 自定义任务
    grunt.registerTask('live', ['connect', 'watch']);
    grunt.registerTask("minimg", ["imagemin:dynamic"]);
    grunt.registerTask("convotenew", ["concat:votenew"]);
    grunt.registerTask("dist", ["uglify:votenew"]);
};
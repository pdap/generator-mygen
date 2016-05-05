module.exports = function(grunt) {
   /**
    * js文件处理目录 
    * @type {Array}
    */
    var votenew = [{
        "js/pjax.js": [
        "src/index.js" 
        ]
    }];
    /**
     * 反向代理配置
     * @type {Array}
     */
   var proxyroutes = [
        {   api:'/api',
            target: 'http://poll.chinaso365.com/api_poll.php'
        },
        {   api:'/static/json/',
            target:'http://focus.chinaso.com/static/json/'
        }
    ];
    var url = require('url');
    var proxy = require('proxy-middleware');
    var lrPort=35729;
    function  _proxy(proxys){
        var arr=[];
        if (!(typeof  proxys  == "object" &&  proxys.constructor == Array) ){
            return false;
        };

        for (var i = proxys.length - 1; i >= 0; i--) {
             var proxyOption = url.parse(proxys[i].target);
             proxyOption.route = proxys[i].api;
           
           arr.push(proxy(proxyOption));
        };
        return arr;
    }

    // 使用 middleware(中间件)
    var lrSnippet = require('connect-livereload')({ port: lrPort });
    var serveStatic = require('serve-static');
    var serveIndex = require('serve-index');

   // connect-livereload模块，生成一个与LiveReload脚本
   // <script src="http://127.0.0.1:35729/livereload.js?snipver=1" type="text/javascript"></script>
     
    var lrMiddleware = function(connect, options) {
        var mdrouters = [
            //liveReload中间件
            lrSnippet,
            // 静态文件服务器中间件
            serveStatic(options.base[0]),
            // 启用目录浏览中间件
            serveIndex(options.base[0])
        ];
        console.log('中间件加载完毕');
        return _proxy(proxyroutes).concat(mdrouters);
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
      },

    },
    // 通过watch任务，来监听文件是否有更改
    watch: {
      jsbuild: {
        tasks:['convotenew'],
        // 
        options: {
          livereload: lrPort
        },
        // '**' 表示包含所有的子目录
        // '*' 表示包含所有的文件
        files: [ 'src/*']
      },      
      cssbuild: {
        tasks:[],
        // 
        options: {
          livereload: lrPort
        },
        // '**' 表示包含所有的子目录
        // '*' 表示包含所有的文件
        files: ['css/*.css']
      },
      htmlbuild: {
        tasks:[],
        // 
        options: {
          livereload: lrPort
        },
        // '**' 表示包含所有的子目录
        // '*' 表示包含所有的文件
        files: ['../../tel/*.html']
      },
      imagebuild: {
        tasks:[],
        // 
        options: {
          livereload: lrPort
        },
        // '**' 表示包含所有的子目录
        // '*' 表示包含所有的文件
        files: ['image/**/*']
      }
    },
  
        cssmin: {
            options: {
            compatibility: 'ie7',
            shorthandCompacting: false
            },
            beautify: {
                ascii_only: true
            },
            index: {
                files: [{
                    expand:true,
  
                   src: ['css/*.css', '!*.min.css'],
                   dest: 'css/',
                   ext: '.min.css'
                }]

            }
        },
        usebanner:{
            cssbanner:{
                options:{
                    position:'top',
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */',
                    linebreak: true
                },
                files: {
                src: [ 'css/css/*.css' ]
                }
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
        open: {
            options: {
                delay: 500
            },
            dev    : {
                path: 'http://127.0.0.1:<%= connect.options.port %>/tel/'
            },
            dist   : {
                path: 'http://127.0.0.1:<%= connect.options.port %>/'
            }
        }

    });
 
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks("grunt-open");
 
  // 自定义任务
    grunt.registerTask('live', ['connect','open:dev', 'watch']);
    grunt.registerTask("dist", ["uglify:votenew"]);
    grunt.registerTask("dev", ["concat:votenew"]);
    grunt.registerTask('default','live');
};
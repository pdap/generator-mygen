// app/index.js
var generators = require('yeoman-generator');
//var _ = require('lodash');
var extend = require('deep-extend');
module.exports = generators.Base.extend({
  // 构造函数
  constructor: function() {

    // 调用父类构造函数
    generators.Base.apply(this, arguments);
    //this.argument('name', { type: String, required: false,optional:'8',desc:"项目名称"});
    // 执行的时候接收 `--coffee` 参数
    this.option('coffee', {
      desc: "coffee参数描述",
      alias: 'c',
      type: Boolean,
      defaults: true,
      hide: false
    });
    this.option('full', {
      desc: "是否是完整项目路径，默认false只处理js",
      alias: 'f',
      type: Boolean,
      defaults: false,
      hide: false
    });
  },
  initializing: function() {
    this.props = {};
    this.pkg = {};
  },
  _init: function() {
    var rootp = this.destinationRoot();
    // returns '~/projects'

    var pa = this.destinationPath('index.js');
    // returns '~/projects/index.js'
    var sou = this.sourceRoot();
    // 返回模板根目录位置
    var soupa = this.templatePath('index.js');
    // 
    this.log(rootp, pa, sou, soupa);
    this.log(this.props.name, this.props.description, this.props.version);
  },
  /**
   * UI交互
   * @return {[type]} [description]
   */
  prompting: function() {
    var done = this.async();
    this.prompt([{
      type: 'input',
      name: 'name',
      message: '输入项目名称',
      default: this.appname,
      store: true
    }, {
      type: 'input',
      name: 'version',
      message: '输入项目版本号',
      default: '0.1.0',
      store: true
    }, {
      type: 'input',
      name: 'description',
      message: '输入项目描述信息',
      default: this.appname + '-module',
      store: true
    }], function(answers) {
      this.props = answers;
      done();
      this.config.save();

    }.bind(this));

  },
  /**
   * 配置项目
   * @return {[type]} [description]
   */
  configuring: function() {
    if (this.options.full) {
      this.directory('./', './', {});
    } else {
     this.bulkCopy(this.templatePath('src/index.js'), this.destinationPath('src/index.js'));
     this.bulkCopy(this.templatePath('Gruntfile.js'), this.destinationPath('Gruntfile.js'));
     this.template('README.md', 'README.md', {
      generatorName: this.config.name,
      yoName:  this.config.name.replace('generator-','')
    }, {});
    };
    this.pkg = this.fs.readJSON(this.templatePath('package.json'), {});
    console.log(this.pkg);
    extend(this.pkg, {
      name: this.props.name || 'name',
      version: this.props.version || '0.1.0',
      description: this.props.description || 'no description'
    });
    /* pkg.keywords = pkg.keywords || [];
     pkg.keywords.push('yeoman-generator');*/



  },
  default: function() {

  },
  /**
   * 写入相关信息
   * @return {[type]} [description]
   */
  writing: function() {
    this.log(this.config.name);
    this.fs.writeJSON(this.destinationPath('package.json'), this.pkg);

    
    /*this.fs.write(this.destinationPath('README.md'),tpl({
          generatorName: this.props.name,
          yoName: this.props.name.replace('generator-', '')
        }));*/
    //this.directory('./','./');
    /* this.copy(
       this.templatePath('Gruntfile.js'),
       this.destinationPath('Gruntfile.js'),
       {  }
     );*/
    //this.gruntfile.insertConfig("compass", "{ watch: { watch: true } }");
  },
  /**
   * 安装依赖
   * @return {[type]} [description]
   */
  install: function() {
    this.installDependencies({
      npm: true,
      bower: false
    });
   
    /* this.npmInstall(['connect-livereload',
      'grunt',
      'grunt-contrib-concat',
      'grunt-contrib-connect',
      'grunt-contrib-jshint',
      'grunt-contrib-qunit',
      'grunt-contrib-watch',
      'grunt-contrib-uglify',
      'serve-index',
      'serve-static'
    ], {
      'saveDev': true
    }, function(e) {
      //done();
      this.log('ss',e);
    }.bind(this));
 */


  },
  /**
   * 安装依赖完成后执行grunt命令
   * @return {[type]} [description]
   */
  end: function() {
    
    this.spawnCommand('grunt', ['live']);
  }
});
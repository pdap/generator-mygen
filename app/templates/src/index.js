// app/index.js
var generators = require('yeoman-generator');
var copy=require('copy');
module.exports = generators.Base.extend({
  // 构造函数
  constructor: function () {

    // 调用父类构造函数
    generators.Base.apply(this, arguments);
    //this.argument('appname', { type: String, required: false,optional:'8',desc:"项目名称"});
    // 执行的时候接收 `--coffee` 参数
    this.option('coffee',{desc:"coffee参数描述",alias:'c',type:Boolean,defaults:true,hide:false}); 
     
  },
  _init:function(){
    var  rootp=this.destinationRoot();
    // returns '~/projects'
   
    var pa=this.destinationPath('index.js');
    // returns '~/projects/index.js'
    var sou= this.sourceRoot();
    // 返回模板根目录位置
    var soupa=this.templatePath('index.js');
    // 
    this.log(rootp,pa,sou,soupa);
  },
  prompting:function(){
    var done = this.async();
    this.prompt({
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : this.appname ,
      store   : false
    }, function (answers) {
      this.log(answers.name);
      done();
    }.bind(this));
  },
  writing: function () {
     var t=this;
    //this.directory('./*','./',{});
     copy.sync(t.sourceRoot(), t.destinationRoot());
    //this.directory('./','./');
   /* this.copy(
      this.templatePath('Gruntfile.js'),
      this.destinationPath('Gruntfile.js'),
      {  }
    );*/
    //this.gruntfile.insertConfig("compass", "{ watch: { watch: true } }");
  },
  method1: function () {
    console.log('method 1 just ran',this.options.coffee);
    

  },
  method2: function () {
    console.log('method 2 just ran');
    this._init();
    this.config.save();
  }
});

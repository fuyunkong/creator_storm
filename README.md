#hotUpdatePlugin
该插件集成了官方热更新教程的https://github.com/cocos-creator/tutorial-hot-update
可视化操作 version_generator.js ,生成manifest文件
##参数说明:
版本号:新版本的版本号
资源服务器根目录:游戏更新资源在服务器上的地址,也就是res,src,manifest的服务器存放地址,例如http://192.168.191.1/test/,注意这里必须是remoteUrl,最后的斜杠可以加,也可以不加,程序做了处理
项目资源文件目录:项目构建之后,包涵res/src的那个目录,一般都是在build/jsb-default目录下
manifest存储目录: 最终生成的manifest文件存放的路径,一般设置在assets目录下
##部署
本地测试的时候,可以选择搭建的服务器目录,比如,你在manifest配置中资源服务器根目录中配置的是http://192.168.191.1/test, 如果你使用的apach服务器默认配置,那么这里就选择xampp/htdoc/test目录,
点击部署按钮,就会把项目构建之后的res/src,包括生成的manifest文件拷贝到xampp/htdoc/test目录
![截图](http://7xq9nm.com1.z0.glb.clouddn.com/hot.png)
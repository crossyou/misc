/*
 * fis 源码解析
 * 
 * http://fis.baidu.com/
 */

// source code : begin

'use strict';

exports.DEFAULT_REMOTE_REPOS = 'http://fis.baidu.com/repos';

exports.getSource = function(){
    var root = exports.getProjectPath(),
        source = {},
        project_exclude = /^(\/output\b|\/fis-[^\/]+)$/,
        include = fis.config.get('project.include'),
        exclude = fis.config.get('project.exclude');
    if (fis.util.is(exclude, 'Array')){
        project_exclude = [project_exclude].concat(exclude);
    }else if (exclude){
        project_exclude = [project_exclude, exclude];
    }
    fis.util.find(root, include, project_exclude, root).forEach(function(file){
        file = fis.file(file);
        if (file.release) {
            source[file.subpath] = file;
        }
    });
    file_put_contents('D:\\fis\\test\\test.txt', JSON.stringify(source));
    return source;
};

//paths
var PROJECT_ROOT;
var TEMP_ROOT;

function getPath(root, args){
    if(args && args.length > 0){
        args = root + '/' + Array.prototype.join.call(args, '/');
        return fis.util(args);
    } else {
        return fis.util(root);
    }
}

function initDir(path, title){
    if(fis.util.exists(path)){
        if(!fis.util.isDir(path)){
            fis.log.error('unable to set path[' + path + '] as ' + title + ' directory.');
        }
    } else {
        fis.util.mkdir(path);
    }
    path = fis.util.realpath(path);
    if(path){
        return path;
    } else {
        fis.log.error('unable to create dir [' + path + '] for ' + title + ' directory.');
    }
}

exports.getProjectPath = function(){
    if(PROJECT_ROOT){
        return getPath(PROJECT_ROOT, arguments);
    } else {
        fis.log.error('undefined project root');
    }
};

exports.setProjectRoot = function(path){
    if(fis.util.isDir(path)){
        PROJECT_ROOT = fis.util.realpath(path);
    } else {
        fis.log.error('invalid project root path [' + path + ']');
    }
};

exports.setTempRoot = function(tmp){
    TEMP_ROOT = initDir(tmp);
};

exports.getTempPath = function(){
    if(!TEMP_ROOT){
        var list = ['FIS_TEMP_DIR', 'LOCALAPPDATA', 'APPDATA', 'HOME'];
        var name = fis.cli && fis.cli.name ? fis.cli.name : 'fis';
        var tmp;
        for(var i = 0, len = list.length; i < len; i++){
            if(tmp = process.env[list[i]]){
                break;
            }
        }
        tmp = tmp || __dirname + '/../';
        exports.setTempRoot(tmp + '/.' + name + '-tmp');
    }
    return getPath(TEMP_ROOT, arguments);
};

exports.getCachePath = function(){
    return getPath(exports.getTempPath('cache'), arguments);
};

// source code : end


// resolve : begin

/**
 * 将一个字符串写入文件
 *
 * @测试专用
 * 
 * @param  {[type]} filename [description]
 * @param  {[type]} data     [description]
 * @return {[type]}          [description]
 */
function file_put_contents (filename, data) {
    var fs = require('fs'); 
    
    fs.writeFileSync(filename, data); 
}

// 获取项目下的静态资源

/**
 * fis.project.getSource();
 * 返回的数据格式如下所示:
 * 
 * @type {Object}
 */
var source = {
	"/page/index.tpl": {
		"origin": "D:/fis/fis-kernel-test/page/index.tpl",
		"rest": "D:/fis/fis-kernel-test/page/index",
		"hash": "",
		"query": "",
		"fullname": "D:/fis/fis-kernel-test/page/index.tpl",
		"dirname": "D:/fis/fis-kernel-test/page",
		"ext": ".tpl",
		"filename": "index",
		"basename": "index.tpl",
		"rExt": ".tpl",
		"realpath": "D:/fis/fis-kernel-test/page/index.tpl",
		"realpathNoExt": "D:/fis/fis-kernel-test/page/index",
		"useCompile": true,
		"useDomain": false,
		"useCache": true,
		"useHash": false,
		"useMap": false,
		"_isImage": false,
		"_isText": true,
		"isMod": false,
		"requires": [],
		"extras": {},
		"_likes": {
			"isHtmlLike": true,
			"isJsLike": false,
			"isCssLike": false
		},
		"charset": "utf8",
		"subpath": "/page/index.tpl",
		"subdirname": "/page",
		"subpathNoExt": "/page/index",
		"release": "/page/index.tpl",
		"url": "/page/index.tpl",
		"id": "page/index.tpl"
	},
	"/static/mod.js": {
		"origin": "D:/fis/fis-kernel-test/static/mod.js",
		"rest": "D:/fis/fis-kernel-test/static/mod",
		"hash": "",
		"query": "",
		"fullname": "D:/fis/fis-kernel-test/static/mod.js",
		"dirname": "D:/fis/fis-kernel-test/static",
		"ext": ".js",
		"filename": "mod",
		"basename": "mod.js",
		"rExt": ".js",
		"realpath": "D:/fis/fis-kernel-test/static/mod.js",
		"realpathNoExt": "D:/fis/fis-kernel-test/static/mod",
		"useCompile": true,
		"useDomain": true,
		"useCache": true,
		"useHash": true,
		"useMap": true,
		"_isImage": false,
		"_isText": true,
		"isMod": false,
		"requires": [],
		"extras": {},
		"_likes": {
			"isHtmlLike": false,
			"isJsLike": true,
			"isCssLike": false
		},
		"charset": "utf8",
		"subpath": "/static/mod.js",
		"subdirname": "/static",
		"subpathNoExt": "/static/mod",
		"release": "/static/mod.js",
		"url": "/static/mod.js",
		"id": "static/mod.js"
	},
	"/widget/test/test.js": {
		"origin": "D:/fis/fis-kernel-test/widget/test/test.js",
		"rest": "D:/fis/fis-kernel-test/widget/test/test",
		"hash": "",
		"query": "",
		"fullname": "D:/fis/fis-kernel-test/widget/test/test.js",
		"dirname": "D:/fis/fis-kernel-test/widget/test",
		"ext": ".js",
		"filename": "test",
		"basename": "test.js",
		"rExt": ".js",
		"realpath": "D:/fis/fis-kernel-test/widget/test/test.js",
		"realpathNoExt": "D:/fis/fis-kernel-test/widget/test/test",
		"useCompile": true,
		"useDomain": true,
		"useCache": true,
		"useHash": true,
		"useMap": true,
		"_isImage": false,
		"_isText": true,
		"isMod": false,
		"requires": [],
		"extras": {},
		"_likes": {
			"isHtmlLike": false,
			"isJsLike": true,
			"isCssLike": false
		},
		"charset": "utf8",
		"subpath": "/widget/test/test.js",
		"subdirname": "/widget/test",
		"subpathNoExt": "/widget/test/test",
		"release": "/widget/test/test.js",
		"url": "/widget/test/test.js",
		"id": "widget/test/test.js"
	},
	"/widget/test/test.tpl": {
		"origin": "D:/fis/fis-kernel-test/widget/test/test.tpl",
		"rest": "D:/fis/fis-kernel-test/widget/test/test",
		"hash": "",
		"query": "",
		"fullname": "D:/fis/fis-kernel-test/widget/test/test.tpl",
		"dirname": "D:/fis/fis-kernel-test/widget/test",
		"ext": ".tpl",
		"filename": "test",
		"basename": "test.tpl",
		"rExt": ".tpl",
		"realpath": "D:/fis/fis-kernel-test/widget/test/test.tpl",
		"realpathNoExt": "D:/fis/fis-kernel-test/widget/test/test",
		"useCompile": true,
		"useDomain": false,
		"useCache": true,
		"useHash": false,
		"useMap": false,
		"_isImage": false,
		"_isText": true,
		"isMod": false,
		"requires": [],
		"extras": {},
		"_likes": {
			"isHtmlLike": true,
			"isJsLike": false,
			"isCssLike": false
		},
		"charset": "utf8",
		"subpath": "/widget/test/test.tpl",
		"subdirname": "/widget/test",
		"subpathNoExt": "/widget/test/test",
		"release": "/widget/test/test.tpl",
		"url": "/widget/test/test.tpl",
		"id": "widget/test/test.tpl"
	}
};
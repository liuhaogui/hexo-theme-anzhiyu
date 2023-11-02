/**
 * AnZhiYu
 * lazyload
 * replace src to data-lazy-src
 */

"use strict";

const urlFor = require("hexo-util").url_for.bind(hexo);

const lazyload = htmlContent => {
  const error_img = hexo.theme.config.error_img.post_page
  const bg = hexo.theme.config.lazyload.placeholder
    ? urlFor(hexo.theme.config.lazyload.placeholder)
    : "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  return htmlContent.replace(
    /(<img(?!.class[\t]*=[\t]*['"].*?nolazyload.*?['"]).*? src=)/gi,
    `$1 "${bg}" onerror="this.onerror=null,this.src=&quot;${error_img}&quot;" data-lazy-src=`
  );
}

var fs = require('hexo-fs');

// // copy图片资源目录到对应分类目录
// hexo.extend.generator.register('after_generate', function(locals){
//
//   var dirPath = locals.posts.data[0].source.substr(0, locals.posts.data[0].source.lastIndexOf("/"))
//   console.log('dirPath ', dirPath)
//   var category = dirPath.substr(dirPath.lastIndexOf("/")+1)
//   console.log('category ', category)
//
//   const { exec, spawn } = require('child_process')
//   var basePath = process.cwd() + "/source/" + dirPath
//   var destDir = basePath + "/_image"
//   var targetDir = "public/posts/" + category + "/"
//
//   console.log ('cp -r ' + destDir + " " + targetDir )
//   spawn('cp', ['-r', destDir, targetDir])
//   // exec('cp -r ' + categoryPath+"/_image public/posts/ceph/")
// });

hexo.extend.filter.register('after_render:html', data => {
  const { enable, field } = hexo.theme.config.lazyload
  if (!enable || field !== 'site') return
  return lazyload(data)
})

hexo.extend.filter.register('after_post_render', data => {
  const { enable, field } = hexo.theme.config.lazyload
  if (!enable || field !== 'post') return
  data.content = lazyload(data.content)
  return data
})

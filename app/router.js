'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  //页面路由

  router.get('/', controller.frontend.public.index); //首页

  router.get('/home', controller.frontend.home.index); //用户中心

  router.get('/home/settings', controller.frontend.home.settings); //账户设置

  router.get('/home/collect', controller.frontend.home.collect); //我的收藏

  router.get('/home/feedback', controller.frontend.home.feedback); //建议反馈

  router.get('/resume/edit/:resumeId', controller.frontend.resume.editResume) //编辑简历

  

  //接口路由

  router.post('/api/downResume', controller.frontend.resume.downResume); //下载简历

  router.post('/api/getUser', controller.frontend.account.getUser); //用户登录

  router.post('/api/setResume', controller.frontend.resume.setResume); //保存简历

  router.post('/api/setUserInfo', controller.frontend.account.setUserInfo); //修改个人信息

  router.post('/api/createResume', controller.frontend.resume.createResume); //创建简历

  router.post('/api/deleteResume', controller.frontend.resume.deleteResume); //删除简历

  router.post('/api/registerAccount', controller.frontend.account.registerAccount); //注册用户

  router.post('/api/modifyPassword', controller.frontend.account.modifyPassword); //用户中心->修改密码

  router.post('/api/resetPassword', controller.frontend.account.resetPassword); //重置密码

  router.post('/api/resetNewPassword', controller.frontend.account.resetNewPassword); //重置新密码

  router.post('/api/setSecurity', controller.frontend.account.setSecurity); //设置密保

};

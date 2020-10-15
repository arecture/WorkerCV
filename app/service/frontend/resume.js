const Service = require('egg').Service;
const moment = require('moment');
const crypto = require('crypto');

class ResumeService extends Service {
  //获取用户简历列表
  async getResumeList(userId) {
    const { ctx, app } = this;
    var getSuccess = { code: 20000, message: '获取用户简历列表成功' };
    var getFail = { code: 40004, message: '获取用户简历列表失败' };
    var resumeList = await app.mysql.select('frontend_resume', { where: { user_id: userId }, orders: [['update_time', 'desc']] });
    for (let i = 0; i < resumeList.length; i++) {
      resumeList[i].update_time = moment(Number(resumeList[i].update_time)).format('YYYY-MM-DD HH:mm:ss')
    }
    if(resumeList) {
        return { result: getSuccess, resumeList }
    }else{
        return { result: getFail }
    }
  }

  //保存简历
  async setResume(resumeData) {
    const { ctx, app } = this;
    var setSuccess = { code: 20000, message: '保存用户简历成功' };
    var setFail = { code: 40004, message: '保存用户简历失败' };
    var updateTime = Date.parse(new Date());
    var setResume = await app.mysql.update('frontend_resume', {
      resume_name: resumeData.resumeName,
      resume_code: resumeData.resumeCode,
      update_time: updateTime
    }, { where: { resume_key: resumeData.resumeKey } });
    if(setResume.affectedRows === 1) {
      return { result: setSuccess, setResume }
    }else{
      return { result: setFail }
    }
  }

  //获取编辑简历
  async getResumeData(resumeKey) {
    const { ctx, app } = this;
    var getSuccess = { code: 20000, message: '获取用户简历成功' };
    var getFail = { code: 40004, message: '获取用户简历失败' };
    var resumeData = await app.mysql.get('frontend_resume', { resume_key: resumeKey })
    if(resumeData) {
      return { result: getSuccess, resumeData }
    }else{
      return { result: getFail }
    }
  }

  //获取所有简历模板列表
  async getResumeTemplateList() {
    const { ctx, app } = this;
    var getSuccess = { code: 20000, message: '获取简历模板成功' };
    var getFail = { code: 40004, message: '获取简历模板失败' };
    var resumeTemplateListData = await app.mysql.select('frontend_template', { limit: 12 })
    if(resumeTemplateListData) {
      return { result: getSuccess, resumeTemplateListData }
    }else{
      return { result: getFail }
    }
  }

  //获取指定简历模板
  async getResumeTemplate(templateKey) {
    const { ctx, app } = this;
    var getSuccess = { code: 20000, message: '获取简历模板成功' };
    var getFail = { code: 40004, message: '获取简历模板失败' };
    var resumeTemplateData = await app.mysql.get('frontend_template', { template_key: templateKey })
    if(resumeTemplateData) {
      return { result: getSuccess, resumeTemplateData }
    }else{
      return { result: getFail }
    }
  }

  //新建简历
  async createResume(getResumeTemplateData, resumeTeamplateData) {
    const { ctx, app } = this;
    var setSuccess = { code: 20000, message: '新建用户简历成功' };
    var setFail = { code: 40004, message: '新建用户简历失败' };
    var createTime = Date.parse(new Date());
    var resumeKey = Buffer.from(resumeTeamplateData.userId + '-' + createTime).toString('base64');
    var createResume = await app.mysql.insert('frontend_resume', {
      user_id: resumeTeamplateData.userId, //用户ID
      resume_name: resumeTeamplateData.realname + '_' + getResumeTemplateData.resumeTemplateData.template_name, //简历名称
      resume_code: getResumeTemplateData.resumeTemplateData.template_code, //简历代码
      update_time: createTime, //创建时间
      resume_key: resumeKey, //简历秘钥
      resume_type: getResumeTemplateData.resumeTemplateData.template_type, //简历类型
      resume_language: getResumeTemplateData.resumeTemplateData.template_language, //简历类型
      resume_score: 6.0 //简历评分
    });
    if(createResume.affectedRows === 1) {
      return { result: setSuccess, resumeKey: resumeKey, createResume }
    }else{
      return { result: setFail }
    }
  }

  //删除简历
  async deleteResume(resumeData) {
    const { ctx, app } = this;
    var deleteSuccess = { code: 20000, message: '删除用户简历成功' };
    var deleteFail = { code: 40004, message: '删除用户简历失败' };
    var deleteResume = await app.mysql.delete('frontend_resume', { resume_key: resumeData.resumeKey })
    if(deleteResume.affectedRows === 1) {
      return { result: deleteSuccess, deleteResume }
    }else{
      return { result: deleteFail }
    }
  }
}

module.exports = ResumeService;
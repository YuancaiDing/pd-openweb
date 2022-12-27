﻿// root node departmentId
// root node departmentId
export const COMPANY_DEPARMENTID = '';

export const PAGE_SIZE = 50;

export const IMPORT_EXPORT_SHOWLIST = {
  importDepartment: '导入部门',
  exportDepartment: '导出部门',
  importPosition: '导入职位',
  exportPosition: '导出职位',
};

export const RESULTS = {
  FAILED: 0,
  SUCCESS: 1,
  OVERINVITELIMITCOUNT: 4,
};

export const getEllipsisDep = str => {
  let arr = str.split('/');
  if (arr.length <= 3) {
    return str;
  }
  return arr[0] + '/' + '...' + '/' + arr[arr.length - 2] + '/' + arr[arr.length - 1];
};

const checkUser = (input, iti) => {
  if (!input) {
    return _l('请输入手机或者邮箱');
  }
  if (isNaN(Number(input))) {
    if (RegExp.isEmail(input)) {
      return null;
    } else {
      return _l('邮箱填写错误');
    }
  } else {
    if (iti && iti.isValidNumber()) {
      return null;
    } else {
      return _l('手机号填写错误');
    }
  }
};

export const checkForm = {
  userName: userName => {
    return $.trim(userName) === '' ? _l('姓名不能为空') : '';
  },
  email: email => {
    return $.trim(email) === '' ? _l('邮箱不能为空') : !RegExp.isEmail(email) ? _l('邮箱填写错误') : '';
  },
  mobile: (input, iti) => {
    return $.trim(input) === '' ? _l('手机号不能为空') : iti && !iti.isValidNumber() ? _l('手机号填写错误') : '';
  },
  contactPhone: tel => {
    return tel && !RegExp.isTel(tel) && !RegExp.isMobile(tel) ? _l('工作电话格式不正确') : '';
  },
  autonomously: checkUser,
  invite: checkUser,
  autonomouslyPasswrod: password => {
    const { passwordRegexTip, passwordRegex } = _.get(md, 'global.SysSettings') || {};
    return !$.trim(password)
      ? _l('密码不能为空')
      : !RegExp.isPasswordRule(password, passwordRegex)
      ? passwordRegexTip || _l('密码过于简单，至少8~20位且含字母+数字')
      : '';
  },
  mobilePhone: (mobilePhone, iti) => {
    return !mobilePhone ? _l('请输入手机号') : iti && !iti.isValidNumber() ? _l('手机号格式错误') : '';
  },
};

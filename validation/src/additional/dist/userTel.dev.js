"use strict";

$.validator.addMethod("tel", function (value, element, param) {
  var reg = /^1[3456789]d{9}$/;
  return this.optional(element) || reg.test(value);
}, "请输入正确的手机号");
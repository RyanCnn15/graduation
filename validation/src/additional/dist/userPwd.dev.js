"use strict";

$.validator.addMethod("pwd", function (value, element, param) {
  var reg = /^[a-zA-Z0-9]{6,22}$/;
  return this.optional(element) || reg.test(value);
}, "6-22位字母数字");
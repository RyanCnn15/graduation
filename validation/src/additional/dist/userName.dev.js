"use strict";

$.validator.addMethod("name", function (value, element, param) {
  var reg = /^[a-zA-z]\w{3,15}$/;
  return this.optional(element) || reg.test(value);
}, "4-16位字母、数字、下划线组合");
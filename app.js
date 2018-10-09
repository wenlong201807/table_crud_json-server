let db = require('./server.json');

module.exports = () => {
  // 使用 Mock
  var Mock = require('mockjs');
  var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'course|500': [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1000,
        zhuwenlong: '123',
        course_name: '@ctitle(5,8)',
        autor: '@cname',
        college: '@ctitle(6)',
        del: 'hahha',
        'age|18-70': 18,
        'category_Id|1-6': 1,
        lastDate: Date.now()
      }
    ],
    'copying|3700': [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1000,
        zhuwenlong: '123',
        ip: '@ip()',
        email: '@email( domain )',
        title: '@ctitle(5,6)',
        author: '@cname(4)',
        language: '@ctitle(6)',
        address: '@city',
        color: '@rgba()',
        'age|18-70': 18,
        'category_Id|1-5': 1,
        lastDate: '@datetime("yyyy-MM-dd A HH:mm:ss")',
        limit: '@boolean(5, 8, true)'
      }
    ],
    'fifth|3000': [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1000,

        title: '@ctitle(5,6)',
        author: '@cname(4)',

        'age|18-70': 18,
        'sec_Id|1-5': 1,

        limit: '@boolean(5, 8, true)'
      }
    ],
    'sixth|3000': [
      {
        'id|+1': 1000,
        author: '@cname(2,4)',

        'age|18-70': 18,
        'sixth_Id|1-5': 1
      }
    ]
  });
  // 输出结果 module.exports = data;
  return data;
};

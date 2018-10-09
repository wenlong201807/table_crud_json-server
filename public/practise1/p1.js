// 默认每页显示12条数据
const dataNum = 12;
$(function() {
  //alert('practise1');
  // 点击左侧的菜单时，触发的事件
  $('.menu').on('click', function() {
    $(this)
      .addClass('act')
      .siblings()
      .removeClass('act');
    initScreenData(1, $(this).attr('pid'));
  }); //  $('.menu').on('click', function(){})

  // 初始化页面数据******最开始***第一次渲染后台数据到页面上
  initScreenData(1, 1);
}); //$(function() {})

// 页面渲染数据的功能模块
//  分别有  后台数据加载到浏览器，初始化页面标签和分液器三部分功能。
function initScreenData(pageNum, pid) {
  // 页面出现时，渲染的ajax请求内容
  $.ajax({
    type: 'GET',
    url: '/api/course',
    data: {
      _page: pageNum,
      _limit: dataNum,
      category_Id: pid
    },
    dataType: 'json',
    success: function(data, status, xhr) {
      let nums = xhr.getResponseHeader('X-Total-Count');
      // 模板渲染数据的位置
      $('.content').html(template('contentTemplate', { dataList: data }));

      // 分液器的初始化
      $('.M-box3').pagination({
        pageCount: Math.ceil(nums / dataNum), // 总页数
        showData: dataNum, //每页显示的条数
        current: pageNum, //当前第几页****用于给后台传参数使用
        coping: true, //是否开启首页和末页，值为boolean
        prevCls: 'prev', //上一页class
        nextCls: 'next', //下一页class
        mode: 'fixed', //
        count: 10, //	mode为unfixed时显示当前选中页前后页数，mode为fixed显示页码总数
        keepShowPN: 'true', //是否一直显示上一页下一页
        jumpIptCls: 'jump-ipt',
        jumpBtnCls: 'jump-btn', // 跳转按钮class
        jumpBtn: '起跳', //
        homePage: '首页', // 首页节点内容，默认为空
        endPage: '末页', // 尾页节点内容，默认为空
        prevContent: '上页', // 上一页节点内容
        nextContent: '下页', // 下一页节点内容
        callback: function(api) {
          console.log(api.getCurrent());
          initScreenData(api.getCurrent(), $('.menu.act').attr('pid'));
        }
      }); // pagination
    } //success:function(data,status,xhr){}
  }); //$.ajax({})
} //function   initScreenData(page,pid){}

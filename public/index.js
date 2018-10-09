// 默认一页多少条
var pageSize = 10;
$(function() {
  $('.left li').on('click', function() {
    $(this)
      .addClass('active')
      .siblings()
      .removeClass('active');
    initPageData(1, $(this).attr('cid'));
  });

  // 第一次初始化
  initPageData(1, 1);
}); //$(function(){}

function initPageData(page, cid) {
  // 加载后台数据，然后初始化页面标签和分页器
  $.ajax({
    url: '/api/course',
    type: 'GET',
    data: {
      _page: page,
      _limit: pageSize,
      category_Id: cid //$('.left li.active').attr('cid')
    },
    dataType: 'json',
    success: function(dataa, status, xhr) {
      //***************************字符串拼接方式获取数据**********开始 */
      // 返回数据的总条数
      let num = xhr.getResponseHeader('X-Total-Count');
      //let html = '';
      // for (let i = 0; i < dataa.length; i++) {
      // console.log(dataa[i].author);
      // console.log(dataa[i].course_name);
      // console.log(dataa[i].college);
      //   html += '  <li>';
      //   html +=
      //     '    <img class="cl_img" src="" alt="我是教材图片" title="我是教材图片">';
      //   html += '    <h3>' + dataa[i].course_name + '</h3>';
      //   html +=
      //     '    <span class="fir">' +
      //     dataa[i].autor +
      //     '</span>&nbsp;&nbsp;&nbsp;&nbsp;';
      //   html += '    <span class="sec">' + dataa[i].college + '</span>';
      //   html += '  </li>';
      // }
      // $('.right').html(html);
      //******************************字符串拼接方式获取数据*******结束 */

      //*********使用arttemplate模板  获取数据，组装到页面***开始 */
      $('.right').html(template('contentTemplate', { courseList: dataa }));
      //*********使用arttemplate模板  获取数据，组装到页面***结束 */
      //初始化分页器
      $('.M-box3').pagination({
        pageCount: Math.ceil(num / pageSize), // 总页数
        showData: pageSize, //每页显示的条数
        //   // totalData   //数据总条数
        current: page, //当前第几页****用于给后台传参数使用
        jump: true, //
        coping: true, //是否开启首页和末页，值为boolean
        prevCls: 'prev', //上一页class
        nextCls: 'next', //下一页class
        // mode: 'fixed', //
        // count: 10, //	mode为unfixed时显示当前选中页前后页数，mode为fixed显示页码总数
        keepShowPN: 'true', //是否一直显示上一页下一页
        jumpIptCls: 'jump-ipt',
        jumpBtnCls: 'jump-btn', // 跳转按钮class
        jumpBtn: '起跳', //
        homePage: '首页', // 首页节点内容，默认为空
        endPage: '末页', // 尾页节点内容，默认为空
        prevContent: '上页', // 上一页节点内容
        nextContent: '下页', // 下一页节点内容
        callback: function(api) {
          initPageData(api.getCurrent(), $('.left li.active').attr('cid'));
        }
      }); // pagination
    } //success: function(dataa, status, xhr){}
  }); //ajax
} //function initPageData(page, cid) {}

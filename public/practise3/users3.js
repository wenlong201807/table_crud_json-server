// 默认每页显示14条数据
const dataNum = 14;
var curpage = 1;
$(function() {
  //alert('users');
  // 点击左侧的菜单项，获取不同类型的返回数据
  $('.menu').on('click', function() {
    $(this)
      .addClass('act')
      .siblings()
      .removeClass('act');
    initScreenData(1, $(this).attr('pid'));
  }); //  $('.menu').on('click', function(){})

  // 初始化页面数据******最开始***第一次渲染后台数据到页面上
  initScreenData(curpage, 1);

  // 删除功能函数调用
  deleteData();

  // 查询功能函数调用
  checkData();

  //  增加功能*****实现最简单的数据增加功能
  addData();

  // 修改原有数据操作****开始
  refixData();

  //************************* */

  // 模态框函数调用*******开始
  modelBox();

  //弹出模态框****修改使用
  bom();

  // 模态框中tab标签切换效果
  tabchang();

  checkbox();
}); //$(function() {})

// 全选与全部选
function checkbox() {
  // 全选与全不选操作

  /**为全选绑定点击事件*/
  $('#checkAll').on('change', function() {
    $('input[chil]').prop('checked', this.checked);
  });

  // 删除被打勾的对象
  $('.deleteAll').on('click', function() {
    // console.log(inpchecked);
    // console.log($('input:checked').attr('delid'));

    var temp = [];
    $('input.ckb_course:checked').each(function(index, item) {
      var hh = $(item).attr('delid');
      // 遍历选中的checkbox
      temp.push(
        $.ajax({
          url: '/api/course/' + hh,
          //data: { id: hh },
          type: 'DELETE',
          dataType: 'json'
        })
      );
    });

    $.when.apply(null, temp).done(function() {
      console.log('所有的都删除成功 ~！');
    });
  }); //$('.deleteAll').on('click',function(){})
} //function checkbox(){}

// 模态框函数功能*******开始
function modelBox() {
  $('.model').click(function() {
    $('.bg_model').show();
    $('body').css({ overflow: 'hidden' });
  });

  //模态框OK按钮点击事件
  $('.bg_model_close')
    .click(function() {
      $('.bg_model').hide(); //显示窗体的滚动条
      $('body').css({ overflow: 'visible' });
    })
    .hover(
      function() {
        $(this).css({ backgroundColor: 'red' });
      },
      function() {
        $(this).css({ backgroundColor: 'yellow' });
      }
    );
} //function modelBox(){}
// 模态框函数功能*******结束*****

// 模态框中的标签页***开始
function tabchang() {
  $('.choice_item').on('click', function() {
    index = $(this).index(); // 获取当前索引值
    //console.log(index);
    $(this)
      .addClass('green')
      .siblings()
      .removeClass('green');
    // 初始化，默认第一个显示
    // $('.choice_content').show();

    $('.choice_content')
      .eq(index)
      .show()
      .siblings()
      .hide();
  });
}
// 模态框中的标签页***结束

// 增加操作*****开始****
function addData() {
  $('.add').on('click', function() {
    // 显示模态框
    $('.bg_model').show(); //显示模态框
    $('body').css({ overflow: 'hidden' });
    // 显示添加部分的表格
    $('.choice_content')
      .eq(0)
      .show();
  }); //$('.add').on('click',function(){})
  // 最简单的数据体提交
  // $('#tj').on('click', function() {
  //   alert(';aaaaaa');
  //   alert(
  //     $(this)
  //       .siblings('.add_id')
  //       .val()
  //   );
  //   $.ajax({
  //     url: '/api/course',
  //     type: 'POST',
  //     data: {
  //       id: $(this)
  //         .siblings('.add_id')
  //         .val(),
  //       course_name: $(this)
  //         .siblings('.add_course_name')
  //         .val(),
  //       autor: $(this)
  //         .siblings('.add_autor')
  //         .val(),
  //       college: $(this)
  //         .siblings('.add_college')
  //         .val(),
  //       category_Id: $(this)
  //         .siblings('.add_category_Id')
  //         .val()
  //     },
  //     dataType: 'json',
  //     success: function(data) {
  //       console.log(data);
  //     }
  //   });
  // }); //$('.tj').on('click',function(){})

  // 点击添加**提交按钮**，提交添加表单
  $('#tj').on('click', function() {
    $.ajax({
      url: '/api/course',
      type: 'POST',
      data: $('#addform').serialize(),
      dataType: 'json',
      success: function(data) {
        console.log(data);
        alert('您的数据即将提交至数据管理中心，很高兴为您服务');
        // 重新加载页面数据
        initScreenData(1, $('.menu.act').attr('pid'));
        alert('数据保存成功');
      }
    }); // $.ajax({
  });
  // $('form').submit(function() {
  //   alert($(this).serialize());

  //   return false;
  // });
} //function addData(){}
// 增加操作*****结束****

// 修改原有数据操作****开始
function refixData() {
  //alert('refixData');
  // 如果弹出框的修改一栏显示，则点击提交。否则不能点击
  if ($('#xg').val() != '修改') {
    return;
  }

  $('.bg_model_submit').on('click', function() {
    let num = $('#xg')
      .siblings('.add_id')
      .val();
    alert('等待1秒钟，您即可查询刚修改的数据' + num);
    console.log(num);
    $.ajax({
      url: '/api/course/' + num,
      type: 'PUT',
      data: {
        course_name: $('#xg')
          .siblings('.add_course_name')
          .val(),
        autor: $('#xg')
          .siblings('.add_autor')
          .val(),
        college: $('#xg')
          .siblings('.add_college')
          .val(),
        category_Id: $('#xg')
          .siblings('.add_category_Id')
          .val()
      },
      dataType: 'json',
      success: function(data) {
        console.log(data);
        // 重新加载页面数据
        // initScreenData(api.getCurrent(), $('.menu.act').attr('pid'));
        initScreenData(curpage, $('.menu.act').attr('pid'));
        alert('数据保存成功');
        $('.bg_model').hide(); //显示窗体的滚动条
        $('body').css({ overflow: 'visible' });
        $('.update[cid=num]').html('编辑');
        $('.update[cid=num]')
          .parent()
          .parent()
          .css('backgroundColor', 'yellow');
      }
    }); //$.ajax({})
  });
}
// 修改原有数据操作***结束

// 弹出模态框****修改部分内容****
function bom() {
  $('.content_info').on('click', 'tr td .update', function(e) {
    // this 指向委托的对象 tr td .update
    $(this).html('保存');
    let $thisP = $(this).parent();
    $thisP.parent().css('backgroundColor', 'red');
    let update = confirm(
      '使用委托方式****修改****修改***数据来了,请做出正确的选择！！！'
    );
    // 显示模态框
    $('.bg_model').show(); //显示窗体的滚动条
    $('body').css({ overflow: 'hide' });
    // 默认显示修改一栏
    $('.choice_content')
      .eq(1)
      .show();
    // 把点击修改那一栏的对应值传递给弹出模态框中的修改一栏
    let $xg = $('#xg');

    console.log($xg);
    if ($xg.val() != '修改') {
      return;
    }
    alert($thisP.siblings('.val_id').html());
    let old_id = $xg.siblings('.add_id').val($thisP.siblings('.val_id').html());
    let new_autor = $xg
      .siblings('.add_autor')
      .val($thisP.siblings('.val_autor').html());
    let new_category_Id = $xg
      .siblings('.add_category_Id')
      .val($thisP.siblings('.val_category_Id').html());
    let new_college = $xg
      .siblings('.add_college')
      .val($thisP.siblings('.val_college').html());

    var new_course_name = $xg
      .siblings('.add_course_name')
      .val($thisP.siblings('.val_course_name').html());

    // 预留的最后一行***********在此之上填写内容
  }); //$('.content_info').on('click', 'tr td .update', function(e) {})
} //function bom(){

//******************************** */

//删除数据功能模块*****开始***同时删除多条信息没有实现？？？？
function deleteData() {
  // 当数据加载之后，才能删除，
  // 当数据查询成功之后，才能删除
  // 所以  必须现有数据再删除
  // 因此，，删除功能必须再写一层数据加载完之后   再进行删除操作

  // 使用事件代理方式，消除上面的多次调用

  // jQuery的代理事件写法
  $('.content_info').on('click', 'tr td .delete', function(e) {
    // this 指向委托的对象 tr td .delete
    let $this = $(this);
    // 使用事件代理之后，报错了！！！！
    console.log(e.target); //返回当前元素节点
    let val_ID = $this
      .parent('td')
      .siblings('.val_id')
      .html();
    var hh = confirm('您确定要删除编号为' + val_ID + '的数据库信息吗？');
    $.ajax({
      url: '/api/course/' + val_ID,
      type: 'DELETE',
      dataType: 'json',
      success: function(data, status, xhr) {
        // 重新加载页面数据
        initScreenData(curpage, $('.menu.act').attr('pid'));
      }
    });
  }); //$('.delete').on('click', function(){})
} //function  deleteData(){}
///  删除功能*****结束

// 查询数据功能模块******完成******
function checkData() {
  $('.check').on('click', function() {
    let checkID = parseInt($('.checkText').val());
    $('.checkText').val('');
    let CID;
    if (checkID >= 1000) {
      CID = checkID;
      // console.log(CID);
    } else {
      alert('请输入不小于1000的id值');
      $('.checkText').focus();
      $('.checkText').css('borderColor', 'red');
    }
    console.log(CID);
    $.ajax({
      url: '/api/course',
      data: 'id=' + CID,
      type: 'GET',
      dataType: 'json',
      success: function(data, status, xhr) {
        //console.log(data);
        //console.log(xhr);
        $('.content_info').html(
          template('contentTemplate', { dataList: data })
        );
        if (data == '') {
          alert('您所查询的数据不在数据库，请确认后再查找！');
        }
      }
    }); //$('.check').on('click', function(){}})
  }); // $.ajax({})
} //function  checkData(){}

// 页面渲染数据的功能模块
//  分别有  后台数据加载到浏览器，初始化页面标签和分液器三部分功能。
function initScreenData(pageNum, pid) {
  pageNum = pageNum || curpage || 1;

  // 页面出现时，渲染的ajax请求内容
  $.ajax({
    type: 'GET',
    url: '/api/course',
    data: {
      _page: pageNum,
      _limit: dataNum,
      category_Id: pid,
      _sort: 'id',
      _order: 'desc',
      autor_like: ''
    },
    dataType: 'json',
    success: function(data, status, xhr) {
      console.log(2);
      let nums = xhr.getResponseHeader('X-Total-Count');
      // 模板渲染数据的位置
      $('.content_info').html(template('contentTemplate', { dataList: data }));

      // 短路表达式
      // 初始化所有的tr行中的是否被选中，
      $('#checkAll').prop('checked') &&
        $('input[chil]').prop('checked', $('#checkAll').prop('checked'));

      // 删除数据操作，调用函数
      // 有数据才能删除，修改***因此，，需要再包一层，数据全部加载完之后，才能实现这两个操作。

      // 分液器的初始化
      $('.M-box3').pagination({
        pageCount: Math.ceil(nums / dataNum), // 总页数
        showData: dataNum, //每页显示的条数
        current: pageNum, //当前第几页****用于给后台传参数使用
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
          console.log(api.getCurrent());
          curpage = api.getCurrent();
          initScreenData(api.getCurrent(), $('.menu.act').attr('pid'));
        }
      }); // pagination
    } //success:function(data,status,xhr){}
  }); //$.ajax({})
  console.log(1);
} //function   initScreenData(page,pid){}

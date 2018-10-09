const pageData = 12;
var curpage = 1;

$(function() {
  // 初始化渲染数据到页面中
  // initDb(pageNum, pageData, cate_Id)
  initDb(curpage, pageData, 1);

  // 跳转到第几页
  $('#btnSelectPage').on('click', function() {
    var pageCount = $('#pages').pagination('getPagesCount');
    alert(pageCount);
    var navPage = $('#txtSelectPage').val();
    navPage = parseInt(navPage);
    if (navPage > 0 && navPage <= pageCount) {
      $('#pages').pagination('selectPage', navPage);
    }
    // $('#pages').pagination('prevPage');
  });

  // 点击左侧的菜单项，获取不同类型的返回数据
  $('.menu_item').on('click', function() {
    $(this)
      .addClass('acts')
      .siblings()
      .removeClass('acts');
    console.log($(this).attr('cate'));
    initDb(curpage, pageData, $(this).attr('cate'));
  }); //  $('.menu_item').on('click', function(){})

  // 关闭模态框
  $('.close').on('click', function() {
    $('.bg_model_add').fadeOut();
    $('.bg_model_amend').fadeOut();
    $('.bg_model_showhide').fadeOut();
    $('#cover_showhide').fadeOut();
    $('#cover_add').fadeOut();
    $('#cover_amend').fadeOut();
    $('body').css({
      overflow: 'visible'
    });
  });

  // 查看数据库全部信息，只分页显示，不做其他筛选
  $('#checkAll').on('click', function() {
    initDb(curpage, pageData);
    $('.menu_item').removeClass('acts');
  });

  // 显示隐藏一些列，
  initshowhide();

  // 模态框中数据增删改查
  init_model();

  // 添加数据
  init_add();

  // 删除数据
  init_delete();

  // 修改数据
  init_amend();

  // 查询数据
  init_check();

  // 删除被选中id 的部分 的所有对应的信息
  init_delete_checked();
}); //$(function(){})
//************函数调用区域结束******结束**************************** */

//**********功能函数区域*********开始********************** */

//****实现了简单的 */
//***功能模块化开始********* 初始化渲染数据到页面中
function initDb(pageNum, pageData, cate_Id) {
  // console.log('initinitDb');
  // console.log($('.menu_item.acts').attr('cate'));
  // 页面最开始加载时，将后台数据添加到页面中
  $.ajax({
    type: 'GET',
    url: '/api/copying',

    data: {
      _page: pageNum,
      _limit: pageData,
      category_Id: cate_Id,
      _sort: 'id',
      _order: 'desc'
     
    },
    dataType: 'json',
    success: function(data, status, xhr) {
      let TotalNum = xhr.getResponseHeader('X-Total-Count');
      console.log(TotalNum);
      console.log(data);
      console.log(data.length);
      // console.log(data[0].id);
      $('#database_info').html(template('database', { dbList: data }));

      // 分页部分***开始****
      $('#pages').pagination({
        items: Math.ceil(TotalNum / pageData), // 总页数
        itemsOnPage: pageData, //每页多少条信息
        currentPage: pageNum, // 第几页
        cssStyle: 'light-theme', // 分页的数字样式效果
        onPageClick: function(pageNum, e) {
          console.log(pageNum);
          console.log(pageData);
          curpage = pageNum;
          // console.log($('.menu_item.acts').attr('cate'));
          initDb(pageNum, pageData, $('.menu_item.acts').attr('cate'));
          //console.log(e.which());
        }
      }); // $('#pages').pagination({})
      // 分页部分***结束***
    } //success: function(data, status, xhr){}
  });
} //****功能模块化****结束****

//***功能模块化开始********* 模态框中数据增删改查
function init_model() {
  //console.log('init_model');
} //****功能模块化****结束****

//***功能模块化开始********* 添加数据****可以添加简单的***没有做校验
function init_add() {
  // console.log('init_add');
  $('#add').on('click', function() {
    $('.bg_model_add').fadeIn();
    $('#cover_add').fadeIn();
    $('body').css({
      overflow: 'hidden'
      // opacity: 0.7
    });
  }); //$('#add').on('click', function(){})

  // 点击****添加**提交**关闭模态框*****按钮。则发送后台数据到对应接口
  $('#add_send_close').on('click', function() {
    //  console.log('我要提交酷酷酷添加的数据了****添加***');
    $.ajax({
      // type: 'post',
      type: 'POST',
      url: '/api/copying',
      data: $('#add_content').serialize(),
      dataType: 'json',
      success: function(data) {
        console.log(data);
        if (data != '') {
          console.log('添加成功');
          // 关闭添加框和关闭模态框
          $('.bg_model_add').fadeOut();
          $('#cover_add').fadeOut();
          $('body').css({
            overflow: 'visible'
          });
          initDb(curpage, pageData, $('.menu_item.acts').attr('cate'));
        } else {
          var add_data_one_error_callback = confirm(
            '确定需要重新编辑这次错误提交信息吗？'
          );
        }
      }
    }); //$.ajax({})
  }); //$('#add_send').on('click',function(){})

  // 点击*添加**提交**继续添加**按钮**提交之后不会自动关闭模态框
  $('#add_send_continue').on('click', function() {
    console.log(
      '我要提交酷酷酷添加的数据了****添加**添加之后模态框不会主动关闭的*'
    );
    $.ajax({
      // type: 'post',
      type: 'POST',
      url: '/api/copying',
      data: $('#add_content').serialize(),
      dataType: 'json',
      success: function(data) {
        console.log(data.id);
        if (data != '') {
          console.log('添加成功');
          // 清空所有原有数据
          $('.add_id').val('');
          $('.add_ip').val('');
          $('.add_email').val('');
          $('.add_title').val('');
          $('.add_author').val('');
          $('.add_language').val('');
          $('.add_address').val('');
          $('.add_color').val('');
          $('.add_age').val('');
          $('.add_category_Id').val('');
          $('.add_lastDate').val('');
          $('.add_limit').val('');
        } else {
          var add_data_one_error_callback = confirm(
            '确定需要重新编辑这次错误提交信息吗？'
          );
        }
        initDb(curpage, pageData, $('.menu_item.acts').attr('cate'));
      } //success
    }); //$.ajax({})
  }); //$('#add_send_continue').on('click',function(){})
} //****功能模块化****结束****

//***功能模块化开始********* 删除数据
function init_delete() {
  // console.log('init_delete');

  $('#database_info').on('click', 'tr td a.delete', function() {
    let get_id = $(this).attr('aaa');
    // var is_delete = confirm('您确定要删除id值为  ' + get_id + '  吗？');
    if (confirm('您确定要删除id值为  ' + get_id + '  吗？')) {
      $.ajax({
        type: 'DELETE',
        url: '/api/copying/' + get_id,
        // data:'',
        dataType: 'json',
        success: function(data) {
          alert('恭喜您！ 您已经从数据库中剔除不需要的信息，谢谢使用！！！');
          initDb(curpage, pageData, $('.menu_item.acts').attr('cate'));
        }
      }); //$.ajax({})
    } else {
      alert('取消成功');
    }
  }); //$('#database_info').on('click', 'tr td a.delete', function() {})
} //****功能模块化****结束****

//***功能模块化开始********* 修改数据
function init_amend() {
  //console.log('init_amend');
  $('#database_info').on('click', 'tr td a.amend', function() {
    let same = $(this).parent();

    //显示修改模态框
    $('.bg_model_amend').fadeIn();
    $('#cover_amend').fadeIn();
    $('body').css({
      overflow: 'hidden'
      // opacity: 0.7
    });
    // 把数据库中原来的内容对应的传递给修改框中
    alert(same.siblings('.val_id').html());
    // $('.amend_id').val(same.siblings('.val_id').html());
    $('.amend_ip').val(same.siblings('.val_ip').html());
    $('.amend_email').val(same.siblings('.val_email').html());
    $('.amend_title').val(same.siblings('.val_title').html());
    $('.amend_author').val(same.siblings('.val_author').html());
    $('.amend_language').val(same.siblings('.val_language').html());
    $('.amend_address').val(same.siblings('.val_address').html());
    $('.amend_color').val(same.siblings('.val_color').html());
    $('.amend_age').val(same.siblings('.val_age').html());
    $('.amend_category_Id').val(same.siblings('.val_category_Id').html());
    $('.amend_lastDate').val(same.siblings('.val_lastDate').html());
    $('.amend_limit').val(same.siblings('.val_limit').html());

    // 修改之后，点击修改**提交**按钮****发送数据给数据库
    $('#amend_send').on('click', function() {
      $.ajax({
        type: 'PUT',
        url: '/api/copying/' + same.siblings('.val_id').html(),
        data: $('#amend_content').serialize(),
        dataType: 'json',
        success: function(data) {
          console.log('我是修改数据的回调函数');
          // 将数据全部重新加载到页面中
          initDb(curpage, pageData, $('.menu_item.acts').attr('cate'));
          // 修改成功之后，关闭模态框
          $('#cover_amend').fadeOut();
          $('body').css({
            overflow: 'visible'
          });
        }
      });
    }); //$('#amend_send').on('click',function(){})
  }); // $('#database_info').on('click', 'tr td a.amend', function() {})
} //****功能模块化****结束****

//***功能模块化开始********* 查询数据****
///*****无法查询新增加的数据 */
function init_check() {
  console.log('init_check');

  $('#check').on('click', function() {
    let get_id = parseInt($('#checkbox').val());
    $('#checkbox').val('');
    console.log('输入要查询的id为' + get_id);

    $.ajax({
      type: 'GET',
      url: '/api/copying?id=' + get_id,
      // data: 'id=' + get_id,//可以正常使用的
      dataType: 'json',
      success: function(data) {
        console.log('查询的 ' + get_id + ' 内容看这里');
        $('#database_info').html(template('database', { dbList: data }));
      }
    }); //$.ajax({})
  }); //$('#check').on('click',function(){})
} //****功能模块化****结束****

// 删除被选中id 的部分 的所有对应的信息
function init_delete_checked() {
  // console.log(
  //   '**function init_delete_checked() **删除被选中id 的部分 的所有对应的信息'
  // );
  // 当前页面是否全选中
  $('#delete_all').on('change', function() {
    $('input[dg]').prop('checked', this.checked);
  });
  // 删除被打钩的对象

  $('#delete_checked').on('click', function() {
    //   将被打钩的input框对应的id值获取，放在数组中
    var temp = [];
    $('input[dg]:checked').each(function(index, item) {
      var each_delete_id = $(item).attr('deleteid');
      $.ajax({
        url: '/api/copying/' + each_delete_id,
        //data: { id: each_delete_id },
        type: 'DELETE',
        async: false,
        dataType: 'json'
      }); //$.ajax({})
    });
    // 系列性操作，并在完成后 有一个回调函数，借助对象改变apply
    initDb(curpage, pageData, $('.menu_item.acts').attr('cate'));
  }); //$('#delete_checked').on('click',function(){})
} //function init_delete_checked(){})

//
function initshowhide() {
  // 点击showhide按钮   弹出选择层******
  $('#showhide').on('click', function() {
    alert('显示隐藏一些列');
    // 显示模态框，，，与弹出层
    $('.bg_model_showhide').fadeIn();
    $('#cover_showhide').fadeIn();
    $('body').css({
      overflow: 'hidden'
    });
    // 弹出层的复选框***默认被打勾了
    $('#showhide_content input[mrdg]').prop('checked', 'checked');
  }); //$('#showhide').on('click',function(){})
  // 点击***打勾显示****不打勾的就变黑色
  $('#dg_show').on('click', function() {
    $('#showhide_content input:checked').each(function(i, item) {
      var txt = $(item)
        .siblings('span')
        .text();
      $('#db_container>table tr th').each(function(i, item) {
        if ($(item).text() === txt) {
          thIndex = $(item).index(); // 要删除的第x列
          $('#db_container>table tr th')
            .eq(thIndex)
            .remove();
          $('#db_container>table tr td')
            .eq(thIndex)
            .remove();
        }
      });
    });

    // // 获得被打勾的 input中****showhide属性值
    // let se_id = $('input[mrdg]').attr('showhideid');
    // let se_ip = $('input[mrdg]').attr('showhideip');
    // let se_email = $('input[mrdg]').attr('showhideemail');
    // let se_title = $('input[mrdg]').attr('showhidetitle');
    // let se_author = $('input[mrdg]').attr('showhideauthor');
    // let se_language = $('input[mrdg]').attr('showhidelanguage');
    // let se_address = $('input[mrdg]').attr('showhideaddress');
    // let se_color = $('input[mrdg]').attr('showhidecolor');
    // let se_age = $('input[mrdg]').attr('showhideage');
    // let se_categoryId = $('input[mrdg]').attr('showhidecategoryId');
    // let se_lastDate = $('input[mrdg]').attr('showhidelastDate');
    // let se_limit = $('input[mrdg]').attr('showhidelimit');

    // alert(se_id); //id

    //  关闭弹出层，
    $('.bg_model_showhide').fadeOut();
    $('#cover_showhide').fadeOut();
    $('body').css({
      overflow: 'visible'
    });
  }); //$('#dg_show').on('click',function(){})

  // 给对应名字的标题加上黑色背景
  $('.yellow').on('click', function() {
    var index = $(this).index();
    $(this).toggleClass('black');
    //     $('tbody tr td').each(ind,val){
    // alert($(this))
    //     }
    $('#database_info tr').each(function(i, item) {
      $(item) // dom对象转换为jquery对象*****
        .find('td')
        .eq(index)
        .toggleClass('black');
    });
  }); // $('.yellow').on('click', function() {})

  // 关闭弹出层，
  $('.bg_model_showhide').fadeOut();
  $('#cover_showhide').fadeOut();
  $('body').css({
    overflow: 'visible'
  });
} //function initshowhide(){};

// 默认每页显示14条数据
const dataNum = 14;

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
  initScreenData(1, 1);

  // 点击查询按钮，依据输入查询框的id值，返回数据库相对相应的数据***开始
  //checkData();
  // 点击查询按钮，依据输入查询框的id值，返回数据库相对相应的数据****结束
 
  deleteData();
  //updataData();

  // 添加数据到数据库中
  //addData();
}); //$(function() {})

//删除数据功能模块
function deleteData() {
  ///  删除功能*****开始
  // jQuery的代理事件写法
  $('.content_info').on('click','tr td .delete',  function(e) {
    // this 指向委托的对象 tr td .delete
    let $this = $(this);
    console.log(e.target); //返回当前元素节点
    let val_ID = $this
    .parent('td')
      .siblings('.val_id')
      .html();
    // console.log(val_ID);
    alert('您确定要删除编号为' + val_ID + '的数据库信息吗？');
    $.ajax({
      url: '/api/course/' + val_ID,
      type: 'DELETE',
      dataType: 'json',
      success: function(data, xhr) {
        // console.log(data);
        $this.parent().parent().hide();
        // console.log($(this));
        let TotalNum = xhr.getResponseHeader('X-Total-Count');
        alert(TotalNum);
      }
    });
  }); //$('.delete').on('click', function(){})
  ///  删除功能*****结束
} //function  deleteData(){}

// 增加数据功能模块
function addData() {
  $('.add').on('click', function() {
    let $this = $(this);

    // 先做个判断，是否填写了需要添加的相关内容
    // 1. id值为1120之后的数字
    // 2. 每一项都不能为空值，若有空值，返回对应的提示信息
    // 3. 加密传输，如何实现
    // 4.添加成功，提示添加成功弹出消息，平且可以查看总数据，查询添加信息
    ///******************************** */
    //********************************** */
    // 先做个判断，是否填写了需要添加的相关内容
    let ID =
      parseInt($('.add_id').val()) > 1120
        ? parseInt($('.add_id').val())
        : false;
    let NAME =
      $('.add_course_name').val() == '' ? false : $('.add_course_name').val();
    let AUTOR = $('.add_autor').val() == '' ? false : $('.add_autor').val();
    let COLLEGE =
      $('.add_college').val() == '' ? false : $('.add_college').val();
    let CATEGORY_ID =
      parseInt($('.add_category_Id').val()) > 0 &&
      parseInt($('.add_category_Id').val()) < 7
        ? parseInt($('.add_category_Id').val())
        : false;
    if (!(ID && NAME && AUTOR && COLLEGE && CATEGORY_ID)) {
      $('.le_add_wrap').css('backgroundColor', 'yellow');
      alert('您还没有输入完整的数据，或者输入数据不合法，请重新输入');
      $this.css('backgroundColor', 'yellow');

      $this.html('新增');
      $('.add_id').css('borderColor', 'red');
      $('.add_id').focus();
      return;
    }

    $.ajax({
      url: '/api/course',
      type: 'POST',
      data: {
        id: ID,
        course_name: NAME,
        autor: AUTOR,
        college: COLLEGE,
        category_Id: CATEGORY_ID
      },
      dataType: 'json',
      success: function(data) {
        console.log(data);

        $('.content_info').html(
          template('contentTemplate', { dataList: data })
        );
        $this.css('backgroundColor', 'red');
        $this.html('添加');
      }
    }); //$.ajax({})
    // 添加成功之后，清空添加的输入文本框
    $('.add_id').val('');
    $('.add_course_name').val('');
    $('.add_autor').val('');
    $('.add_college').val('');
    $('.add_category_Id').val('');
    //#region old ajax
    // $this.html('保存');
    ///******************************** */
    //********************************** */
    // if ($this.html() == '保存') {
    //   $this.on('click', function() {
    //     $.ajax({
    //       url: '/api/course',
    //       type: 'POST',
    //       data: {
    //         id: ID,
    //         course_name: NAME,
    //         autor: AUTOR,
    //         college: COLLEGE,
    //         category_Id: CATEGORY_ID
    //       },
    //       dataType: 'json',
    //       success: function(data) {
    //         console.log(data);
    //         alert('您输入的数据合法，即将为您提交222');
    //         alert(
    //           '数据添加成功,您可以数据id值，查询新添加数据，也可以点击管理员查询所有数据'
    //         );
    //         $('.content_info').html(
    //           template('contentTemplate', { dataList: data })
    //         );
    //       }
    //     }); //$.ajax({})

    //     $this.html('添加');
    //   }); // $(this).on('click',function(){})
    // } else {
    //   alert('请先填写完整合法的新增数据信息***ajax提交失败***');
    // } //if($this.html() == '保存'){}else{}
    //#endregion
  });
} //function  addData(){}

// 修改数据功能模块
function updataData() {
  $(function() {
    $('#update').on('click', function(e) {
      let $update = $(this);
      $update.parent('tr').css('backgroundColor', 'red');
      if ($update.html() == '编辑') {
        alert('开始***update***');
      } else {
        alert('请保存数据');
      }

      $update.html('保存');

      // 当#update元素对应的内容为***保存***时，将数据发送给后台
      if ($update.html() == '保存') {
        $update.on('click', function() {
          // 写入新的val()
          let old_id = $update
            .siblings('.val_id')

            .val();
          let new_course_name = $update
            .siblings('.val_autor')

            .val();
          let new_autor = $update
            .siblings('.val_category_Id')

            .val();
          let new_college = $update
            .siblings('.val_college')

            .val();
          let new_category_Id = $update
            .siblings('.val_course_name')

            .val();
          console.log(new_category_Id);
          $.ajax({
            url: '/api/course/' + old_id,
            type: 'PUT',
            data: {
              course_name: new_course_name,
              autor: new_autor,
              college: new_college,
              category_Id: new_category_Id
            },
            dataType: 'json',
            success: function(data) {
              console.log(data);
              $update.parent('tr').css('backgroundColor', 'yellow');
              $update.html('编辑');
              alert('数据保存成功');
            }
          }); //$.ajax({})
        }); //$update.on('click',function(){})
      } // if ($update.html() == '保存') {}
    }); //$('#update').on('click', function(e){})
    //如果#update的值为编辑时，不能修改文本框的内容
    // *****没有实现这个功能******已经实现，注意this指向问题
    $('.val_autor').on('click', function() {
      let $this = $(this);
      if ($('#update').html() == '编辑') {
        alert('请先点击编辑按钮再修改内容');
        $this.children().blur();
        $this.parent().css('backgroundColor', 'red');
      } else {
        $this.children().focus();
      }
    }); // $('.val_autor').on('click', function(){})
  }); // $(function(){})
} //function  updataData(){}

// 查询数据功能模块******完成******
function checkData() {
  // jQuery的delegate写法
  $('.check').on('click', function() {
    $this = $(this);
    console.log($this);
    let check_val = $('.checkText').val();
let checkNum ,checkName,checkAutor,checkId,checkCol;
    if (typeof check_val == 'number' && checkID >=1000) {
 
    } else {
      alert('请输入不小于1000的id值,或者其他关键字***待添加***');
      $('.checkText').focus();
      $('.checkText').css('borderColor', 'red');
    }  
    $.ajax({
      url: '/api/course',
      // data: 'id=' + CID,
      data: {
        id=checkID,
        autor_like=checkID,
        category_Id=checkID,
        college_like=checkID,
        course_name_like=checkID
      },

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
    }); // $.ajax({})
  }); //$('.check').on('click', function(){}})
} //function  checkData(){}

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
      category_Id: pid,
      _sort: 'id',
      _order: 'desc',
      autor_like: ''
    },
    dataType: 'json',
    success: function(data, status, xhr) {
      let nums = xhr.getResponseHeader('X-Total-Count');
      // 模板渲染数据的位置
      $('.content_info').html(template('contentTemplate', { dataList: data }));

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

          initScreenData(api.getCurrent(), $('.menu.act').attr('pid'));
        }
      }); // pagination
    } //success:function(data,status,xhr){}
  }); //$.ajax({})
} //function   initScreenData(page,pid){}

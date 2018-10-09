let curPage = 1; // 定义当前页码
let dataNum = 10; // 定义每页有多少条数据
//模糊查询的分页
let ob_pageNum; // 定义当前页码
let ob_dataNum = 8; // 定义每页有多少条数据

$(function() {
  //alert('hhh');

  // 页面初始化加载后台数据
  console.log(curPage, dataNum); //1,10
  inintDatabase(curPage, dataNum, $('.cid.ccc').attr('aaa'));
  // 显示第几类型的数据
  $('.cid').on('click', function() {
    $(this)
      .addClass('ccc')
      .siblings()
      .removeClass('ccc');
    inintDatabase(curPage, dataNum, $(this).attr('aaa'));
  }); //$('.cid').on('click',function(){})

  // 添加数据
  initAddData();

  // 删除数据
  initDeleteData();

  // 修改数据
  initAmendData();

  // 查询数据
  initCheckData();

  //模糊查询
  initObscureQuery(ob_pageNum, ob_dataNum);

  // 模态框****初始化为隐藏**
  initModel();

  // 添加，修改时的校验
  // initTest();

  //批量删除****开始
  initDeleteCheckedData();

  // 点击模糊查询按钮***打开模态框
  $('.obscureQuery_choice').on('click', function() {
    // alert('123');
    // 显示模态框，并且显示添加数据的位置
    $('#bg_model').fadeIn();
    $('.c_tag')
      .eq(3)
      .addClass('yellow')
      .siblings()
      .removeClass('yellow');
    $('.c_text')
      .eq(3)
      .fadeIn()
      .siblings()
      .fadeOut();
  }); //$('.obscureQuery_choice').on('click',function(){})
}); //$(function() {})

//批量删除*功能函数***开始
function initDeleteCheckedData() {
  console.log('批量删除*功能函数***开始');
  // 全选与全部选
  $('#checkAllbox').on('change', function() {
    $('input.checkOnebox').prop('checked', this.checked);
  }); //$('.checkAllbox').on('change',function(){})
  $('.deleteChecked').on('click', function() {
    var temp = [];
    $('input.checkOnebox:checked').each(function(index, item) {
      var hh = $(item).attr('delid');
      // 遍历选中的checkbox
      temp.push(
        $.ajax({
          url: '/api/fifth/' + hh,
          //data: { id: hh },
          type: 'DELETE',
          dataType: 'json'
        })
      );
    });

    $.when.apply(null, temp).done(function() {
      console.log('所有的都删除成功 ~！');
    });
  }); //$('.deleteChecked').on('click',function(){})
} // function initDeleteCheckedData(){};

// 页面初始化加载后台数据****开始***
function inintDatabase(pageNum, dataNum, liter) {
  $.ajax({
    type: 'GET',
    url: '/api/fifth',
    data: {
      _page: pageNum,
      _limit: dataNum,
      _sort: 'id',
      _order: 'desc',
      sec_Id: liter
    },
    dataType: 'json',
    success: function(data, status, xhr) {
      let totalNum = xhr.getResponseHeader('X-Total-Count');
      console.log('我是xhr的总页数' + totalNum);
      console.log(data);
      console.log('我是data.length的总页数' + data.length);
      let Nums = data.length;
      console.log('我是data.length的总页数' + Nums);
      if (data != '') {
        console.log('数据已经从后台返回来了！放在哪里好呢？');
      }
      // 将后台数据返回****写在模板中***
      $('#tbody').html(template('templateFifth', { fifth: data }));
      // 分页***部分开始***
      $('#pageLocation').pagination({
        items: totalNum, //总条数
        //  items: Math.ceil(Nums / dataNum), //总条数除以每页多少条数据，等于多少页
        // items: 10,
        itemsOnPage: dataNum, //每页多少条数据
        cssStyle: 'light-theme',
        currentPage: pageNum, //当前第几页
        onPageClick: function(pageNum, e) {
          // 点击当前页**返回当前页的数据
          curPage = pageNum;
          inintDatabase(pageNum, dataNum, $('.cid.ccc').attr('aaa'));
        }
      });
    } //success:function(data){})
  }); // $.ajax({})
} // function inintDatabase(){})
// 页面初始化加载后台数据****结束***

// 查询数据****功能函数开始****
function initCheckData() {
  console.log('查询数据****功能函数开始***');
  // 依据id值查询某一条数据
  $('.query_id').on('click', function() {
    // 获得查询的id值
    let import_Id = parseInt($('.import_id').val());
    console.log(import_Id);
    if (import_Id >= 1000) {
      $.ajax({
        type: 'GET',
        url: '/api/fifth?id=' + import_Id,
        dataType: 'json',
        success: function(data) {
          console.log(data);
          // 将得到的数据放在模态框中***待续***
          $('#tbody').html(template('templateFifth', { fifth: data }));
          $('#tbody_query_id').html(template('templateFifth', { fifth: data }));
          //并且把查询框中的数字记录为placehoder,同时清空原来的数字
          $('.import_id').val('');
          $('.import_id').attr('placeholder', import_Id);
          // 显示模态框，并且显示查询结果位置
          $('#bg_model').fadeIn();
          $('.c_tag')
            .eq(0)
            .addClass('yellow')
            .siblings()
            .removeClass('yellow');
          $('.c_text')
            .eq(0)
            .fadeIn()
            .siblings()
            .fadeOut();
        } //success:function(data){})
      }); //ajax
    } else {
      alert('您所输入的id值' + import_Id + '不存在，请重新输入');
      $('.import_id').focus();
      $('.import_id').val('');
    }
  }); // $('#query_id').on('click',function(){})
} //function initCheckData(){};

// 删除数据****功能函数开始****
function initDeleteData() {
  console.log('删除数据****功能函数开始***');
  // 委托方式删除后来加载的和已经存在的数据***确保万无一失
  $('#tbody').on('click', 'tr td .deId', function() {
    let val_id = $(this).attr('deleteId');
    console.log(val_id);
    if (confirm('您真的要删除id值为' + val_id + '的数据吗？')) {
      alert('数据将被删除，删除操作成功');
      $.ajax({
        // type: 'GET',
        // url: '/api/fifth?id=' + val_id,
        type: 'DELETE',
        url: '/api/fifth/' + val_id,
        dataType: 'json',
        success: function(data) {
          console.log(data);
          if (data == {}) {
            //空对象？？？
            alert(val_id + '的数据删除成功');
            // 重新加载数据
            inintDatabase(curPage, dataNum, $('.cid.ccc').attr('aaa'));
          } else {
            alert('删除失败，请重新操作');
            inintDatabase(curPage, dataNum, $('.cid.ccc').attr('aaa'));
          }
          //
        }
      }); //ajax
    } else {
      alert('数据保留，删除操作取消');
    }
  });
} //function initDeleteData(){};

// 修改数据****功能函数开始****
function initAmendData() {
  console.log('修改数据****功能函数开始***');
  $('#tbody').on('click', 'tr td .amendId', function() {
    let val_amendId = $(this).attr('amendId');
    console.log(val_amendId);
    console.log(
      $(this)
        .parent()
        .siblings('.tpl_id')
        .html()
    );
    // 将原来的数据传递给修改框
    $('#fifth_amend_Form table tr td input[name="id"]').val(
      $(this)
        .parent()
        .siblings('.tpl_id')
        .html()
    );
    $('#fifth_amend_Form table tr td input[name="title"]').val(
      $(this)
        .parent()
        .siblings('.tpl_title')
        .html()
    );
    $('#fifth_amend_Form table tr td input[name="author"]').val(
      $(this)
        .parent()
        .siblings('.tpl_author')
        .html()
    );
    $('#fifth_amend_Form table tr td input[name="age"]').val(
      $(this)
        .parent()
        .siblings('.tpl_age')
        .html()
    );
    $('#fifth_amend_Form table tr td input[name="sec_Id"]').val(
      $(this)
        .parent()
        .siblings('.tpl_sec_Id')
        .html()
    );
    $('#fifth_amend_Form table tr td input[name="limit"]').val(
      $(this)
        .parent()
        .siblings('.tpl_limit')
        .html()
    );
    // 点击修改框中的修改提交按钮****，发送给后台
    $('#amend_submit').on('click', function() {
      $.ajax({
        type: 'PUT',
        url: '/api/fifth/' + val_amendId,
        data: $('#fifth_amend_Form').serialize(),
        dataType: 'json',
        success: function(data) {
          console.log(data);
          // 判断数据是否发送至后台

          alert('修改成功');

          // 将修改好的数据加入数据库，数据重新初始化加载
          inintDatabase(curPage, dataNum, $('.cid.ccc').attr('aaa'));
          // 关闭模态框
          initModel();
        } //success:function(data){}
      }); //ajax
    }); //$('#amend_submit').on('click',function(){})
    // 显示模态框，并且显示修改数据的位置
    $('#bg_model').fadeIn();
    $('.c_tag')
      .eq(5)
      .addClass('yellow')
      .siblings()
      .removeClass('yellow');
    $('.c_text')
      .eq(5)
      .fadeIn()
      .siblings()
      .fadeOut();
  }); // $('.amendId').on('click',function(){})
} //function initAmendData(){};

// 添加数据****功能函数开始****
function initAddData() {
  console.log('添加数据****功能函数开始***');
  $('.add_data').on('click', function() {
    // 显示模态框，并且显示添加数据的位置
    $('#bg_model').fadeIn();
    $('.c_tag')
      .eq(1)
      .addClass('yellow')
      .siblings()
      .removeClass('yellow');
    $('.c_text')
      .eq(1)
      .fadeIn()
      .siblings()
      .fadeOut();
    // 添加一次的数据
    $('#add_submit_once').on('click', function() {
      $.ajax({
        type: 'POST',
        url: '/api/fifth',
        data: $('#fifth_add_Form').serialize(),
        dataType: 'json',
        success: function(data) {
          console.log(data);
          // 将添加的数据，放入到初始化函数中
          alert(' 添加11111条数据时，成功的位置');
          if (data != '') {
            alert('数据添加成功***once');
            inintDatabase(curPage, dataNum, $('.cid.ccc').attr('aaa'));
            // 关闭模态框
            initModel();
          } else {
            alert('数据输入不合规范，请重新输入');
          }
        } //success:function(data){})
      });
    }); //  $('#add_submit_once').on('click',function(){})

    // 添加多条数据时，
    $('#add_submit_more').on('click', function() {
      alert('asldfkj ');
      $.ajax({
        type: 'POST',
        url: '/api/fifth',
        data: $('#fifth_add_Form').serialize(),
        dataType: 'json',
        success: function(data) {
          console.log(data);
          alert(' 添加多条数据时，成功的位置');
          // 将添加的数据，放入到初始化函数中
          if (data != '') {
            alert('数据添加成功*****more');
            inintDatabase(curPage, dataNum, $('.cid.ccc').attr('aaa'));
            // 清空input[clear]的val值
            $('#fifth_add_Form tbody tr td input[clear]').val('');
          } else {
            alert('数据输入不合规范，请重新输入');
          }
        } //success:function(data){})
      });
    }); //  $('#add_submit_more').on('click',function(){})
  }); // $('.add_data').on('click',function(){})
} //function initAddData(){};

//模糊查询**功能 函数***开始
function initObscureQuery(ob_pageNum, ob_dataNum) {
  // alert('模糊查询**功能 函数***开始');
  console.log('模糊查询**功能 函数***开始');

  $.ajax({
    type: 'post',
    url: '/api/fifth',
    data: {
      _page: ob_pageNum,
      _limit: ob_dataNum,
      _sort: 'id',
      _order: 'desc',
      // title_like: get_title,
      // author_like: get_author,
      age_like: get_age
      // limit_like: get_limit
    },
    dataType: 'json',
    success: function(data, status, xhr) {
      console.log(data);
      console.log(data.length);
      let obNums = xhr.getResponseHeader('X-Total-Count');
      obNums = parseInt(obNums);
      console.log(obNums);

      if (obNums > 8) {
        //显示分页器
        $('.ob_page').fadeIn();
      }

      // 分页***部分开始**5s*5
      console.log('obnums:%s, obdataNum:%s', obNums, ob_dataNum);
      $('#ob_pageLocation').pagination({
        items: obNums, //总条数除以每页多少条数据，等于多少页
        itemsOnPage: ob_dataNum, //每页多少条数据
        cssStyle: 'light-theme',
        currentPage: 1, //当前第几页
        onPageClick: function(ob_pageNum, e) {
          // 点击当前页**返回当前页的数据
          // ob_curPage = ob_pageNum;
          console.log(ob_pageNum);
          initObscureQuery(ob_pageNum, ob_dataNum);
        }
      });

      // 将后台数据返回****写在模板中***
      // inintDatabase(curPage, dataNum);
      $('#tbody').html(template('templateFifth', { fifth: data }));
    } //success:function(data){}
  }); //ajax
} //function initObscureQuery(){}

// 模态框初始化****功能函数**开始
function initModel() {
  console.log('模态框初始化****功能函数**开始');
  $('.c_tag').on('click', function() {
    let $index = $(this).index();
    $(this)
      .addClass('yellow')
      .siblings()
      .removeClass('yellow');
    $('.c_text')
      .eq($index)
      .fadeIn()
      .siblings()
      .fadeOut();
  }); //$('.c_tag').on('click',function(){})
  // 关闭模态框
  $('.close_model').on('click', function() {
    $('#bg_model').fadeOut();
  });
} //function initModel(){}

// 添加，修改时的校验***功能函数****开始***
// function initTest() {
//   console.log('添加，修改时的校验***功能函数****开始***');

//   $('#fifth_add_Form').validate({
//     debug: true, //参数为true，那么表单不会提交
//     rules: {
//       title: {
//         required: true,
//         minlength: 5
//       }
//     },
//     messages: {
//       title: '最少填写五个字',
//       author: '作者的名字必须填写',
//       age: '年龄在18-50岁之间',
//       sec_Id: '1-5之间',
//       limit: 'true**or**false'
//     }
//   });
// } //function initTest(){};

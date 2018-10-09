// 分页的*****每页多少条数据
let dataNum = 8;
// 分页的*****当前页码
let curNum = 1;
$(function() {
  // 初始化分页****数据渲染到页面，分页显示
  initPage(curNum, dataNum);

  // 增
  initAddData();

  // //删
  initDeleteData();

  // //改
  initAmendData();

  // //查
  initCheckData();

  // 模态框隐藏
  initModel();
}); //$(function(){})

// 初始化分页****数据渲染到页面，分页显示
function initPage(pageNum, dataNum) {
  $.ajax({
    type: 'GET',
    url: '/api/sixth',
    data: {
      _page: pageNum,
      _limit: dataNum,
      _sort: 'id',
      _order: 'desc'
    },
    dataType: 'json',
    success: function(data, status, xhr) {
      console.log(data);
      //总条数
      let totalNum = xhr.getResponseHeader('X-Total-Count');
      $('#append_tbody_tpl').html(template('sixth_tpl_code', { list: data }));
      // 分页显示
      $('#pageLocation').pagination({
        items: totalNum, //总条数
        itemsOnPage: dataNum, //每页多少条数据
        cssStyle: 'light-theme',
        currentPage: pageNum, //当前第几页
        onPageClick: function(pageNum, e) {
          // 点击当前页**返回当前页的数据
          curNum = pageNum;
          initPage(curNum, dataNum);
        }
      });
    } //success: function(data,status,xhr) {})
  }); //ajax
} //function initPage(){})

// 删
function initDeleteData() {
  $('#append_tbody_tpl').on('click', 'tr td.deletee', function() {
    let deleteid = $(this).attr('deleteid');
    console.log(deleteid);
    if (confirm('确定删除id为' + deleteid + '的数据吗？')) {
      $.ajax({
        url: '/api/sixth/' + deleteid,
        type: 'DELETE',
        dataType: 'json',
        success: function(data) {
          console.log(data);
          initPage(curNum, dataNum);
        }
      }); //ajax
    } else {
      return;
    }
  });
} //function initDeleteData(){}

// //查
function initCheckData() {
  $('#checkBtn').on('click', function() {
    var checkText = parseInt($('#checkBox').val());
    console.log(checkText);
    if (checkText < 1000 || typeof checkText != 'number') {
      $('#checkBox').val('');
      alert('不合法');
      return;
    }
    $.ajax({
      type: 'GET',
      url: '/api/sixth?id=' + checkText,
      dataType: 'json',
      success: function(data) {
        console.log(data);
        $('#append_tbody_tpl').html(template('sixth_tpl_code', { list: data }));
        $('#checkBox').val('');
      }
    }); //ajax
  }); // $('#checkBtn').on('click',function(){})
} //function initCheckData(){}

// 模态框隐藏
function initModel() {
  //初始化默认隐藏状态
  $('#bg_model').hide();
  //点击关闭按钮。隐藏模态框
  $('.close').on('click', function() {
    $('#bg_model').hide();
  });
} //function initModel(){};

// 增
function initAddData() {
  $('.addBtn').on('click', function() {
    $('#bg_model').fadeIn();
  });
  $('#addDataOne').on('click', function() {
    $.ajax({
      url: '/api/sixth',
      type: 'POST',
      data: $('#addDataForm').serialize(),
      dataType: 'json',
      success: function(data) {
        console.log(data);
        initPage(curNum, dataNum);
      }
    });
  });
} //  function initAddData(){}

// 改
function initAmendData() {
  console.log('xiugai');
  var ai, au, ag, ass;
  $('#append_tbody_tpl').on('click', 'tr td.amendBtn', function() {
    console.log($(this));
    ai = $(this).attr('ai');
    au = $(this).attr('au');
    ag = $(this).attr('ag');
    ass = $(this).attr('ass');
    console.log(ai);
    console.log(au);
    console.log(ag);
    console.log(ass);
    $('#amendDataForm p input[name="author"]').val(au);
    $('#amendDataForm p input[name="age"]').val(ag);
    $('#amendDataForm p input[name="sixth_Id"]').val(ass);
    $('#bg_model').fadeIn();
  }); // $('.amend').on('click',function(){})
  // 修改提交
  $('#amendDataOne').on('click', function() {
    $.ajax({
      url: '/api/sixth/' + ai,
      type: 'PUT',
      data: $('#amendDataForm').serialize(),
      dataType: 'json',
      success: function(data) {
        console.log(data);
        alert('hahahhah');
        initPage(curNum, dataNum);
      }
    });
  });
} //function initAmendData(){})

function addData() {
  // alert('我是增加数据的操作');

  $('.add').on('click', function() {
    $('.bg_model').show(); //隐藏窗体的滚动条
    $('body').css({ overflow: 'hidden' });
    alert('我是增加数据的操作');
    $('.choice_content')
      .eq(0)
      .show();
  }); //$('.add').on('click',function(){})
  // if ($('#tj').val() != '添加') {
  //   return;
  // }
  alert('我是添加部分，等会就可以提交***添加***了');

  alert('增加按钮已经点击');
  var isError = false;
  var errorMsg = '';

  let id = $('.add_id').val();
  if (id == '') {
    isError = true;
    errorMsg += 'id不合法';
  }

  let name = $('.add_course_name').val();
  if (name == '') {
    isError = true;
    errorMsg += ' name名字不合法';
  }
  let autor = $('.add_autor').val();
  if (autor == '') {
    isError = true;
    errorMsg += ' autor名字不合法';
  }
  let college = $('.add_college').val();
  if (college == '') {
    isError = true;
    errorMsg += ' college不合法';
  }
  let category_Id = $('.add_category_Id').val();
  if (category_Id == '') {
    isError = true;
    errorMsg += 'category_Id不合法';
  }

  let limit = $('.add_limit').val();
  if (limit == '') {
    isError = true;
    errorMsg += 'limit不合法';
  }

  if (isError) {
    alert(errorMsg);
    return;
  }

  alert('我是增加数据的**请求发起增加请求***');
  $('.bg_model_submit').on('click', function() {
    $.ajax({
      url: '/api/course',
      type: 'POST',
      data: {
        id: id,
        course_name: name,
        autor: autor,
        college: college,
        category_Id: category_Id
        //  date: date,
        // limit: limit
      },
      dataType: 'json',
      success: function(data) {
        console.log(data);
        alert('您的数据即将提交至数据管理中心，很高兴为您服务');
        // 重新加载页面数据
        initScreenData(1, $('.menu.act').attr('pid'));
        alert('数据保存成功');
      }
    }); // $.ajax({
  }); //$('.bg_model_submit').on('click',function(){})

  // 添加成功之后，清空添加的输入文本框
  $('.add_id').val('');
  $('.add_course_name').val('');
  $('.add_autor').val('');
  $('.add_college').val('');
  $('.add_category_Id').val('');
  // $('.add_limit').val('');
} //function addData() {}
// 增加操作*****结束

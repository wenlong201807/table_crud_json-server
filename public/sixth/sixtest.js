$().ready(function() {
  // 在键盘按下并释放及提交后验证提交表单
  $('#addDataForm').validate({
    debug: true,
    rules: {
      author: 'required',
      age: 'required',
      sixth_Id: 'required'
    }, // rules
    messages: {
      author: '请输入您的名字',
      age: {
        required: '请输入您的年龄',
        minlength: '请输入真实的年龄'
      }, //messages
      sixth_Id: {
        required: '请输入正确的id',
        minlength: '请输入1-5的数字'
      }
    }
  }); // $("#addDataForm").validate({})
}); // $().ready(function () {})

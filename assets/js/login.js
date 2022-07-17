$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })
    // 获取layui的form对象 自定义校验规则
    var form = layui.form
    // 获取通知对象
    var layer = layui.layer
    form.verify({
        'pwd': [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ] 
    //     'repwd': function(value) {
    //         // 通过形参拿到的是确认密码框中的内容
    //         // 还需要拿到密码框中的内容
    //         // 然后进行一次等于的判断
    //         // 如果判断失败,则return一个提示消息即可
    //         var pwd = $('.reg-box [name=password]').val()
    //         if (pwd !== value) {
    //           return '两次密码不一致！'
    //         }
    //       }
      })
    //   监听 注册表单的提交时间
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        $.post('/api/reguser',
        {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()},
        function (res) {
            // 判断结果
            if (res.status != 0) {
                return layer.msg(res.message)
            }
            // 成功
            layer.msg('注册成功，请登录！')
            // 跳转登陆
            $('#link_login').click()
        })       
    }) 
    // 登陆ajax请求
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url:'/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败!')
                }
                layer.msg('登录成功')
                //储存返回的token数值
                localStorage.setItem('token',res.token)
                // 页面跳转
                location.href = '/index.html'
            }
        })
    })
}) 
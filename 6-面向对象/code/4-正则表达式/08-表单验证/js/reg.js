window.addEventListener("load", function() {
    // 0. 检测的函数
    function regCheck(ele, reg) {
        ele.onblur = function() {
            if (reg.test(this.value)) {
                this.nextElementSibling.className = "success";
                this.nextElementSibling.innerHTML = "<i class='success_icon'></i> 恭喜您输入正确"
            } else {
                this.nextElementSibling.className = "error";
                this.nextElementSibling.innerHTML = "<i class='error_icon'></i> 格式不正确，请重新输入"
            }
        };
    }
    // 1. 手机号
    var phone_reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    var phone = document.querySelector("#tel");
    regCheck(phone, phone_reg);

    // 2. QQ
    var qq_reg = /^[1-9]\d{4,}$/
    var qq = document.querySelector("#qq");
    regCheck(qq, qq_reg);

    // 3. 昵称
    var nc_reg = /^[\u4e00-\u9fa5]{2,8}$/
    var nc = document.querySelector("#nc");
    regCheck(nc, nc_reg);

    // 4. 验证码
    var msg_reg = /^\d{6}$/
    var msg = document.querySelector("#msg");
    regCheck(msg, msg_reg)

    // 5. 密码
    var pwd_reg = /^[a-zA-Z0-9_-]{6,16}$/;
    var pwd = document.querySelector("#pwd");
    regCheck(pwd, pwd_reg);

    // 6. 确认密码
    var surepwd = document.querySelector("#surepwd");
    surepwd.onblur = function() {
        if (pwd.value.length >= 0 && surepwd.value == pwd.value) {
            this.nextElementSibling.className = "success";
            this.nextElementSibling.innerHTML = "<i class='success_icon'></i> 恭喜您输入正确"
        } else {
            this.nextElementSibling.className = "error";
            this.nextElementSibling.innerHTML = "<i class='error_icon'></i> 两次密码输入不正确，请重新输入"
        }
    }

})
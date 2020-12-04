let vue = new Vue({
    el: '#app',
    data() {
        // 邮箱正则
        const mailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

        let validateUserName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'));
            } else if (value.length < 6 ){
                callback(new Error('请输入至少6位的用户名'))
            }
            else {
                callback();
            }
        };
        let validateEmail = (rule, value, callback) => {
            if (!mailReg.test(value)) {
                callback(new Error('请输入正确的邮箱'));
            }  else {
                callback();
            }
        };
        return {
            ruleForm: {
                userName: '',
                userEmail: '',
                userDesc: ''
            },
            rules: {
                userName: [{ validator: validateUserName, trigger: 'change',required: true }],
                userEmail: [{ validator: validateEmail, trigger: 'change' ,required: true}],
            },
            layout: {
                labelCol: { span: 4 },
                wrapperCol: { span: 14 },
            },
        };
    },
    methods: {
        // 表单提交
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    alert('注册成功!密码已经发送到您的邮箱，请注意查收');
                } else {
                    console.log('提交失败');
                    return false;
                }
            });
        },
        // 重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    }
})
let vue = new Vue({
    el: '#app',
    data() {
        return {
            form: {
                fromNumber: '',                     // 评审编号
                name: '',                           // 姓名
                age: '',                            // 年龄
                positionTitle: '',                  // 单位职称
                applyPositionMajor: '',             // 申报职称专业
                applyMajor: '',                     // 申报人所属专业
                isNormal: false,                    // 是否具备破格条件
                education: '',                      // 学历条件
                year: '',                           // 任工程师年限
                continuingEducation: '',            //继续教育
                political: '',                      // 政治思想条件
                review: {
                    // 评阅
                    content: 'A级',                  // 内容完整性
                    rule: 'A级',                     // 填写规范性
                    attitude: 'A',                  // 申报态度评价
                    performance: '',                // 能力业绩条件
                    result: '',                     // 业绩成果条件
                    book: '',                       // 论文著作条件
                    opinion: true,                  // 专家意见
                    acceptResult: [],               // 同意理由
                    baseAcceptResult: []            // 基本同意理由
                }
            },
            options: [
                {
                    label: 'A级标准',
                    value: 'A',
                    children:[
                        {
                            label: 'A',
                            value: 'A'
                        },
                        {
                            label: 'A+',
                            value: 'A+'
                        }
                    ]
                },
                {
                    label: 'B级标准',
                    value: 'B',
                    children:[
                        {
                            label: 'B',
                            value: 'B'
                        }
                    ]
                },
                {
                    label: 'C级标准',
                    value: 'C',
                    children:[
                        {
                            label: 'C',
                            value: 'C'
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        },
        handleChange(value){
            alert(`当前选择了${value[1]}`)
        }
    }
    ,
    mounted: function () {
        // 当页面被挂载
        // 模拟网络请求加载必要的信息
        const normal = 'AS4H4H498UIZ1894X54894TY' //正常编号
        const unNormal = 'BS4H4H498UIZ1894X54894TY' //破格编号

        // 模拟请求数据中 文本
        for(let i in this.form){
            if (i === 'review') continue;
            this.form[i] = '请求网络中....'
        }

        setTimeout(() => {
            this.form.fromNumber = normal
            this.form.name = '王武'
            this.form.age = 29
            this.form.positionTitle = '中级工程师'
            this.form.applyPositionMajor = '工程造价'
            this.form.applyMajor = '工程造价'
            this.form.political = '1' // 单位年审
            this.form.education = '4' //大专
            this.form.year = 8
            this.form.isNormal = true // 具备破格条件
            this.form.continuingEducation = '暂无'
        }, 2000) //延迟2s加载数据
    },
    computed: {
        applyType: function () {
            if (this.form.fromNumber.substring(0, 1) === 'A') {
                return '正常申报'
            } else if (this.form.fromNumber.substring(0, 1) === 'B') {
                return '破格申报'
            }
        }
    }
})
// 获取对应组件

/******************************************** 模态框 ********************************************/

let btn_modalSubmit = document.getElementsByClassName('modal')[0].getElementsByClassName('footer')[0].getElementsByTagName('button')[0]
let btn_modalCancel = document.getElementsByClassName('modal')[0].getElementsByClassName('footer')[0].getElementsByTagName('button')[1]

/********************************************  结束  ********************************************/

/********************************************  全局  ********************************************/

// 添加按钮
let btn_globalAdd = document.getElementById('add')
// 删除按钮
let btn_globalDelete = document.getElementById('delete')
// 表格
let table_tbody = document.getElementsByTagName('table')[0].getElementsByTagName('tbody')[0]
// 底部信息
let pagination_info = document.getElementsByClassName('footer-group')[0].getElementsByClassName('info')[0]

/********************************************   结束  *******************************************/

/******************************************** 其他定义 ********************************************/

// 分页对象
let pagination = {
    current: 0,        // 当前的页数
    size: 0,            // 当前每页显示的数量
    total: 0,           // 当前数据的总数
    hasNextPage: false, // 是否有下一页
    hasPrePage: false,  // 是否有上一页
    totalPage: 0        // 总页数
}

// 当前表格的数据对象
let data = []

/********************************************* 结束 *********************************************/



// 生成表格的数据
const num = 50
for (let i = 0; i < num; i++) {
    let obj = {
        id: i+1,
        studentId: `918230101${i>10? i : '0'+i}`,
        studentName: getName(),
        college: '人工智能与大数据学院',
        major: '大数据',
        grade: '2018',
        class: '1班',
        age: '20'
    }
    data.push(obj)
}
// 设置当前分页信息
pagination.current = 1 // 默认为第一页
pagination.size = 10   // 每页默认显示10个
pagination.total = data.length // 设置分页对象的总数
if (pagination.total / pagination.size !== 0) {
    pagination.hasNextPage = true
}
pagination.hasPrePage = false
pagination.totalPage = pagination.total / pagination.size


window.onload = function () {
    // 页面加载完毕
    // console.log(data)
    // console.log(pagination)
    console.log(table_tbody)
    // 加载首页表格数据
    loadData()
    // 设置底部信息
    setInfo()
}


/********************************************* utils function *********************************************/

function getName() {
    const familyNames = ["赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈",
        "褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许",
        "何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏",
        "陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章",
        "云", "苏", "潘", "葛", "奚", "范", "彭", "郎", "鲁", "韦",
        "昌", "马", "苗", "凤", "花", "方", "俞", "任", "袁", "柳",
        "酆", "鲍", "史", "唐", "费", "廉", "岑", "薛", "雷", "贺",
        "倪", "汤", "滕", "殷", "罗", "毕", "郝", "邬", "安", "常",
        "乐", "于", "时", "傅", "皮", "卞", "齐", "康", "伍", "余",
        "元", "卜", "顾", "孟", "平", "黄", "和", "穆", "萧", "尹"];
    const givenNames = ["子璇", "淼", "国栋", "夫子", "瑞堂", "甜", "敏", "尚", "国贤", "贺祥", "晨涛",
        "昊轩", "易轩", "益辰", "益帆", "益冉", "瑾春", "瑾昆", "春齐", "杨", "文昊",
        "东东", "雄霖", "浩晨", "熙涵", "溶溶", "冰枫", "欣欣", "宜豪", "欣慧", "建政",
        "美欣", "淑慧", "文轩", "文杰", "欣源", "忠林", "榕润", "欣汝", "慧嘉", "新建",
        "建林", "亦菲", "林", "冰洁", "佳欣", "涵涵", "禹辰", "淳美", "泽惠", "伟洋",
        "涵越", "润丽", "翔", "淑华", "晶莹", "凌晶", "苒溪", "雨涵", "嘉怡", "佳毅",
        "子辰", "佳琪", "紫轩", "瑞辰", "昕蕊", "萌", "明远", "欣宜", "泽远", "欣怡",
        "佳怡", "佳惠", "晨茜", "晨璐", "运昊", "汝鑫", "淑君", "晶滢", "润莎", "榕汕",
        "佳钰", "佳玉", "晓庆", "一鸣", "语晨", "添池", "添昊", "雨泽", "雅晗", "雅涵",
        "清妍", "诗悦", "嘉乐", "晨涵", "天赫", "玥傲", "佳昊", "天昊", "萌萌", "若萌"];
    return `${familyNames[Math.floor(Math.random() * familyNames.length)]}${givenNames[Math.floor(Math.random() * givenNames.length)]}`

}

/**
 *  填充数据
 */
function insertData(obj) {
    let tr = document.createElement('tr')
    let td = document.createElement('td')
    let input = document.createElement('input')
    input.setAttribute('type', 'checkbox')
    td.appendChild(input)
    // 为表格添加第一列
    tr.appendChild(td)
    // 为表格添加第二列
    td = document.createElement('td')
    td.innerText = obj.id
    tr.appendChild(td)
    // 为表格添加第三列
    td = document.createElement('td')
    td.innerText = obj.studentId
    tr.appendChild(td)
    // 为表格添加第四列
    td = document.createElement('td')
    td.innerText = obj.studentName
    tr.appendChild(td)
    // 为表格添加第五列
    td = document.createElement('td')
    td.innerText = obj.college
    tr.appendChild(td)
    // 为表格添加第六列
    td = document.createElement('td')
    td.innerText = obj.major
    tr.appendChild(td)
    // 为表格添加第七列
    td = document.createElement('td')
    td.innerText = obj.grade
    tr.appendChild(td)
    // 为表格添加第八列
    td = document.createElement('td')
    td.innerText = obj.class
    tr.appendChild(td)
    // 为表格添加第九列
    td = document.createElement('td')
    td.innerText = obj.age
    tr.appendChild(td)
    // 为表格添加操作列
    td = document.createElement('td')
    td.innerHTML = `
    <div class="operation flex f-al-c f-j-c">
      <a href="JavaScript:;" style="margin-right: 10px">查看</a>
      <a href="JavaScript:;">修改</a>
    </div>
    `
    tr.appendChild(td)
    console.log(tr)
    // 在表格中插入单行
    table_tbody.appendChild(tr)
}


/**
 * 设置底部信息
 */
function setInfo(){
    pagination_info.innerText = `第${pagination.current}页 / 共${pagination.totalPage}页,共${pagination.total}条,(每页显示${pagination.size}条)`
}


/**
 * 加载数据
 */
function loadData(current = 1){
    if (current === 1){
        for (let i = 0 ; i < pagination.size ; i++){
            insertData(data[i])
        }
    }else{
        // 开始计算开始的count数
        const start = (pagination.current - 1) * pagination.size
        const end = start + pagination.size
        // 渲染表格数据
        for (let i = start ; i < end ; i++){
            insertData(data[i])
        }
    }

}

/**
 * 翻页 -> 上一页
 */
function prePage(){
    // 判断是否有上一页，没有则阻断操作
    if (pagination.hasPrePage === false) return
    // 具备上一页，则执行翻页操作
    pagination.current --
    // 重新渲染表格数据
    table_tbody.innerHTML = ''
    loadData(pagination.current)
    // 重新计算分页对象
    calcPagination()
    // 设置底部信息
    setInfo()
}


/**
 * 翻页 -> 下一页
 */
function nextPage(){
    // 判断是否有下一页，没有则阻断操作
    if (pagination.hasNextPage === false) return
    // 具备上一页，则执行翻页操作
    pagination.current ++
    // 重新渲染表格数据
    table_tbody.innerHTML = ''
    loadData(pagination.current)
    // 重新计算分页对象
    calcPagination()
    // 设置底部信息
    setInfo()
}

/**
 * 重新计算分页对象
 */
function calcPagination(){
    if (pagination.current === pagination.totalPage){
        // 当前为最后一页
        pagination.hasPrePage = true
        pagination.hasNextPage = false
    }else if (pagination.current === 1){
        // 当前为首页
        pagination.hasNextPage = true
        pagination.hasPrePage = false
    }else{
        // 当前为中间页
        pagination.hasPrePage = true
        pagination.hasNextPage = true
    }

}
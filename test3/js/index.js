/******************************************** 模态框 ********************************************/

// 模态框标题
let modal_title = document.getElementById('modal-title')
// 模态框左侧按钮
let btn_modal_left = document.getElementById('modal-btn-left')
// 模态框右侧按钮
let btn_modal_right = document.getElementById('modal-btn-right')

let modal_container = document.getElementsByClassName('modal-container')[0]

function reloadModal() {
    modal_title = document.getElementById('modal-title')
    btn_modal_left = document.getElementById('modal-btn-left')
    btn_modal_right = document.getElementById('modal-btn-right')
    modal_container = document.getElementsByClassName('modal-container')[0]
    // 模态框中取消按钮监听事件
    btn_modal_right.addEventListener('click', () => {
        // 当取消按钮被点击
        modal_container.classList.add('hide')
        // 清理
        clear()
    })
}

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
// 选中全部
let table_selectAll = document.getElementById('selectAll')

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

// 当前选中的数据id集
let selectsIds = []

/********************************************* 结束 *********************************************/


/********************************************* 预处理 *********************************************/
// 生成表格的数据
const num = 79
for (let i = 0; i < num; i++) {
    let obj = {
        id: i + 1,
        studentId: `918230101${i >= 10 ? i : '0' + i}`,
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
pagination.totalPage = Number(Math.ceil(pagination.total / pagination.size))

/***************************************************************************************************/


/**
 * 页面加载完毕
 */
window.onload = function () {
    // 页面加载完毕
    // console.log(data)
    // console.log(pagination)
    // 加载首页表格数据
    loadData()
    // 设置底部信息
    setInfo()
}


/********************************************* utils function *********************************************/


/**
 * 去除数组中的空值
 * @param array 需要被处理的数组
 * @returns {*}
 */
function trimSpace(array){
    for(let i = 0 ;i<array.length;i++)
    {
        if(array[i] == " " || array[i] == null || typeof(array[i]) == "undefined")
        {
            array.splice(i,1);
            i= i-1;

        }
    }
    return array;
}


/**
 * 取随机名字
 * @returns {string}
 */
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
    if (obj === undefined) return
    let tr = document.createElement('tr')
    let td = document.createElement('td')
    let input = document.createElement('input')
    input.setAttribute('type', 'checkbox')
    input.addEventListener('click',function (event){
        // 绑定监听对象
        let id = this.parentNode.parentNode.children[1].innerHTML
        if (event.target.checked){
            // 当单条被选中时
            selectsIds.push(id)
            console.log('选中了')
            console.log(selectsIds)
        }else{
            // 进行删除
            for (let i in selectsIds){
                if (selectsIds[i].id === id){
                    // 当前id相同则删除
                    selectsIds.splice(i,1)
                }
            }
            console.log('取消了')
            console.log(selectsIds)
        }
    })
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
    /*td.innerHTML = `
    <div class="operation flex f-al-c f-j-c">
      <a href="JavaScript:;" style="margin-right: 10px" onclick="bindModalWatch()">查看</a>
      <a href="JavaScript:;">修改</a>
    </div>
    `*/
    let div = document.createElement('div')
    div.classList.add('operation', 'flex', 'f-al-c', 'f-j-c')
    let watch = document.createElement('a')
    watch.setAttribute('href', 'JavaScript:;')
    watch.setAttribute('style', 'margin-right: 10px')
    watch.addEventListener('click', () => bindModalWatch(obj)) // 绑定事件
    watch.innerText = '查看'
    let alter = document.createElement('a')
    alter.setAttribute('href', 'JavaScript:;')
    alter.addEventListener('click', () => bindModalAlter(obj)) // 绑定事件
    alter.innerText = '修改'
    div.appendChild(watch)
    div.appendChild(alter)
    td.appendChild(div)
    tr.appendChild(td)
    // 在表格中插入单行
    table_tbody.appendChild(tr)
}


/**
 * 设置底部信息
 */
function setInfo() {
    console.log('当前页数:' + pagination.current)
    pagination_info.innerText = `第${pagination.current}页 / 共${pagination.totalPage}页,共${pagination.total}条,(每页显示${pagination.size}条)`
}


/**
 * 加载数据
 * 默认加载第一页
 */
function loadData(current = 1) {
    // 清空数据
    table_tbody.innerHTML = ''
    if (current === 1) {
        for (let i = 0; i < pagination.size; i++) {
            insertData(data[i])
        }
    } else {
        // 开始计算开始的count数
        let start = (pagination.current - 1) * pagination.size
        let end = start + pagination.size
        // 进行边界判断
        if (end > pagination.total) end = pagination.total
        // 渲染表格数据
        for (let i = start; i < end; i++) {
            insertData(data[i])
        }
    }

}

/**
 * 翻页 -> 上一页
 */
function prePage() {
    // 判断是否有上一页，没有则阻断操作
    if (pagination.hasPrePage === false){
        alert('当前已经没有上一页了！')
        return
    }
    // 重置选择状态
    resetSelectAllStatus()
    // 具备上一页，则执行翻页操作
    pagination.current--
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
function nextPage() {
    // 判断是否有下一页，没有则阻断操作
    if (pagination.hasNextPage === false){
        alert('当前已经没有下一页了！')
        return
    }
    // 重置选择状态
    resetSelectAllStatus()
    // 具备上一页，则执行翻页操作
    pagination.current++
    // 重新渲染表格数据
    table_tbody.innerHTML = ''
    loadData(pagination.current)
    // 重新计算分页对象
    calcPagination()
    // 设置底部信息
    setInfo()
}

/**
 * 跳转页面
 * @param page
 */
function changePage(page){
    if (!page) return
    // 重置选择状态
    resetSelectAllStatus()

    pagination.current = page
    // 重载数据
    loadData(pagination.current)
    // 重新计算分页对象
    calcPagination()
    // 设置底部信息
    setInfo()
}


/**
 * 重新计算分页对象
 */
function calcPagination() {
    // 设置总数
    pagination.total = data.length
    // 重新计算总页数
    pagination.totalPage = Number(Math.ceil(pagination.total / pagination.size))

    if (pagination.current === pagination.totalPage) {
        // 当前为最后一页
        pagination.hasPrePage = true
        pagination.hasNextPage = false
    } else if (pagination.current === 1) {
        // 当前为首页
        pagination.hasNextPage = true
        pagination.hasPrePage = false
    } else {
        // 当前为中间页
        pagination.hasPrePage = true
        pagination.hasNextPage = true
    }

}

/*****************************************************************************************************************/

/****************************************** 全局通用事件绑定 ********************************************************/

// 新增按钮监听事件
btn_globalAdd.addEventListener('click', () => {
    // 当新增按钮被点击
    // 重新绑定模态框内容
    bindModalAdd()
    modal_container.classList.remove('hide')
})
// 模态框中取消按钮监听事件
btn_modal_right.addEventListener('click', () => {
    // 当取消按钮被点击
    modal_container.classList.add('hide')
    // 清理
    clear()
})
// 全部选中被选中
table_selectAll.addEventListener('click',(event)=>{
    if(event.target.checked){
        // 当前被选中
        selectAll() // 选中所有
    }else{
        // 重置当前状态
        console.log('被取消')
        resetSelectAllStatus()
    }
})
// 删除按钮监听事件🥰
btn_globalDelete.addEventListener('click',()=>{
    // 当删除按钮被单击
    if (selectsIds.length === 0 ){
        alert('请选择删除的项，当前选中为空！')
        return
    }
    if (confirm('确认删除数据吗？')){
        // 点击了确认
        deleteData() // 删除操作
    }
})
/*****************************************************************************************************************/

/****************************************** 特定逻辑处理 ********************************************************/

/**
 * 绑定新增模态框处理
 */
function bindModalAdd() {
    modal_title.innerText = '新增学生信息'
    btn_modal_left.innerText = '提交'
    btn_modal_left.addEventListener('click',addInfo)
}

/**
 * 处理添加逻辑
 */
function addInfo() {
    // 计算新的序号
    let id = data.length + 1
    // 构建data的item对象
    let obj = {id: id}
    // 获取info信息
    let labels = document.getElementsByClassName('modal')[0].getElementsByClassName('content')[0].getElementsByTagName('label')
    for (let i = 0; i < labels.length; i++) {
        let k = labels[i].getElementsByTagName('input')[0].getAttribute('id')
        let v = labels[i].getElementsByTagName('input')[0].value
        obj[k] = v
    }
    // 检查数据是否合法
    if (!checkObj(obj)) return
    // 隐藏模态框
    modal_container.classList.add('hide')
    // 将新对象压入data中
    data.push(obj)
    // 重新计算分页对象
    calcPagination()
    // 跳转到最后一页
    changePage(pagination.totalPage)
    // 清理
    clear()
}

/**
 * 检验对象是否合法
 * @param obj
 */
function checkObj(obj){
    console.log(obj)
    // 首先遍历判断内容是否为空
    for (let i in obj){
        if (obj[i].length === 0){
            alert('内容不能为空')
            return false
        }
    }
    // 合法性校验
    if (!/^\d{11}$/g.test(obj.studentId)){
        alert('学号必须为11位数字')
        return false
    }
    if (!/[\u4e00-\u9fa5]{2,}/g.test(obj.studentName)){
        alert('姓名长度必须大于两个字符')
        return false
    }
    if (!/[\u4e00-\u9fa5]{4,}/g.test(obj.college)){
        alert('学院名必须大于四个字符')
        return false
    }
    if (!/^\d{4}$/g.test(obj.grade)){
        alert('年级必须为长度为4的数字，如2018')
        return false
    }
    if (!/^\d{2}$/g.test(obj.age) && obj.age > 80 && age < 16){
        alert('年龄不合法，请输入正确的年龄')
        return false
    }
    return true



}


/**
 * 绑定查看模态框处理
 */
function bindModalWatch(obj) {
    modal_title.innerText = '查看学生信息'
    btn_modal_left.classList.add('hide') // 隐藏左侧按钮
    for (let i in obj) {
        // 将所有的input禁用
        if (i === 'id') continue;
        document.getElementById(i).value = obj[i]
        document.getElementById(i).setAttribute('disabled', 'true')
    }
    modal_container.classList.remove('hide')
}

/**
 * 绑定修改模态框处理
 * @param obj
 */
function bindModalAlter(obj) {
    console.log('开始绑定')
    modal_title.innerText = '查看学生信息'
    btn_modal_left.innerText = '保存'
    for (let i in obj) {
        if (i === 'id') continue;
        document.getElementById(i).value = obj[i]
    }
    // 绑定按钮点击事件
    btn_modal_left.addEventListener('click', () => alterInfo(obj))
    modal_container.classList.remove('hide')
}


/**
 * 修改信息
 * @param obj
 */
function alterInfo(obj) {
    // 获取id
    let id = obj.id
    // 获取新数据
    for (let i in obj) {
        if (i === 'id') continue;
        obj[i] = document.getElementById(i).value // 重新赋值
    }
    console.log(obj)
    data[id - 1] = obj
    console.log(data[id - 1])
    console.log("更改了第" + (id - 1) + "条数据")
    // 重载当前页数据
    loadData(pagination.current)
    // 将模态框隐藏
    modal_container.classList.add('hide')
    clear()
}

/**
 * 表格选择逻辑
 */
// 全选
function selectAll (){

    // 获取表格中所有的tr标签
    let trs = table_tbody.getElementsByTagName('tr')
    // 遍历当前页面的所有input框
    for (let i = 0 ; i < trs.length; i++){
        let td = trs[i].getElementsByTagName('td')
        let input = td[0].getElementsByTagName('input')[0] // 获取当前行的checkbox
        let id = td[1].innerText //获取当前表格行中的id
        input.checked = true //设置选中
        selectsIds.push(id) // 压入选中列表中
    }
    console.log(selectsIds)
}


// 从数据集中删除当前的数据
function deleteData(){
    if (selectsIds.length === 0 ) return // 当前没有选中，则不执行操作
    // 如果存在选中项则进行删除
    console.log(selectsIds)
    // 进行删除
    for (let i in selectsIds){
        data[selectsIds[i] - 1] = undefined
    }
    // 数组去除空串
    data = trimSpace(data)
    // 数组id进行重新排序
    for (let i = 0 ; i < data.length; i++){
        if (data[i].id != i){
            data[i].id = i + 1
        }
    }
    // 重新计算分页对象
    calcPagination()
    // 设置底部信息
    setInfo()
    // 重载当前页的数据
    loadData(pagination.current)
    // 重制选择状态
    resetSelectAllStatus()
}

/**
 * 重置当前全部选中checkbox状态
 * 进行翻页操作，取消操作时需要重制
 */
function resetSelectAllStatus(){
    // 全局全选按钮的重置
    console.log(table_selectAll)
    table_selectAll.checked = false

    // 当进行添加后，修改后应该进行重置状态
    // 获取表格中所有的tr标签
    let trs = table_tbody.getElementsByTagName('tr')
    // 遍历当前页面的所有input框
    for (let i = 0 ; i < trs.length; i++){
        let td = trs[i].getElementsByTagName('td')
        let input = td[0].getElementsByTagName('input')[0] // 获取当前行的checkbox
        input.checked = false //取消选中
    }
    selectsIds=[] // 清空已经选择的id
}

/**
 * 清除标题内容等
 * 重新初始化模态框
 */
function clear() {
    modal_title.innerText = ''
    btn_modal_left.innerText = ''
    if (btn_modal_left.classList.contains('hide')) btn_modal_left.classList.remove('hide')
    // 清楚input内容
    let labels = document.getElementsByClassName('modal')[0].getElementsByClassName('content')[0].getElementsByTagName('label')
    for (let i = 0; i < labels.length; i++) {
        labels[i].getElementsByTagName('input')[0].value = ''
        labels[i].getElementsByTagName('input')[0].removeAttribute('disabled')
    }
    console.log(modal_container)
    // 进行重新渲染,防止绑定事件和值的冲突
    let clone = modal_container.cloneNode(true)
    modal_container.remove()
    document.getElementsByClassName('container')[0].appendChild(clone)
    reloadModal() // 重载模态框
}

/****************************************** end ***************************************************************/
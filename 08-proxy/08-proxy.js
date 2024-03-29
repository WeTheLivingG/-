const el = document.querySelector('#app')

// 获取标签内容作为页面模板
let template = el.innerHTML

// _data为初始化
let _data = {
  name: 'lee',
  age: 18
}

// 为_data设置拦截，通过修改data中属性的值，来修改
let data = new Proxy(_data, {
  // 当数据修改时，会被set方法拦截，从而得知数据被修改的值value，之后可以将value渲染到页面中，obj为_data
  set(obj, key, value) {
    console.log(`设置${key}属性为${value}`)
    obj[key] = value

    // 将数据渲染到页面中
    render()
  }
})

// 初始化时渲染页面
render()

function render() {
  // 将模板中{{}}内部的内容，用数据替换{{\w+}}
  el.innerHTML = template.replace(/\{\{\w+\}\}/g, str => {
    str = str.substring(2, str.length - 2)

    return _data[str]
  })
}

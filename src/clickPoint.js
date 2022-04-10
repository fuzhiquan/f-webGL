const VSHADER_SOURCE = `
attribute vec4 a_Position;
void main() {
    gl_Position = a_Position;
    gl_PointSize = 10.0;
}`
const FSHADER_SOURCE = `
void main() {
    gl_FragColor = vec4(1.0,0.0,0.0,1.0);
}`

function main() {
    const canvas = document.getElementById('webgl')
    const gl = getWebGLContext(canvas)

    const initResult = initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)
    if(!initResult) {
        console.log('failed to init')
        return
    }
    // 获取a_position变量存储位置
    gl.getAttribLocation(gl.program, 'a_Position')
    canvas.onmousedown = function(e) {click(e, gl, canvas, 'a_Position')}
    // 设置背景色
    gl.clearColor(0.3,0.3,0.3,1.0)
    // 清空颜色缓冲区
    gl.clear(gl.COLOR_BUFFER_BIT)
}
const g_points = []
function click(e, gl, canvas, a_Position) {
    let x = e.clientX
    let y = e.clientY
    const rect = e.target.getBoundingClientRect()
    x = ((x - rect.left) - (canvas.width/2)) / (canvas.width/2)
    y = ((canvas.height/2) - (y - rect.top)) / (canvas.height/2)
    g_points.push([x, y])
    // 清空颜色缓冲区
    gl.clear(gl.COLOR_BUFFER_BIT)
    g_points.forEach(point => {
        // 将数据传递由loaction参数指定attribute变量, 最后一个0.0是z轴
        gl.vertexAttrib3f(a_Position, point[0], point[1], 0.0)
        // 画一个点，从第几个顶点开始，画几个
        gl.drawArrays(gl.POINT, 0, 1)
    })
}
main()
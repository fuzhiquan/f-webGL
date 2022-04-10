const VSHADER_SOURCE = `
attribute vec4 a_Position;
void main() {
    gl_Position = a_Position;
    gl_PointSize = 10.0;
}`
const FSHADER_SOURCE = `
precision mediump float;
uniform vec4 u_FragColor;
void main() {
    gl_FragColor = u_FragColor;
}`

function main() {
    const canvas = document.getElementById('webgl')
    const gl = getWebGLContext(canvas)

    const initResult = initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)
    if(!initResult) {
        console.log('failed to init')
        return
    }
    // 获取a_Position变量的存储位置
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    // 获取u_FragColor变量的存储位置
    const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')

    canvas.onmousedown = function(e) {click(e, gl, canvas, a_Position, u_FragColor)}

    gl.clearColor(0.3,0.3,0.3,1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
}
const g_points = []
const g_colors = []
function click(e, gl, canvas, a_Position, u_FragColor) {
    let x = e.clientX
    let y = e.clientY
    const rect = e.target.getBoundingClientRect()
    x = ((x - rect.left) - canvas.width/2) / (canvas.width/2)
    y = (canvas.height/2 - (y - rect.top)) / (canvas.height/2)
    g_points.push([x,y])
    if(x > 0.0 && y > 0.0) {
        g_colors.push([1.0,0.0,0.0,1.0])
    }else if(x < 0.0 && y > 0.0) {
        g_colors.push([0.0,1.0,0.0,1.0])
    }else if(x < 0.0 && y < 0.0) {
        g_colors.push([0.0,0.0,1.0,1.0])
    }else{
        g_colors.push([1.0,1.0,0.0,1.0])
    }

    gl.clear(gl.COLOR_BUFFER_BIT)
    g_points.forEach((point, index) => {
        gl.vertexAttrib3f(a_Position, point[0], point[1], 0.0)
        gl.uniform4f(u_FragColor, g_colors[index][0],g_colors[index][1],g_colors[index][2],g_colors[index][3])
        gl.drawArrays(gl.POINTS, 0, 1)
    })
}
main()
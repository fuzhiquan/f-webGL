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
    // 顶点缓冲区
    const n = initVertexBuffers(gl)
    if(n < 0) {
        console.log('failed to count')
        return
    }
    gl.clearColor(0.3,0.3,0.3,1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    
    gl.drawArrays(gl.POINTS, 0, n)
}
function initVertexBuffers(gl) {
    const vertices = new Float32Array([
        0.0,0.5,-0.5,-0.5,0.5,0.6
    ])
    const n = parseInt(vertices.length / 2)
    // 1.创建缓冲区对象
    const vertexBuffer = gl.createBuffer()
    if(!vertexBuffer) {
        console.log('failed to create buffer')
        return -1
    }
    // 2.将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    // 3.向缓冲区对象写入数据
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    // 4.将缓冲区对象分配给a_Position变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
    // 5.连接a_Position与给它数据的缓冲区对象
    gl.enableVertexAttribArray(a_Position)

    return n
}
main()
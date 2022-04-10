const VSHADER_SOURCE = `
attribute vec4 a_Position;
void main() {
    gl_Position = a_Position;
}`
const FSHADER_SOURCE = `
void main() {
    gl_FragColor = vec4(1.0,0.3,0.0,1.0);
}`

function main() {
    const canvas = document.getElementById('webgl')
    const gl = getWebGLContext(canvas)

    const initResult = initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)
    if(!initResult) {
        console.log('Failed to initShaders')
        return
    }
    // 设置顶点位置
    const n = initVertexBuffers(gl)
    if(n < 0) {
        console.log('Failed to vertexBuffer')
        return
    }

    gl.clearColor(0.3,0.3,0.3,1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.drawArrays(gl.TRIANGLES, 0, n)
}
function initVertexBuffers(gl) {
    const vertices = new Float32Array([
        0.0,0.5,-0.5,-0.5,0.5,-0.5
    ])
    const n = 3
    // 1.创建缓冲区对象
    const vertexBuffer = gl.createBuffer()
    if(!vertexBuffer) {
        console.log('failed to create buffer')
        return -1
    }
    // 2.绑定缓冲区对象
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    // 3.向缓冲区对象写入数据
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    // 4.将缓冲区对象分配给attribute变量
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
    // 5.开启连接
    gl.enableVertexAttribArray(a_Position)
    return n
}
main()
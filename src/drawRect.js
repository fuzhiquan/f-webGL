const VSHADER_SOURCE = `
attribute vec4 a_Position;
void main() {
    gl_Position = a_Position;
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
        console.log('Failed to initshader')
        return
    }
    const n = initVertexBuffers(gl)
    if(n < 0) {
        console.log('Failed to initBuffers')
        return
    }
    gl.clearColor(0.3,0.3,0.3,1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n)
}
function initVertexBuffers(gl) {
    const vertices = new Float32Array([
        -0.5,0.5,-0.5,-0.5,0.5,0.5,0.5,-0.5
    ])
    const n = 4
    const vertexBuffer = gl.createBuffer()
    if(!vertexBuffer) {
        console.log('Failed to createBuffer')
        return -1
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(a_Position)
    return n
}
main()
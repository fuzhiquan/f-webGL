const VSHADER_SOURCE = `
void main() {
    gl_Position = vec4(0.5,0.0,0.0,1.0);
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
        console.log('failed')
        return
    }

    gl.clearColor(0.3,0.3,0.3,1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.drawArrays(gl.POINTS, 0, 1)
}

main()
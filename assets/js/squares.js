document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('squares-background')
    const ctx = canvas.getContext('2d')

    const squareSize = 30
    const speed = 0.2
    const borderColor = '#191919ff'
    const hoverFillColor = '#000000ff'
    const direction = 'diagonal'

    let numSquaresX, numSquaresY
    let gridOffset = { x: 0, y: 0 }
    let hoveredSquare = null

    function resizeCanvas() {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        numSquaresX = Math.ceil(canvas.width / squareSize) + 1
        numSquaresY = Math.ceil(canvas.height / squareSize) + 1
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    function drawGrid() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const startX = Math.floor(gridOffset.x / squareSize) * squareSize
        const startY = Math.floor(gridOffset.y / squareSize) * squareSize

        for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
            for (
                let y = startY;
                y < canvas.height + squareSize;
                y += squareSize
            ) {
                const squareX = x - (gridOffset.x % squareSize)
                const squareY = y - (gridOffset.y % squareSize)

                const hx = Math.floor((x - startX) / squareSize)
                const hy = Math.floor((y - startY) / squareSize)

                if (
                    hoveredSquare &&
                    hx === hoveredSquare.x &&
                    hy === hoveredSquare.y
                ) {
                    ctx.fillStyle = hoverFillColor
                    ctx.fillRect(squareX, squareY, squareSize, squareSize)
                }

                ctx.strokeStyle = borderColor
                ctx.strokeRect(squareX, squareY, squareSize, squareSize)
            }
        }
    }

    function animateGrid() {
        switch (direction) {
            case 'right':
                gridOffset.x = (gridOffset.x - speed + squareSize) % squareSize
                break
            case 'left':
                gridOffset.x = (gridOffset.x + speed + squareSize) % squareSize
                break
            case 'up':
                gridOffset.y = (gridOffset.y + speed + squareSize) % squareSize
                break
            case 'down':
                gridOffset.y = (gridOffset.y - speed + squareSize) % squareSize
                break
            case 'diagonal':
                gridOffset.x = (gridOffset.x - speed + squareSize) % squareSize
                gridOffset.y = (gridOffset.y - speed + squareSize) % squareSize
                break
        }

        drawGrid()
        requestAnimationFrame(animateGrid)
    }

    canvas.addEventListener('mousemove', function (e) {
        const rect = canvas.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        const startX = Math.floor(gridOffset.x / squareSize) * squareSize
        const startY = Math.floor(gridOffset.y / squareSize) * squareSize

        const hoveredX = Math.floor(
            (mouseX + gridOffset.x - startX) / squareSize
        )
        const hoveredY = Math.floor(
            (mouseY + gridOffset.y - startY) / squareSize
        )

        hoveredSquare = { x: hoveredX, y: hoveredY }
    })

    canvas.addEventListener('mouseleave', () => {
        hoveredSquare = null
    })

    animateGrid()
})

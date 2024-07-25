var canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var c = canvas.getContext('2d')

// c.fillStyle = 'rgba(255, 0, 0, 0.5)'
// c.fillRect(100, 100, 100, 100)
// c.fillStyle = 'rgba(0, 0, 255, 0.5)'
// c.fillRect(400, 100, 100, 100)
// c.fillStyle = 'rgba(0, 255, 0, 0.5)'
// c.fillRect(300, 300, 100, 100)

console.log(canvas)

// Line
// c.beginPath()
// c.moveTo(50, 300)
// c.lineTo(300, 100)
// c.lineTo(400, 300)
// c.strokeStyle = "#fa34a3"
// c.stroke()

// Arc / Circle
// c.beginPath()
// c.arc(300, 300, 30, 0, Math.PI * 2, false)
// c.strokeStyle = 'blue'
// c.stroke()

// for (var i = 0; i < 1000; i++) {
//   var x = Math.random() * window.innerWidth
//   var y = Math.random() * window.innerHeight
//   let r = Math.floor(Math.random() * 256)
//   let g = Math.floor(Math.random() * 256)
//   let b = Math.floor(Math.random() * 256)
//   let a = Math.random()
//   c.beginPath()
//   c.arc(x, y, 30, 0, Math.PI * 2, false)
//   c.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`
//   c.stroke()
// }

let mouse = {
  x: undefined,
  y: undefined
}

window.addEventListener('mousemove', (event) => {
  // console.log(event)

  mouse.x = event.x
  mouse.y = event.y

  // console.log(mouse)
})

window.addEventListener('resize', (event) => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  init()
})

function init () {
  
}

class Circle {
  constructor () {
    this.radius = Math.random() * 40 + 10
    this.x = Math.floor(Math.random() * (innerWidth - 2 * this.radius)) + this.radius
    this.y = Math.floor(Math.random() * (innerHeight - 2 * this.radius)) + this.radius
    this.dx = (Math.random() - 0.5) * 5
    this.dy = (Math.random() - 0.5) * 5
    this.color = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.random()]
    this._radius = this.radius
  }
  
  draw () {
    if (Math.abs(this.x - mouse.x) < 100 && Math.abs(this.y - mouse.y) < 100 && this.radius < this._radius * 7) {
      this.radius += 2
    } else if ((Math.abs(this.x - mouse.x) >= 100 || Math.abs(this.y - mouse.y) >= 100) && this.radius > this._radius) {
      this.radius -= 1
    }

    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.strokeStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.color[3]})`
    c.lineWidth = 10
    c.stroke()
  }

  update () {
    this.draw()
    
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) this.dx *= (-1)
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) this.dy *= (-1)
    
    this.x += this.dx
    this.y += this.dy
  }
}

let circles = []

for (let i = 0; i < 300; i++) {
  circles.push(new Circle())
}

const animate = () => {
  requestAnimationFrame(animate)

  console.log('recursive...')

  c.clearRect(0, 0, innerWidth, innerHeight)

  for (let i = 0; i < circles.length; i++) {
    circles[i].update()
  }
}

animate()
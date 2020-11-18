const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');

const snowflakesCount = 300;

const colorArray = [
  '#046975',
  '#2EA1D4',
  '#3BCC2A',
  '#FFDF59',
  '#FF1D47'
]

const debounce = (func) => {
  let timer
  return (event) => {
    if (timer) { clearTimeout(timer) }
    timer = setTimeout(func, 100, event)
  }
}

window.addEventListener('resize', debounce(() => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  init()
}))
var snowArray = []
const init = () => {
  for (let i = 0; i < snowflakesCount; i++) {
    const radius = Math.random() * 20 + 1
    const x = Math.random() * (innerWidth - radius  * 2) + radius
    const y = Math.random() * (innerHeight - radius  * 2) + radius
    const dx = (Math.random() - 0.5) * 2
    const dy = (Math.random() - 0.5) * 2
    const fontSize = Math.floor(Math.random()*35 +1)
    const snowflake = new Snowflake(x, y, dx, dy, fontSize)
    snowArray.push(snowflake);
    //snowflake.draw()
  }
}

const Snowflake = function(x, y, dx, dy, fontSize) {
  this.x = x
  this.y = y
  this.dx = dx
  this.dy = dy
  this.fontSize = fontSize;
  //this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

  this.draw = function() {
    c.font = this.fontSize +'px serif'
    c.strokeStyle="#ffffff"
    c.strokeText("\u2744",this.x,this.y)
  }

  this.update = function() {
 
    if(this.x  > innerWidth || this.x < 0) {
        this.dx = -this.dx;
    }
    if (this.y  > innerHeight || this.y < 0) {
        this.dy =-this.dy;
    }
    this.x+=this.dx;
    this.y+=this.dy;

    this.draw();
  }
}

init()

function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0,0,innerWidth, innerHeight);
  console.log(snowArray)
  for (let i= 0; i < snowArray.length; i++) {
    snowArray[i].update();
  }
  //snowArray.forEach(snowflake => snowflake.update()
  
}

animate()



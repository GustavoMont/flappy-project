function newElement(tagName, className)
{
    const element = document.createElement(tagName)
    element.className = className
    return element
}

function barreira (reversa) {
    this.element = newElement('div', 'barreira')
    
    const borda = newElement('div', 'borda')
    const corpo = newElement('div', 'corpo')

    this.element.appendChild(borda)
    this.element.appendChild(corpo)

    if(reversa) 
        this.element.classList.add('down')    

    this.setAltura = altura => corpo.style.height = `${altura}px`
    
}

function parDeBarreiras(altura, abertura, position)
{
    this.element = newElement('div', 'par-de-barreiras')
    
    this.sup = new barreira(true)
    this.inf = new barreira(false)
    
    this.element.appendChild(this.sup.element)
    this.element.appendChild(this.inf.element)
    
    this.sortearAbertura = () => {
        const alturaSuperior = Math.random() * (altura - abertura)
        const alturaInferior = altura-abertura-alturaSuperior
        this.sup.setAltura(alturaSuperior)
        this.inf.setAltura(alturaInferior)
    }

    this.getPos = () => parseInt(this.element.style.left.split('px')[0])
    this.setPos = position => this.element.style.left = `${position}px`
    this.getLargura = () => this.element.clientWidth
    this.sortearAbertura()
    this.setPos(position)
}

function barreiras(altura, largura, abertura, espaco, notficarPonto)
{
    this.pares = 
    [
        new parDeBarreiras(altura, abertura, largura),
        new parDeBarreiras(altura, abertura, largura + espaco),
        new parDeBarreiras(altura, abertura, largura + espaco * 2),
        new parDeBarreiras(altura, abertura, largura + espaco * 3),
    ]

    const deslocamento = 3

    this.animar = () =>
    {
        this.pares.forEach( par => {
            par.setPos(par.getPos() - deslocamento)

            if(par.getPos() < -par.getLargura())
            {
                par.setPos(par.getPos() + espaco * this.pares.length)
                par.sortearAbertura()
            }
            const meio = largura/2

            const cruzou = par.getPos() + deslocamento >= meio &&
                            par.getPos() < meio

            cruzou && notficarPonto() 
        })

    }
}

let score = document.querySelector('[score]')
let counter = 0


const bar = new barreiras(500, 1200, 200, 400, () => {
  score.innerHTML = counter++
})

const gameArea = document.querySelector('[wm-flappy]')

bar.pares.forEach(par => {
    gameArea.appendChild(par.element)
})

setInterval(() => {
    bar.animar()
}, 15)





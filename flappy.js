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

function Barreiras(altura, largura, abertura, espaco, notficarPonto)
{
    this.pares = 
    [
        new parDeBarreiras(altura, abertura, largura),
        new parDeBarreiras(altura, abertura, largura + espaco),
        new parDeBarreiras(altura, abertura, largura + espaco * 2),
        new parDeBarreiras(altura, abertura, largura + espaco * 3),
    ]

    const deslocamento = 5

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

function Bird(alturaDatela)
{
    let voando = false
    
    this.element = newElement('img', 'bird')
    this.element.src = './imgs/passaro.png'
    
    window.onkeydown = e => {voando = true}
    window.onkeyup = e => {voando = false}

    this.getY = () => parseInt(this.element.style.bottom.split('px')[0])
    this.setY = (y) => this.element.style.bottom = `${y}px`

    this.animar = () => {
        
        let novoY = this.getY() + (voando ? 6 : -5)
        const maxHeight = alturaDatela - this.element.clientHeight

        if (novoY <= 0)
        {
            this.setY(0)
        }
        else if(novoY >= alturaDatela)
        {
            this.setY(maxHeight)
        }
        else 
        {
            this.setY(novoY)
        }

        
    }

    this.setY(alturaDatela/2)

}

function Sobrepostos(elemA, elemB) 
{
    const a = elemA.getBoundingClientRect()
    const b = elemB.getBoundingClientRect()

    const horizontal = a.left + a.width >=b.left 
                       && b.left + b.width >= a.left 
    const vertical = a.top + a.height >=b.top 
                       && b.top + b.height >= a.top 

    return horizontal && vertical
}

function colision (bird, bars)
{
    let colisao = false

    bars.pares.forEach( par => {
        if(!colisao)
        {
            const sup = par.sup.element
            const inf = par.sup.element
            colisao = Sobrepostos(bird.element, sup) || Sobrepostos(bird.element, inf) 
        }

    })

    return colisao
}


function Score() 
{
    this.element = newElement('span', 'score')
    this.atualizarPontos = pontos => this.element.innerHTML = `${pontos}`

    this.atualizarPontos(0)
}

function flappyBird () 
{
    let pontos = 0
    const gameArea = document.querySelector('[wm-flappy]')
    const altura = gameArea.clientHeight
    const largura = gameArea.clientWidth

    const score = new Score()
    const barreiras = new Barreiras(altura, largura, 200, 400, () => score.atualizarPontos(++pontos))
    const bird = new Bird(altura)

    gameArea.appendChild(score.element)
    gameArea.appendChild(bird.element)
    barreiras.pares.forEach(par => gameArea.appendChild(par.element))

    this.start = () => {
        const temp = setInterval(() => {
            barreiras.animar()
            bird.animar()
            
            if(colision(bird, barreiras))
            {
                clearInterval(temp)
            }
        }, 20)
    }
}

new flappyBird().start()




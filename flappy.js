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







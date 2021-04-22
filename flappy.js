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

    this.getPos() = () => parent(this.element.style.left.split('px')[0])
    this.setPos = position => this.element.style.left = `${position}px`
    this.sortearAbertura()
    this.setPos(position)
}







// Cria o array com contagem dos pixels!
const firePixelsArray = [];
// Define a altura e largura do nosso fogo
const fireWidth = 80;
const fireHeight = 40;

// Cria as palheta de cores
// Palheta Vermelha
var fireColorsPaletteRed = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}];

// Palheta Verde
var fireColorsPaletteGreen = [{"r":0,"g":0,"b":0},{"r":15,"g":31,"b":5},{"r":21,"g":43,"b":7},{"r":0,"g":0,"b":0},{"r":0,"g":0,"b":0},{"r":15,"g":31,"b":5},{"r":21,"g":43,"b":7},{"r":0,"g":0,"b":0},{"r":15,"g":31,"b":5},{"r":21,"g":43,"b":7},{"r":27,"g":54,"b":9},{"r":34,"g":68,"b":11},{"r":0,"g":0,"b":0},{"r":15,"g":31,"b":5},{"r":21,"g":43,"b":7},{"r":27,"g":54,"b":9},{"r":34,"g":68,"b":11},{"r":44,"g":87,"b":16},{"r":54,"g":105,"b":20},{"r":68,"g":127,"b":29},{"r":88,"g":149,"b":48},{"r":104,"g":162,"b":65},{"r":123,"g":178,"b":86},{"r":135,"g":188,"b":100},{"r":149,"g":197,"b":117},{"r":158,"g":205,"b":126},{"r":164,"g":210,"b":133},{"r":172,"g":215,"b":143},{"r":181,"g":220,"b":155},{"r":188,"g":223,"b":164},{"r":192,"g":224,"b":171},{"r":183,"g":210,"b":195},{"r":223,"g":227,"b":214},{"r":218,"g":247,"b":220},{"r":223,"g":227,"b":214},{"r":218,"g":247,"b":220},{"r":255,"g":255,"b":255}];

// Escolhe a palheta de cores
var fireColorsPalette = fireColorsPaletteRed;

// Cria uma variável para contar quantas vezes o botão de cor foi acionado
var cor = 0;


// Muda a posição do vento
var mudarPosicaoVento = false;

// Muda intensidade do fogo
var intensidadeFogo = 4;

// Cria uma variável debug para testar sem a cor do fogo
var debug = false;

// Define a força do vento
var forcaVento = 3;

// Inícia o projeto
function start() {
    // Cria a estrutura de dados
    createFireDataStructure();
    // Cria a base do fogo
    createFireSource();
    // Renderiza o fogo
    renderFire();

    // Coloca um intervalo pra chamar a função de propagar o fogo
    setInterval(calculateFirePropagation, 50);
}
// Cria a estrutura de dados
function createFireDataStructure() {
    // Multiplica a largura pela altura pra saber a quantidade de pixels
    const numberOfPixels = fireWidth * fireHeight;

    // Preenche todas as posições do array com 0
    for (let i = 0; i < numberOfPixels; i++) {
        firePixelsArray[i] = 0;
    }
}
// Função que calcular a propagação do fogo
function calculateFirePropagation() {
    // Percorre todas as colunas
    for (let column = 0; column < fireWidth; column++) {
        // Percorre todas as linhas
        for (let row = 0; row < fireHeight; row++) {
            // Preenche o número do index de todas as células
            const pixelIndex = column + (fireWidth * row);
            // Atualiza a intensidade do fogo passando o número do index
            updateFireIntensityPerPixel(pixelIndex);
        }
    }
    // Renderiza o fogo
    renderFire();
}
// Atualiza a intensidade do fogo por Pixel
function updateFireIntensityPerPixel(currentPixelIndex) {
    // Cria uma variável e define o valor como o valor atual do index + a largura do fogo, ou seja, o pixel de baixo
    const belowPixelIndex = currentPixelIndex + fireWidth;
    // Verifica se o "belowPixelIndex" é maior ou igual à quantidade de pixels, se for encerra e não faz nada
    if (belowPixelIndex >= fireWidth * fireHeight) {
        return
    }
    // se não for, ele continua: 

    // Cria uma variável para diminuir a intensidade do fogo
    const decay = Math.floor(Math.random() * intensidadeFogo); // Gera um número aleatório entre 0 e 2

    // Cria uma variável para diminuir a força do vento
    const decayVento = Math.floor(Math.random() * forcaVento);

    // Pega a intensidade do fogo do pixel de baixo
    const belowPixelFireIntensity = firePixelsArray[belowPixelIndex];
    // Define a nova intensidade do fogo sendo a intensidade do pixel de baixo, menos o "decay" onde a intensidade for maior ou igual a 0.
    const newFireIntensity = belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0;

    // Pega um pixel próximo aleatório e define a nova intensidade, dando a impressão de vento.
    if (mudarPosicaoVento) {
        firePixelsArray[currentPixelIndex + decayVento] = newFireIntensity;    
    } else {
        firePixelsArray[currentPixelIndex - decayVento] = newFireIntensity;
    }
}
// Função que muda a posição do vento
function mudarVento() {
    // Se estiver true, moda pra false
    if (mudarPosicaoVento) {
        mudarPosicaoVento = false;
        // se estiver false, muda pra true
    } else {
        mudarPosicaoVento = true;
    }
    
}

// Função que alterna a cor do fogo
function mudarCorFogo() {
    // Se o resto da divisão da "cor" por 2 for 0, ou seja, se for par
    if (cor%2 == 0 ) {
        // muda a cor para verde
        fireColorsPalette = fireColorsPaletteGreen;
    } else {
        // se for impar, muda pra vermelho novamente
        fireColorsPalette = fireColorsPaletteRed;
    }
    // adiciona 1 à "cor" para fazer a iteração
    cor++;   
}

// Função que muda a força do vento
function mudarForcaVento(valor) {
    // Se for brisa, deixar fraco
    if (valor === 'brisa'){
        forcaVento = 2;
        // Parar
    } else if (valor === 'parado') {
        forcaVento = 0;
    } else {
        // Vendaval
        forcaVento = 5;
    }
}

// Função muda a força do fogo
function mudarFogo(valor) {
    // Se o botão for aumentar
 if (valor === 'aumentar') {
     // Verifica se o fogo está no limite máximo
    if (intensidadeFogo === 2) {
        alert('O fogo já alcançou o nivel máximo');
    } else {
        // Aumenta o fogo
        intensidadeFogo--;
    }
    
 }
 //Se o botão for diminuir 
 else {
      // Verifica se o fogo está no limite mínimo
    if (intensidadeFogo === 6) {
        alert('O fogo já alcançou o nível mínimo');
    } else {
        // Diminui o fogo
        intensidadeFogo++;
    }
 }
}
// Função que muda o modo debug
function modoDebug() {
    // se debug estiver true, muda pra false
    if (debug) {
        debug = false;
        // se estiver false, muda pra true
    } else {
        debug = true;
    }
}

// Função que renderiza o fogo
function renderFire() {
    // Cria nossa tabela
    let html = '<table cellpadding=0 cellspacing=0>';
    // Percorre todas as linhas
    for (let row = 0; row < fireHeight; row++) {
        // Cria as linhas da tabela
        html += '<tr>';
        // Percorre todas as colunas
        for (let column = 0; column < fireWidth; column++) {
            // Pega o valor de cada Pixel Index
            const pixelIndex = column + (fireWidth * row);
            //  Cria a intensidade do fogo sendo a matriz dos pixels, passando o índice
            const fireIntensity = firePixelsArray[pixelIndex];

// define a cor baseada na palheta e intensidade do fogo
const color = fireColorsPalette[fireIntensity];
// preenche a cor
const colorString = `${color.r},${color.g},${color.b}`;

            // Se o debug estiver true
            if(debug === true) {
                // Cria a célula pixel, preenchendo o Index do Pixel + a Intensidade do Fogo
                html += '<td class="pixel">';
                html += `<div class="pixel-index">${pixelIndex}</div>`;
                html += `<span style="color: rgb(${colorString})">${fireIntensity}</span>`;
                html += '</td>';

            // Se estiver false
            } else {
                
                // Cria a célula pintando o fundo com a cor selecionada
                html += `<td class="pixel" style="background-color: rgb(${colorString})">`;
                html += '</td>';
            }

            
        }
        // fecha a linha
        html += '</tr>';
    }
    // fecha a tabela
    html += '</table>';
    // Cria nossa tabela dentro da div #fireCanvas
    document.querySelector('#fireCanvas').innerHTML = html;
}
// Cria a base do fogo
function createFireSource() {
    // percorre todas as colunas
    for (let column = 0; column <= fireWidth; column++) {
        // Cria um pixel "fora da caixa"
        const overflowPixelIndex = fireWidth * fireHeight;
        // Leva o pixel uma linha pra cima, e soma a coluna
        const pixelIndex = (overflowPixelIndex - fireWidth) + column;
        // Define a base como: 36
        firePixelsArray[pixelIndex] = 36;
    }
}
// Chama a função que inicia o projeto
start();
// importa o hook 'useState' do react para gerenciar o estado dos componentes
import { useState } from 'react';

// importa os estilos css.
import styles from "./App.module.css";

// define o componente funcional Square, recebendo seu valor e a função de clique
function Square({ value, onSquareClick }) {

  // retorna o elemento visual do componente.
  return (

    // renderiza um botão e aplica o estilo css e a função de clique
    <button className={styles.square} onClick={onSquareClick}>

       {/* exibe o valor do quadrado  */}
      {value}

    </button>
  );
}

// define o componente funcional 'Board, recebendo o estado do jogo e a função de atualização
function Board({ xIsNext, squares, onPlay }) {

  // define a função que lida com o clique em um quadrado específico
  function handleClick(i) {

    // verifica se já tem um vencedor ou se o quadrado já tá preenchido. se sim, sai da função
    if (calculateWinner(squares) || squares[i]) {

      // sai da função, ignorando o clique
      return;
    }
    // cria uma cópia do array de quadrados para garantir a imutabilidade do estado
    const nextSquares = squares.slice();

    // verifica se é a vez do jogador 'X'
    if (xIsNext) {

    // coloca 'X' no quadrado clicado
      nextSquares[i] = 'X';
    // se não for 'X', é a vez do 'O'
    } else {
      // coloca 'O' no quadrado clicado
      nextSquares[i] = 'O';
    }
    // chama a função 'onPlay' do componente pai para atualizar o estado com o novo tabuleiro
    onPlay(nextSquares);
  }

  // chama a função utilitária para verificar se há um vencedor no tabuleiro atual
  const winner = calculateWinner(squares);

  // declara a variavel que irá armazenar a mensagem de status 
  let status;

  // se houver um vencedor
  if (winner) {

    // define a mensagem como o vencedor
    status = 'Winner: ' + winner;

  // caso contrário
  } else {
    // define a mensagem como o próximo jogador 
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  // retorna a estrutura visual do tabuleiro
  return (

    <>
      {/* exibe o status do jogo (próximo jogador ou vencedor) */}
      <div className={styles.status}>{status}</div>

       {/* início da primeira linha do tabuleiro */}

      <div className={styles.boardRow}>

         {/* renderiza o primeiro quadrado, passando seu valor e a função de clique */}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />

         {/* renderiza o segundo quadrado */}
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />

         {/* renderiza o terceiro quadrado */}
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />

      </div>

       {/* início da segunda linha do tabuleiro */}
      <div className={styles.boardRow}>

         {/* renderiza o quarto quadrado */}
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />

         {/* renderiza o quinto quadrado */}
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />

         {/* renderiza o sexto quadrado */}
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />

      </div>

       {/* início da terceira linha do tabuleiro */}
      <div className={styles.boardRow}>

         {/* renderiza o sétimo quadrado */}
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />

         {/* renderiza o oitavo quadrado */}
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />

         {/* renderiza o nono quadrado */}
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />

      </div>
 
    </>
  );
}

// define e exporta o componente principal 
export default function Game() {

  // cria o estado 'history' para armazenar todas as jogadas, começando com um tabuleiro vazio
  const [history, setHistory] = useState([Array(9).fill(null)]);

  // cria o estado 'currentMove' para rastrear o índice da jogada que está sendo exibida 
  const [currentMove, setCurrentMove] = useState(0);

  // calcula se é a vez do 'X' (se o número do movimento for par)
  const xIsNext = currentMove % 2 === 0;

  // pega o array de quadrados (tabuleiro) correspondente ao movimento atual
  const currentSquares = history[currentMove];

  // função chamada pelo componente 'Board' para registrar uma nova jogada no histórico
  function handlePlay(nextSquares) {

    // cria um novo histórico, descartando qualquer jogada "futura" e adicionando o novo tabuleiro
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    // atualiza o estado do histórico
    setHistory(nextHistory);

    // move o ponteiro de volta para o último movimento recém adicionado
    setCurrentMove(nextHistory.length - 1);
  }

  // função para "viajar no tempo", mudando qual jogada do histórico está sendo exibida
  function jumpTo(nextMove) {

    // atualiza o estado do movimento atual para o índice clicado
    setCurrentMove(nextMove);
  }

  // mapeia o array 'history' para criar a lista de botões de histórico
  const moves = history.map((squares, move) => {

    // declara a variável para a descrição do botão
    let description ;

    // se o movimento for maior que 0 
    if (move > 0) {

      description  = 'Go to move #' + move;

    // se for o primeiro movimento (índice 0)
    } else {
     
      description = 'Go to game start';
    }

    // retorna o item da lista contendo o botão
    return (

      // a key é essencial para o react em listas
      <li key={move}>

         {/* renderiza o botão que, ao ser clicado, chama 'jumpTo' com o índice do movimento */}
        <button className={styles.buttonStart} onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // retorna a estrutura principal do componente 'Game'
  return (

    // container principal do jogo.
    <div className={styles.game}>

       {/* seção do tabuleiro */}
      <div className={styles.gameBoard}>

         {/* renderiza o 'Board', passando o estado atual e a função de atualização */}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />

      </div>
       {/* seção lateral com informações e histórico */}
      <div className={styles.gameInfo}>

         {/* lista ordenada que exibe os botões de histórico criados acima */}
        <ol className={styles.moves}>{moves}</ol>

      </div>
    </div>
  );
}

// define a função utilitária para calcular se há um vencedor
function calculateWinner(squares) {

  // define todas as 8 linhas de vitória possíveis 
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
 
  for (let i = 0; i < lines.length; i++) {

    // desestrutura a linha atual para obter os três índices
    const [a, b, c] = lines[i];

    // verifica se o primeiro quadrado não está nulo e se ele é igual ao segundo e igual ao terceiro
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {

      // se houver uma correspondência, retorna 'X' ou 'O', que é o vencedor
      return squares[a];
    }
  }

  // se o loop terminar e nenhuma linha de vitória for encontrada, retorna null (sem vencedor)
  return null;
}

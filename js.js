// Создаем двумерный массив для хранения состояния игры (пустое поле)
var board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

// Функция для отрисовки игрового поля
function drawBoard() {
    var gameElement = document.getElementById("game");
    gameElement.innerHTML = ''; // Очищаем содержимое #game

    // Проходим по каждому элементу массива и создаем соответствующий блок .block
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            var block = document.createElement('div');
            block.classList.add('block');
            block.dataset.row = i; // добавляем атрибуты для хранения координаты
            block.dataset.col = j; // каждого блока

            // Устанавливаем текст в блок в соответствии с текущим состоянием поля
            block.innerText = board[i][j];

            // Добавляем обработчик клика на блок
            block.addEventListener('click', handleClick);

            gameElement.appendChild(block); // Добавляем блок в игровое поле
        }
    }
}

// Функция для отображения сообщений о победителе или ничьей
function showMessage(message) {
    var messageElement = document.getElementById('message');
    messageElement.textContent = message;
}

// Функция для очистки игрового поля
function resetBoard() {
    // Очищаем массив board
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    // Перерисовываем игровое поле
    drawBoard();

    // Очищаем сообщение
    showMessage('');
}

// Функция, которая вызывается при клике на блок
function handleClick(event) {
    var row = event.target.dataset.row;
    var col = event.target.dataset.col;

    // Проверяем, что ячейка пуста, иначе игнорируем клик
    if (board[row][col] === '') {
        // Определяем, чей ход (очередь) - крестики или нолики
        var currentPlayer = getCurrentPlayer();
        
        // Записываем в массив состояния игры (модель данных)
        board[row][col] = currentPlayer;

        // Перерисовываем игровое поле
        drawBoard();

        // Проверяем на победителя или ничью
        var winner = checkWinner();
        if (winner !== null) {
            if (winner === 'draw') {
                showMessage('Draw!');
            } else {
                showMessage('Winner: ' + winner);
            }
            // Очищаем игровое поле после завершения игры
            setTimeout(resetBoard, 1500); // Пример с задержкой для визуального эффекта
        }
    }
}

// Функция для определения текущего игрока (крестик или нолик)
function getCurrentPlayer() {
    // Считаем количество крестиков и ноликов на поле
    var countX = 0;
    var countO = 0;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] === 'X') {
                countX++;
            } else if (board[i][j] === 'O') {
                countO++;
            }
        }
    }

    // Возвращаем текущего игрока в зависимости от количества ходов
    return countX > countO ? 'O' : 'X';
}

// Функция для проверки наличия победителя
function checkWinner() {
    // Проверяем по строкам, столбцам и диагоналям
    for (var i = 0; i < 3; i++) {
        // Проверка строк
        if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            return board[i][0];
        }
        // Проверка столбцов
        if (board[0][i] !== '' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
            return board[0][i];
        }
    }
    // Проверка главной диагонали
    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0];
    }
    // Проверка побочной диагонали
    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2];
    }

    // Проверяем на ничью
    var isDraw = true;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                isDraw = false;
                break;
            }
        }
        if (!isDraw) {
            break;
        }
    }
    if (isDraw) {
        return 'draw';
    }

    // Если никто не выиграл и игра не окончена
    return null;
}

// Начальная отрисовка игрового поля
drawBoard();

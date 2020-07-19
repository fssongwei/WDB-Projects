var resetBtn = document.querySelector("#resetBtn");
var statisticsBtn = document.querySelector("#statisticsBtn");
var easyBtn = document.querySelector("#easyBtn");
var mediumBtn = document.querySelector("#mediumBtn");
var hardBtn = document.querySelector("#hardBtn");
var statusDisplay = document.querySelector("#statusDisplay");
var rgbDisplay = document.querySelector("#rgbDisplay");
var squares = document.querySelectorAll(".square");
var header = document.querySelector(".header");

var nSquare = 3;
var colors = [];
var targetSquareIndex = 0;
var finish = false;
var count = 0;
var right = 0;
var total = 0;
reset();

resetBtn.addEventListener("click", function() {
    reset();
});

easyBtn.addEventListener("click", function(){
    nSquare = 3;
    for (var i = 3; i < 9; i ++) {
        squares[i].setAttribute("hidden", "true");
    }
    reset();
});

mediumBtn.addEventListener("click", function(){
    nSquare = 6;
    for (var i = 3; i < 6; i ++) {
        squares[i].removeAttribute("hidden");
    }
    for (var i = 6; i < 9; i ++) {
        squares[i].setAttribute("hidden", "true");
    }
    reset();
});


hardBtn.addEventListener("click", function(){
    nSquare = 9;
    for (var i = 3; i < 9; i ++) {
        squares[i].removeAttribute("hidden");
    }
    reset();
});

statisticsBtn.addEventListener("click", function() {
    var rate = total === 0 ? 0 : right / total * 100;
    statusDisplay.textContent = "Your correct rate: " + Math.ceil(rate) + "%";
});

for (var i = 0; i < 9; i ++) {
    squares[i].addEventListener("click", function() {
        if (!finish) total ++;
        if (!finish && colors[targetSquareIndex] === this.style.backgroundColor) {
            statusDisplay.textContent = "You Win!";
            changeColorAfterWin();
            finish = true;
            right ++;
            resetBtn.textContent = "Try Again"
        } else if (!finish) {
            this.style.backgroundColor = "#232323";
            count ++;
            if (count === nSquare - 1) {
                finish = true;
                statusDisplay.textContent = "You Lose!";
                resetBtn.textContent = "Try Again"
            }
        }
    });
}

function changeColorAfterWin() {
    for (var i = 0; i < nSquare; i ++) {
        squares[i].style.backgroundColor = colors[targetSquareIndex];
    }
    header.style.backgroundColor = colors[targetSquareIndex];
}


function reset() {
    for (var i = 0; i < nSquare; i ++) {
        color = generateColor();
        colors[i] = color;
        squares[i].style.backgroundColor = color;
    }

    header.style.backgroundColor = "steelblue";
    resetBtn.textContent = "new game"

    nSquare === 3 ? easyBtn.classList.add("selected") : easyBtn.classList.remove("selected");
    nSquare === 6 ? mediumBtn.classList.add("selected") : mediumBtn.classList.remove("selected");
    nSquare === 9 ? hardBtn.classList.add("selected") : hardBtn.classList.remove("selected");

    targetSquareIndex = randNum(0, nSquare - 1);
    rgbDisplay.textContent = colors[targetSquareIndex];
    statusDisplay.textContent = "";
    finish = false;
    count = 0;
}

function generateColor() {
    return "rgb(" + randNum(0, 255) + ", " + randNum(0, 255) + ", " + randNum(0, 255) + ")";
}

function randNum(lo, hi) {
    return Math.floor(Math.random() * (hi - lo + 1))  + lo;
}
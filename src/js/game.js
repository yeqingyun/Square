import _ from 'lodash';
import Square from "./square.js";
import SquareFactory from "./squareFactory.js";

export default function () {

    var gameData = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    var dataClass = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]



    var cur, next
    var gameContainers, nextContainers, timeDiv, gameoverDiv, scoreDiv
    var gameDivs = [], nextDivs = []

    var initDiv = function (data, container, divs) {
        for (var i = 0; i < data.length; i++) {
            var gameDiv = []
            for (var j = 0; j < data[0].length; j++) {
                var newNode = document.createElement("div")
                newNode.className = 'none'
                container.appendChild(newNode)
                gameDiv.push(newNode)
            }
            Array.prototype.push.call(divs, gameDiv)
        }
    }

    var flushDiv = function (data, divs, classes) {
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[0].length; j++) {
                if (data[i][j] == 0) {
                    divs[i][j].className = 'none'
                } else {
                    if (!classes[i][j])
                        classes[i][j] = 'A'
                    divs[i][j].className = classes[i][j]
                    // } else if (data[i][j] == 2) {
                    //     divs[i][j].className = 'current'
                    // }
                }
            }
        }

    }
    //检测点是否合法
    var checkPonit = function (pox, x, y) {
        if (pox.x + x < 0) {
            return false
        } else if (pox.x + x >= gameData.length) {
            return false
        } else if (pox.y + y < 0) {
            return false
        } else if (pox.y + y >= gameData[0].length) {
            return false
        } else if (gameData[pox.x + x][pox.y + y] == 1) {
            return false
        }
        return true
    }
    //监测数据是否合法
    var valid = function (pos, data) {
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[0].length; j++) {
                if (data[i][j] != 0) {
                    if (!checkPonit(pos, i, j)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    //设置数据
    var setData = function () {
        for (var i = 0; i < cur.data.length; i++) {
            for (var j = 0; j < cur.data[0].length; j++) {
                if (checkPonit(cur.orgin, i, j)) {
                    gameData[i + cur.orgin.x][j + cur.orgin.y] = cur.data[i][j]
                    dataClass[i + cur.orgin.x][j + cur.orgin.y] = cur.class
                }
            }
        }
    }
    //清除数据
    var clearData = function () {
        for (var i = 0; i < cur.data.length; i++) {
            for (var j = 0; j < cur.data[0].length; j++) {
                if (checkPonit(cur.orgin, i, j)) {
                    gameData[cur.orgin.x + i][cur.orgin.y + j] = 0
                    dataClass[i + cur.orgin.x][j + cur.orgin.y] = 'none'
                }
            }
        }
    }

    var setTime = function (data) {
        if (timeDiv) {
            timeDiv.innerText = data
        }
    }

    var showGameOver = function () {
        gameoverDiv.style.display = 'block'
    }

    var clearGameOver = function () {
        gameoverDiv.style.display = 'none'
    }

    //初始化数据
    var init = function (dom, type, dir) {
        next = SquareFactory.prototype.make(type, dir)
        gameContainers = dom.gameContainers
        nextContainers = dom.nextContainers
        timeDiv = dom.timeDiv
        gameoverDiv = dom.gameoverDiv
        scoreDiv = dom.scoreDiv
        initDiv(gameData, gameContainers, gameDivs)
        initDiv(next.data, nextContainers, nextDivs)
        flushDiv(next.data, nextDivs, next.classData)
    }

    //固定变色
    var fixed = function () {
        for (var i = 0; i < gameData.length; i++) {
            for (var j = 0; j < gameData[0].length; j++) {
                if (checkPonit(cur.orgin, i, j)) {
                    if (gameData[cur.orgin.x + i][cur.orgin.y + j] == 2) {
                        gameData[cur.orgin.x + i][cur.orgin.y + j] = 1
                    }
                }
            }
        }
        flushDiv(gameData, gameDivs, dataClass)
    }

    var setScore = function (data) {
        if (scoreDiv)
            scoreDiv.innerText = data
    }


    var checkClear = function () {
        var lines = 0
        function check(data) {
            return data == 1
        }
        for (var i = gameData.length - 1; i >= 0; i--) {
            var flag = gameData[i].every(check)

            if (flag) {
                lines++
                for (var k = i; k >= 1; k--) {
                    gameData[k] = (gameData[k - 1]).slice(0)
                    dataClass[k] = (dataClass[k - 1]).slice(0)
                }
                gameData[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                dataClass[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                i++
            }
        }
        return lines

    }

    var checkGameOver = function () {
        if (gameData[0][3] == 1 || gameData[0][4] == 1 || gameData[0][2] == 1 || gameData[0][5] == 1) {//如果原点被占用
            return true
        }
        if (!valid(next.orgin, next.data)) {
            return true
        }


        return false;
    }

    var nextSquare = function (type, dir) {
        cur = next
        setData()
        next = SquareFactory.prototype.make(type, dir)
        flushDiv(gameData, gameDivs, dataClass)
        initSquareClassData(next)
        flushDiv(next.data, nextDivs, next.classData)
    }

    var initSquareClassData = function (squ) {
        for (var i = 0; i < squ.data.length; i++) {
            for (var j = 0; j < squ.data[0].length; j++) {
                if (squ.data[i][j] != 0) {
                    squ.classData[i][j] = squ.class
                }
            }
        }
    }



    //下移
    var down = function () {
        if (cur.canDown(valid)) {
            clearData()
            cur.down()
            setData()
            flushDiv(gameData, gameDivs, dataClass)
            return true
        }
        return false
    }





    var left = function () {
        if (cur.canLeft(valid)) {
            clearData()
            cur.left()
            setData()
            flushDiv(gameData, gameDivs, dataClass)
        }
    }

    var right = function () {
        if (cur.canRight(valid)) {
            clearData()
            cur.right()
            setData()
            flushDiv(gameData, gameDivs, dataClass)
        }
    }

    var rotate = function () {
        if (cur.canRotate(valid)) {
            clearData()
            cur.rotate()
            setData()
            flushDiv(gameData, gameDivs, dataClass)
        }
    }

    var fall = function () {
        while (down()) { }
    }

    //销毁的方法
    var destroyDiv = function () {
        for (var i = 0; i < gameDivs.length; i++) {
            for (var j = 0; j < gameDivs[0].length; j++) {
                gameContainers.removeChild(gameDivs[i][j])
            }
        }
        for (var i = 0; i < nextDivs.length; i++) {
            for (var j = 0; j < nextDivs[0].length; j++) {
                nextContainers.removeChild(nextDivs[i][j])
            }
        }

    }

    this.init = init
    this.down = down
    this.left = left
    this.right = right
    this.rotate = rotate
    this.fall = fall
    this.fixed = fixed
    this.nextSquare = nextSquare
    this.checkClear = checkClear
    this.checkGameOver = checkGameOver
    this.setTime = setTime
    this.showGameOver = showGameOver
    this.clearGameOver = clearGameOver
    this.setScore = setScore
    this.destroyDiv = destroyDiv

}


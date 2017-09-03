import _ from 'lodash';
import Game from "./game.js";
export default function () {
    var game

    var timer
    var INTERVAL = 200
    var hours
    var minute
    var seconds

    var score = 0

    var timeCount = 0

    var isStart = false;
    var isPause = false

    var bindKeyEvent = function () {
        document.onkeydown = function (e) {
            switch (e.keyCode) {
                case 38://up
                    game.rotate()
                    break
                case 39://right
                    game.right()
                    break
                case 37://left
                    game.left()
                    break
                case 40://down
                    game.down()
                    break
                case 32://space
                    game.fall()
                    break
            }
        }
    }

    var generateType = function () {
        return Math.ceil(Math.random() * 7) - 1
    }

    var generateDir = function () {
        return Math.ceil(Math.random() * 4) - 1
    }

    var addScore = function (data) {
        switch (data) {
            case 0:
                return 0
            case 1:
                return 10
            case 2:
                return 40
            case 3:
                return 60
            case 4:
                return 80
            default:
                return 100
        }
    }


    var gameOver = function () {
        clearInterval(timer)
        game.showGameOver()
        game.nextSquare(generateType(), generateDir())
        document.onkeydown = null
        timer = null
        timeCount = 0
        score = 0 
        isStart = true
    }

    var clearGameOver = function () {
        game.clearGameOver()
        game.destroyDiv()
        game.setScore(0)
        game.setTime(0)
    }

    var move = function (gamoverDiv) {
        if (!game.down()) {//如果不能下落
            game.fixed()//固定
            score += addScore(game.checkClear())
            game.setScore(score)//消行
            if (game.checkGameOver()) {//判断游戏是否结束
                gameOver()
            } else {
                game.nextSquare(generateType(), generateDir())//生成下一个方块
            }
        }
    }

    var addTime = function () {
        timeCount++;
        if (timeCount % 5 == 0) {
            seconds = timeCount / 5
            var showTime;
            if (seconds >= 3600) {
                var tmp = seconds % 3600
                var tmpMinute = Math.floor(tmp / 60)
                showTime = Math.floor(seconds / 3600) + "小时" + tmpMinute + '分' + tmp % 60 + '秒'
            } else if (seconds >= 60) {
                showTime = Math.floor(seconds / 60) + "分" + seconds % 60 + '秒'
            } else {
                showTime = seconds + '秒'
            }
            game.setTime(showTime)
        }
    }

    var start = function () {
        if (!timer) {
            if(isStart)
                clearGameOver()
            game = new Game()
            var doms = {
                gameContainers: document.getElementById("local_game"),
                nextContainers: document.getElementById("local_next"),
                timeDiv: document.getElementById("local_time"),
                gameoverDiv: document.getElementById("local_gameover"),
                scoreDiv: document.getElementById("local_score")
            }

            game.init(doms, generateType(), generateDir())
            game.nextSquare(generateType(), generateDir())
            bindKeyEvent()

            timer = setInterval(function () {
                move()
                addTime()
            }, INTERVAL)
        }
    }

    var pause = function (e) {
        if (!isPause && timer) {
            isPause = true
            clearInterval(timer)
            this.innerText = '继续'
            this.onclick = continue_
            document.onkeydown = null
        }
    }

    var continue_ = function () {
        if (isPause) {
            isPause = false
            timer = setInterval(function () {
                move()
                addTime()
            }, INTERVAL)
            this.innerText = '暂停'
            this.onclick = pause
            bindKeyEvent()
        }
    }

    var stop = function () {
        isStart = false
        clearInterval(timer)
        document.onkeydown = null
        timer = null
        game.destroyDiv()
        game.clearGameOver()
        game.setScore(0)
        game.setTime(0)
        timeCount = 0
        score = 0
    }

    var init = function () {
        //绑定开始按钮事件
        document.getElementById("local_start").onclick = start
        //绑定暂停按钮事件
        document.getElementById("local_pause").onclick = pause
        //绑定结束按钮事件
        document.getElementById("local_stop").onclick = stop
    }




    this.init = init

}
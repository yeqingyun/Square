 var Square = function () {
    this.data = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    this.classData = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    this.dir = 0

    this.orgin = {
        x: 0,
        y: 0
    }
}

Square.prototype.canDown = function (valid) {
    var testDown = {
        x: this.orgin.x + 1,
        y: this.orgin.y,
    }
    return valid(testDown, this.data)
}

Square.prototype.canLeft = function (valid) {
    var testLeft = {
        x: this.orgin.x,
        y: this.orgin.y - 1,
    }
    return valid(testLeft, this.data)
}

Square.prototype.canRight = function (valid) {
    var testRight = {
        x: this.orgin.x,
        y: this.orgin.y + 1,
    }
    return valid(testRight, this.data)
}

Square.prototype.canRotate = function (valid) {
    var d = (this.dir + 1) % 4
    return valid(this.orgin, this.rotates[d])
}

Square.prototype.down = function () {
    this.orgin.x += 1
}

Square.prototype.left = function () {
    this.orgin.y -= 1
}

Square.prototype.right = function () {
    this.orgin.y += 1
}

Square.prototype.rotate = function (num) {
    if (!num)
        num = 1
    this.dir = (this.dir + num) % 4
    this.data = this.rotates[this.dir]
}
export default Square
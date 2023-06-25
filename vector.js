function Vector( x, y ){
    this.x = x;
    this.y = y;
}

// suma de vectores, other = otro vector
Vector.prototype.plus = function (other) {
    return new Vector(this.x + other.x, this.y + other.y);
}

// multiplica el vector por un factor
Vector.prototype.times = function (factor) {
    return new Vector(this.x * factor, this.y * factor);
}
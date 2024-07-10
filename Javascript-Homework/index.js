function triangleArea(sides) {
    if (sides.length != 3) {
        console.log("Error");
    }
    else {
        const [a, b, c] = sides;
        const s = (a + b + c) / 2;
        const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        return area;
    }
}

let sides = [4, 5, 6];
console.log(triangleArea(sides));
function triangleArea(sides) {
    if (sides.length != 3) {
        console.log("Error");
        return null;
    }
    else { // Heron's Formula
        const [a, b, c] = sides;
        const s = (a + b + c) / 2;
        const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        return area;
    }
}

let sides = [4, 5, 6];
console.log(triangleArea(sides));

// Fib
function fib() {
    // start with a = 0 and b = 1
    let a = 0;
    let b = 1;
    let c;
    console.log(a);
    console.log(b);

    // now loop and stop at 10, so 8 more
    for (let i = 0; i < 8; ++i) {
        c = a + b; 
        console.log(c);
        a = b;
        b = c;
    }
}

fib();
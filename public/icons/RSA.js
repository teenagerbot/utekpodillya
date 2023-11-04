let isPrime = function(n) {
    if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) return false;
    if (n == leastFactor(n)) return true;
    return false;
}

leastFactor = function(n) {
    if (isNaN(n) || !isFinite(n)) return NaN;
    if (n == 0) return 0;
    if (n % 1 || n * n < 2) return 1;
    if (n % 2 == 0) return 2;
    if (n % 3 == 0) return 3;
    if (n % 5 == 0) return 5;
    var m = Math.sqrt(n);
    for (var i = 7; i <= m; i += 30) {
        if (n % i == 0) return i;
        if (n % (i + 4) == 0) return i + 4;
        if (n % (i + 6) == 0) return i + 6;
        if (n % (i + 10) == 0) return i + 10;
        if (n % (i + 12) == 0) return i + 12;
        if (n % (i + 16) == 0) return i + 16;
        if (n % (i + 22) == 0) return i + 22;
        if (n % (i + 24) == 0) return i + 24;
    }
    return n;
}

function isCoprime (a, b) {

    var num;
    while ( b ) {
        num = a % b;
        a = b;
        b = num;
    }
    if (Math.abs(a) == 1) {
        return true;
    }
    return false;
}

function encode(string, n, d) {
    // Show ASCII index of leter
    console.log('\nASCII index of your letters');
    for (let i = 0; i < string.length; i++) {
        console.log(string[i] + ' - ' + string.charCodeAt(i));
    }
    
    // Endcode message
    let encode_massege = [];

    console.log('\nEncode number letters');

    for (let i = 0, counter = 1; i < string.length; i++, counter++) {
        ASCII_letter = Number(string.charCodeAt(i));
        
        console.log('C(' + counter + ') = ((' + ASCII_letter + '^' + d + ')mod' + n + ' = ' + Math.pow(ASCII_letter, d) % n);
        
        encode_massege.push(Math.pow(ASCII_letter, d) % n);
    }

    // From ASCII to char
    console.log('\nFrom ASCII code to char');

    let result_text = "";

    for (let i = 0; i < encode_massege.length; i++) {
        char_letter = String.fromCharCode(encode_massege[i])

        console.log(encode_massege[i] + ' - ' + char_letter);

        result_text = result_text + String(char_letter);
    }

    console.log('\nEncode message: ' + char_letter + '\n');

    return encode_massege;
}

function decode(message, open_key) {
    let decode_massege = '',
        decode_ASCII = []; 

    // From ASCII to char
    console.log('\nFrom ASCII code to char');
    
    for (let i = 0, counter = 1; i < message.length; i++, counter++) {
        console.log('C(' + counter + ') = ((' + message[i] + '^' + open_key[0] + ')mod' + open_key[1] + ' = ' + Math.pow(message[i], open_key[0]) % open_key[1]);
        
        decode_ASCII.push(Math.pow(message[i], open_key[0]) % open_key[1]);
    }

    // From ASCII to char
    console.log('\nFrom ASCII code to char');

    for (let i = 0; i < decode_ASCII.length; i++) {
        char_letter = String.fromCharCode(decode_ASCII[i])

        console.log(decode_ASCII[i] + ' - ' + char_letter);

        decode_massege = decode_massege + String(char_letter);
    }

    console.log('\nEncode message: ' + decode_massege + '\n');


    return decode_ASCII;
}

// ==========================
// Enter your p and q here
p = 17;
q = 7;
mail = 'SHUTKOVADI';

// Define other variables
n = p * q;
f = (p - 1 ) * (q - 1);
e = 0;
d = 0;

// Show other variables values
console.log('p = ' + p);
console.log('q = ' + q);
console.log('n = ' + n);
console.log('f = ' + f);

// Find variable e
for (let i = 1; i < f; i++) {
    if (isPrime(i) == true && isCoprime(i, f) == true) {
        console.log('e = ' + i);
        e = i;
        break;
    }
}

// Find variable d
for (let i = 1; ;i++) {
    if ((e*i) % f == 1) {
        console.log('d = ' + i);
        d = i;
        break;
    }
}

let open_key = [e, n],
    close_key = [d, n];

console.log('Open key {' + open_key[0] + ', ' + open_key[1] +'}');
console.log('Close key {' + close_key[0] + ', ' + close_key[1] +'}');

// Encode proces
let encode_massege = encode(mail, n, d);

decode(encode_massege, open_key);
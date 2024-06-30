const readline = require('readline');
const fs = require('fs');

// Create the readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

const args = process.argv.slice(2);

// Function to print the entire file
function printFile(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file ${filePath}:`, err.message);
            return;
        }
        console.log(data);
    });
}

// Function to print lines with line numbers
function printLinesWithNumbers() {
    let i = 1;
    rl.on('line', (line) => {
        console.log(`${i} ${line}`);
        i++;
    });
}

// Function to print lines with blank lines in between
function printLinesWithBlanks() {
    let i = 1;
    rl.on('line', (line) => {
        console.log(`${i} ${line}\n`);
        i++;
    });
}

// Function to print lines from standard input
function printLines() {
    rl.on('line', (line) => {
        console.log(line);
    });
}

// Main function to handle command-line arguments
function main() {
    if (args.length === 0) {
        console.log('Usage: node cccat.js [-n | -b | -] [file1 file2 ...]');
        process.exit(1);
    }

    switch (args[0]) {
        case '-':
            printLines();
            rl.on('close', () => process.exit(0));
            break;
        case '-n':
            printLinesWithNumbers();
            rl.on('close', () => process.exit(0));
            break;
        case '-b':
            printLinesWithBlanks();
            rl.on('close', () => process.exit(0));
            break;
        default:
            args.forEach(filePath => {
                printFile(filePath);
            });
            rl.close();
            break;
    }
}

// Run the main function
main();

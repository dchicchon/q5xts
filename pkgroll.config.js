module.exports = {
    input: 'src/index.ts', // The entry file of your package
    output: {
        dir: 'dist', // The directory where the output bundle will be placed
        format: 'cjs', // CommonJS module format for npm
    },
    extensions: ['.ts'], // Specify TypeScript files to be processed
};
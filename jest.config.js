/**
 * Configuración de Jest para tests
 * - Usa Node como testEnvironment
 - Busca tests en la carpeta tests/
 - Genera coverage automáticamente
 */
export default {
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.js'],
    coveragePathIgnorePatterns: ['/node_modules/'],
    collectCoverageFrom: [
        'src/**/*.js',
        '!src/server.js', // No testear la función start(), solo la lógica
        '!src/swagger.json',
    ],
    verbose: true,
    bail: false,
    forceExit: true,
    testTimeout: 10000,
};

export function rotateRight90(matrix) {
    let result = [];
    for (let i = matrix.length - 1; i >= 0; i--) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (!result[j]) {
                result[j] = [];
            }
            result[j].push(matrix[i][j]);
        }
    }
    return result;
}
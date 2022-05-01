import findPares from './find-pares'
import findOnlyUnique from './find-only-unique'

export default function DemoMod(taskArr) {

    let sourceTable =
        [
            [0, 0, 0, 0],
            [0, 0, 0, 1],
            [0, 0, 1, 0],
            [0, 0, 1, 1],
            [0, 1, 0, 0],
            [0, 1, 0, 1],
            [0, 1, 1, 0],
            [0, 1, 1, 1],
            [1, 0, 0, 0],
            [1, 0, 0, 1],
            [1, 0, 1, 0],
            [1, 0, 1, 1],
            [1, 1, 0, 0],
            [1, 1, 0, 1],
            [1, 1, 1, 0],
            [1, 1, 1, 1],
        ]

    let task = []

    if (taskArr) {
        task = [...taskArr]
    }
    else {
        task = [0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1]
    }

    let tableOnlyTrue = []
    for (let i = 0; i < sourceTable.length; i++) {
        if (task[i] === 1) {
            tableOnlyTrue.push([...sourceTable[i]])
        }
    }

    // ---------------------------
    // Ищем пары (1 раз)
    let tableAfterFindPares = []
    tableAfterFindPares = [...findPares(tableOnlyTrue)]
    console.log(tableAfterFindPares)

    // ----------------------------
    // Ищем пары (2 раз)
    let tableAfterFindPares2 = []
    let resultTable = []

    let vseDlyaKogoNashliPari = []

    for (let i = 0; i < tableAfterFindPares.length; i++) {
        for (let j = i + 1; j < tableAfterFindPares.length; j++) {
            let amountOfMismatches = 0;
            let mismatchIndex = -1
            for (let k = 0; k < tableAfterFindPares[i].length; k++) {
                if (tableAfterFindPares[i][k] !== tableAfterFindPares[j][k]) {
                    amountOfMismatches += 1;
                    mismatchIndex = k;
                }
            }
            if (amountOfMismatches === 1) {
                let reformedRow = [...tableAfterFindPares[i]]
                reformedRow[mismatchIndex] = 'x'
                resultTable.push([...reformedRow])
                vseDlyaKogoNashliPari.push(tableAfterFindPares[i])
                vseDlyaKogoNashliPari.push(tableAfterFindPares[j])
            }
            amountOfMismatches = 0;
            mismatchIndex = -1
        }
    }
    tableAfterFindPares2 = resultTable

    let vseDlyaKogoNENashliPari = []
    for (let i = 0; i < tableAfterFindPares.length; i++) {
        let nashli = vseDlyaKogoNashliPari.find(item => {
            return (
                item[0] === tableAfterFindPares[i][0] &&
                item[1] === tableAfterFindPares[i][1] &&
                item[2] === tableAfterFindPares[i][2] &&
                item[3] === tableAfterFindPares[i][3]
            )
        })

        if (!nashli) {
            vseDlyaKogoNENashliPari.push(tableAfterFindPares[i])
        }
    }

    // -------------------------------
    // Если длинна полученого массива (после того как мы искали пары 2 раз) равна 0 (мы не нашли ни одной пары)
    // То для дальнейших вычислений мы берем массив который получили когда искали пары 1 раз
    // НО если длина массива после склеивание во второй раз не равна 0 - мы уже можем получить ядро
    let CORE_ARR = []
    if (tableAfterFindPares2.length !== 0) {
        CORE_ARR = [...findOnlyUnique(tableAfterFindPares2.length !== 0 ? tableAfterFindPares2 : tableAfterFindPares)]
    }

    // -------------------------------
    // В МДНФ записываем сначала ядро
    let MDNF = 'f = '
    for (let i = 0; i < CORE_ARR.length; i++) {
        for (let j = 0; j < CORE_ARR[i].length; j++) {
            if (CORE_ARR[i][j] !== 'x') {
                if (CORE_ARR[i][j] === 0) {
                    if (j === 0) MDNF += '!a'
                    if (j === 1) MDNF += '!b'
                    if (j === 2) MDNF += '!c'
                    if (j === 3) MDNF += '!d'
                }
                if (CORE_ARR[i][j] === 1) {
                    if (j === 0) MDNF += 'a'
                    if (j === 1) MDNF += 'b'
                    if (j === 2) MDNF += 'c'
                    if (j === 3) MDNF += 'd'
                }
            }
        }
        MDNF += ' v '
    }

    // --------------------------------------------
    for (let i = 0; i < vseDlyaKogoNENashliPari.length; i++) {
        for (let j = 0; j < vseDlyaKogoNENashliPari[i].length; j++) {
            if (vseDlyaKogoNENashliPari[i][j] !== 'x') {
                if (vseDlyaKogoNENashliPari[i][j] === 0) {
                    if (j === 0) MDNF += '!a'
                    if (j === 1) MDNF += '!b'
                    if (j === 2) MDNF += '!c'
                    if (j === 3) MDNF += '!d'
                }
                if (vseDlyaKogoNENashliPari[i][j] === 1) {
                    if (j === 0) MDNF += 'a'
                    if (j === 1) MDNF += 'b'
                    if (j === 2) MDNF += 'c'
                    if (j === 3) MDNF += 'd'
                }
            }
        }
        MDNF += ' v '
    }

    MDNF = MDNF.slice(0, -2)


    return [sourceTable, task, tableOnlyTrue, tableAfterFindPares, tableAfterFindPares2, MDNF]
}
import findPares from './find-pares'
import findOnlyUnique from './find-only-unique'
import { sourceTableForFourImplicants } from './srcTables'
import { fromNumToLetterForFourImplicant } from './fromNumToLetter'
import sortByAmount from './sort-by-amount'

export default function calc(amountImplicants, task) {
    let sourceTable = []
    let result = {
        sourceTable: [],
        task: [],
        tableOnlyTrue: [],
        foundPares: [],
        lastTableWhereNotFoundPares: [],
        mdnf: '',
        tablePokritiya: [],
        core: [],
        coreArrIndexes: [],
        dopImplicants: [],
        resultArr: []
    }

    // task = [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1]
    result.task = task
    if (amountImplicants === 4) {
        sourceTable = sourceTableForFourImplicants
        result.sourceTable = sourceTable
    }

    let tableOnlyTrue = []
    for (let i = 0; i < sourceTable.length; i++) {
        if (task[i] === 1) {
            tableOnlyTrue.push([...sourceTable[i]])
        }
    }

    result.tableOnlyTrue = tableOnlyTrue

    // ---------------------------
    // Ищем пары

    let srcArr = sortByAmount(result.tableOnlyTrue)
    let lastTableWhereNotFoundPares = []
    let lastTableWhereNotFoundPares2 = []
    let haveParesArr = []

    while (srcArr.length > 0) {
        let tempResult = []
        for (let i = 0; i < srcArr.length; i++) {
            const [res, hasPares] = findPares((i + 1) !== srcArr.length ? srcArr[i].concat(srcArr[i + 1]) : srcArr[i])
            tempResult = findOnlyUnique(tempResult.concat([...res]))

            haveParesArr = haveParesArr.concat(hasPares)
        }

        lastTableWhereNotFoundPares2 = lastTableWhereNotFoundPares
        lastTableWhereNotFoundPares = srcArr
        srcArr = tempResult

        if (srcArr.length > 0) {
            result.foundPares.push(findOnlyUnique(tempResult))
        }
        else {
            result.lastTableWhereNotFoundPares = lastTableWhereNotFoundPares2
        }

        srcArr = sortByAmount(srcArr)
    }

    // Таблица покрытия
    let copyFoundPares = [...result.foundPares]
    copyFoundPares.splice(-1, 1)

    let notFound = []
    for (let i = 0; i < copyFoundPares.length; i++) {
        for (let j = 0; j < copyFoundPares[i].length; j++) {
            let h = -1
            h = haveParesArr.findIndex(item => {
                if (item.join('') === copyFoundPares[i][j].join('')) {
                }
                return item.join('') === copyFoundPares[i][j].join('')
            })
            if (h === -1) {
                notFound.push(copyFoundPares[i][j])
            }
        }
    }

    console.log(result.foundPares[result.foundPares.length - 1])
    let lastWhereFound = result.foundPares[result.foundPares.length - 1].concat(notFound)
    console.log(findOnlyUnique(lastWhereFound))

    let testARROBJ = []
    for (let i = 0; i < result.tableOnlyTrue.length; i++) {
        let markArr = []
        for (let j = 0; j < lastWhereFound.length; j++) {
            let amountMatches = 0;

            for (let k = 0; k < 4; k++) {
                if (parseInt(result.tableOnlyTrue[i][k]) === lastWhereFound[j][k]) amountMatches++
            }

            // FIX
            if (amountMatches >= 4 - result.foundPares.length) {
                markArr.push("+")
            }
            else {
                markArr.push("-")
            }
        }
        testARROBJ.push({ [result.tableOnlyTrue[i]]: markArr })
    }

    result.tablePokritiya = testARROBJ

    // ------------------
    // CORE
    let coreArr = []
    let coreArrIndexes = []
    for (let i = 0; i < testARROBJ.length; i++) {
        let sumTrue = 0
        let lastIndex = 0
        for (let j = 0; j < testARROBJ[i][result.tableOnlyTrue[i]].length; j++) {
            if (testARROBJ[i][result.tableOnlyTrue[i]][j] === '+') {
                sumTrue++
                lastIndex = j
            }
        }
        if (sumTrue === 1) {
            coreArr.push(lastWhereFound[lastIndex])
            coreArrIndexes.push(lastIndex)
        }
    }

    result.core = coreArr
    result.coreArrIndexes = coreArrIndexes
    // ------------------

    // LAST IMPLICANS
    let withoutCore = []
    for (let i = 0; i < testARROBJ.length; i++) {
        let sumTrue = 0
        let lastIndex = 0
        for (let j = 0; j < testARROBJ[i][result.tableOnlyTrue[i]].length; j++) {
            if (testARROBJ[i][result.tableOnlyTrue[i]][j] === '+') {
                sumTrue++
                lastIndex = j
            }
        }
        if (sumTrue === 1) {
            // coreArr.push(lastWhereFound[lastIndex])
        }
        else {
            withoutCore.push(result.tableOnlyTrue[i])
        }
    }

    let withoutCoreAndSimilar = [...withoutCore]

    for (let i = 0; i < withoutCore.length; i++) {
        for (let j = 0; j < testARROBJ.length; j++) {
            for (let key in testARROBJ[j]) {
                if (key === withoutCore[i]) {
                    for (let k = 0; k < testARROBJ[j][key].length; k++) {
                        if (testARROBJ[j][key][k] === "+") {
                            for (let l = 0; l < coreArrIndexes.length; l++) {
                                if (k === coreArrIndexes[l]) {
                                    withoutCoreAndSimilar = withoutCoreAndSimilar.filter(item => {
                                        return item != key
                                    })
                                }
                            }
                        }
                    }
                }
            }
        }
    }


    let dopImplicants = []
    for (let i = 0; i < withoutCoreAndSimilar.length; i++) {
        for (let j = 0; j < testARROBJ.length; j++) {
            for (let key in testARROBJ[j]) {
                if (key === withoutCoreAndSimilar[i]) {
                    for (let k = testARROBJ[j][key].length; k > 0; k--) {
                        if (testARROBJ[j][key][k] === "+") {
                            dopImplicants.push(result.foundPares[result.foundPares.length - 1][k])
                            break
                        }
                    }
                }
            }
        }
    }

    result.dopImplicants = dopImplicants

    result.core = findOnlyUnique(result.core)
    result.dopImplicants = findOnlyUnique(result.dopImplicants)

    result.mdnf = fromNumToLetterForFourImplicant(result.core.concat(result.dopImplicants))
    result.mdnf = result.mdnf.slice(0, -2)
    result.resultArr = result.core.concat(result.dopImplicants)

    return result
}
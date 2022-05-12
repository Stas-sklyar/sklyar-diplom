import findPares from './find-pares'
import findOnlyUnique from './find-only-unique'
import { sourceTableForFourImplicants } from './srcTables'
import { fromNumToLetterForFourImplicant } from './fromNumToLetter'

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
    // Ищем пары (1 раз)

    let tempArr = tableOnlyTrue
    let lastTableWhereNotFoundPares = []
    let lastTableWhereNotFoundPares2 = []

    while (tempArr.length > 0) {
        let tempResult = findPares(tempArr)
        lastTableWhereNotFoundPares2 = lastTableWhereNotFoundPares
        lastTableWhereNotFoundPares = tempArr
        tempArr = tempResult
        if (tempArr.length > 0) {
            result.foundPares.push(findOnlyUnique(tempResult))
        }
        else {
            result.lastTableWhereNotFoundPares = lastTableWhereNotFoundPares2
        }
    }

    let test1 = result.lastTableWhereNotFoundPares

    let test1String = []
    for (let i = 0; i < test1.length; i++) {
        let str = ''
        for (let j = 0; j < test1[i].length; j++) {
            str += test1[i][j]
        }
        test1String.push(str)
    }

    let lastWhereFound = result.foundPares[result.foundPares.length - 1]


    let testARROBJ = []
    for (let i = 0; i < test1String.length; i++) {
        let markArr = []
        for (let j = 0; j < lastWhereFound.length; j++) {
            let amountMatches = 0;

            for (let k = 0; k < 4; k++) {
                if (parseInt(test1String[i].split('')[k]) === lastWhereFound[j][k]) amountMatches++
            }

            // FIX
            if (amountMatches >= 4 - result.foundPares.length) {
                markArr.push("+")
            }
            else {
                markArr.push("-")
            }
        }
        testARROBJ.push({ [test1String[i]]: markArr })
    }

    result.tablePokritiya = testARROBJ

    // ------------------
    // CORE
    let coreArr = []
    let coreArrIndexes = []
    for (let i = 0; i < testARROBJ.length; i++) {
        let sumTrue = 0
        let lastIndex = 0
        for (let j = 0; j < testARROBJ[i][test1String[i]].length; j++) {
            if (testARROBJ[i][test1String[i]][j] === '+') {
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
        for (let j = 0; j < testARROBJ[i][test1String[i]].length; j++) {
            if (testARROBJ[i][test1String[i]][j] === '+') {
                sumTrue++
                lastIndex = j
            }
        }
        if (sumTrue === 1) {
            // coreArr.push(lastWhereFound[lastIndex])
        }
        else {
            withoutCore.push(test1String[i])
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
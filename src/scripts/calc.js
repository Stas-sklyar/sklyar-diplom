import findPares from './find-pares'
import findOnlyUnique from './find-only-unique'
import { sourceTableForFourImplicants } from './src-table'
import fromNumToLetterForFourImplicant from './from-num-to-letter'
import sortByAmount from './sort-by-amount'

export default function calc(amountOfImplicants, task) {
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
        resultArr: [],
        foundParesIndexes: []
    }

    let sourceTable = []
    result.task = task
    if (amountOfImplicants === 4) {
        sourceTable = sourceTableForFourImplicants
        result.sourceTable = sourceTable
    }

    // Формируем таблиц где F = 1
    let tableOnlyTrue = []
    for (let i = 0; i < sourceTable.length; i++) {
        if (task[i] === 1) {
            tableOnlyTrue.push([...sourceTable[i]])
        }
    }
    result.tableOnlyTrue = tableOnlyTrue

    // ---------------------------
    // Ищем пары

    let sourceTableForFindingPairs = sortByAmount(result.tableOnlyTrue)
    let lastTableWhereNotFoundPares = []
    let lastTableWhereNotFoundPares2 = []
    let allImplicantsWhichHavePares = []
    let numberOfIterations = 1

    while (sourceTableForFindingPairs.length > 0) {
        let foundPairsInCurrentIteration = []
        for (let i = 0; i < sourceTableForFindingPairs.length; i++) {
            const [foundImplicantsAtCurrentIteration, implicantsWhichHavePare, indexesOfImplicantsWhichHavePare] =
                findPares(
                    (i + 1) !== sourceTableForFindingPairs.length
                        ? sourceTableForFindingPairs[i].concat(sourceTableForFindingPairs[i + 1])
                        : sourceTableForFindingPairs[i],
                    numberOfIterations === 1
                        ? result.tableOnlyTrue
                        : result.foundPares[result.foundPares.length - 1]
                )
            foundPairsInCurrentIteration = findOnlyUnique(foundPairsInCurrentIteration.concat([...foundImplicantsAtCurrentIteration]))

            allImplicantsWhichHavePares = allImplicantsWhichHavePares.concat(implicantsWhichHavePare)

            result.foundParesIndexes = result.foundParesIndexes.concat(indexesOfImplicantsWhichHavePare)
        }

        lastTableWhereNotFoundPares2 = lastTableWhereNotFoundPares
        lastTableWhereNotFoundPares = sourceTableForFindingPairs
        sourceTableForFindingPairs = foundPairsInCurrentIteration

        if (sourceTableForFindingPairs.length > 0) {
            result.foundPares.push(findOnlyUnique(foundPairsInCurrentIteration))
        }
        else {
            result.lastTableWhereNotFoundPares = lastTableWhereNotFoundPares2
        }

        sourceTableForFindingPairs = sortByAmount(sourceTableForFindingPairs)
        numberOfIterations++
        result.foundParesIndexes.filter(item => item.join('') !== '-1-1')
    }

    // Таблица покрытия

    // Ишем импликанты которые не имеют пару
    let foundParesArrWithoutLastFoundParesArr = [...result.foundPares]
    foundParesArrWithoutLastFoundParesArr.splice(-1, 1)

    let implicantsWhichNotHavePares = []
    for (let i = 0; i < foundParesArrWithoutLastFoundParesArr.length; i++) {
        for (let j = 0; j < foundParesArrWithoutLastFoundParesArr[i].length; j++) {
            let h = -1
            h = allImplicantsWhichHavePares.findIndex(item => {
                if (item.join('') === foundParesArrWithoutLastFoundParesArr[i][j].join('')) {
                }
                return item.join('') === foundParesArrWithoutLastFoundParesArr[i][j].join('')
            })
            if (h === -1) {
                implicantsWhichNotHavePares.push(foundParesArrWithoutLastFoundParesArr[i][j])
            }
        }
    }

    let leftSideOfCoverageTable = result.foundPares[result.foundPares.length - 1].concat(implicantsWhichNotHavePares)
    result.leftSideTablePokritiya = leftSideOfCoverageTable

    let coverageTable = []
    for (let i = 0; i < result.tableOnlyTrue.length; i++) {
        let arrOfLabels = []
        for (let j = 0; j < leftSideOfCoverageTable.length; j++) {
            let amountMatches = 0;

            for (let k = 0; k < 4; k++) {
                if (
                    result.tableOnlyTrue[i][k] === leftSideOfCoverageTable[j][k]
                    || result.tableOnlyTrue[i][k] === 'x'
                    || leftSideOfCoverageTable[j][k] === 'x'
                ) {
                    amountMatches++
                }
            }

            amountMatches >= 4 ? arrOfLabels.push("+") : arrOfLabels.push("-")
        }
        coverageTable.push({ [result.tableOnlyTrue[i]]: arrOfLabels })
    }

    result.tablePokritiya = coverageTable

    // ------------------
    // CORE
    let coreArr = []
    let indexesOfCoreArr = []
    for (let i = 0; i < coverageTable.length; i++) {
        let sumTrue = 0
        let lastIndex = 0
        for (let j = 0; j < coverageTable[i][result.tableOnlyTrue[i]].length; j++) {
            if (coverageTable[i][result.tableOnlyTrue[i]][j] === '+') {
                sumTrue++
                lastIndex = j
            }
        }
        if (sumTrue === 1) {
            coreArr.push(leftSideOfCoverageTable[lastIndex])
            indexesOfCoreArr.push(lastIndex)
        }
    }

    result.core = coreArr
    result.coreArrIndexes = indexesOfCoreArr
    // ------------------

    // LAST IMPLICANS
    let implicantsWithoutCore = []
    for (let i = 0; i < coverageTable.length; i++) {
        let sumTrue = 0
        let lastIndex = 0
        for (let j = 0; j < coverageTable[i][result.tableOnlyTrue[i]].length; j++) {
            if (coverageTable[i][result.tableOnlyTrue[i]][j] === '+') {
                sumTrue++
                lastIndex = j
            }
        }
        if (sumTrue !== 1) {
            implicantsWithoutCore.push(result.tableOnlyTrue[i])
        }
    }

    let withoutCoreAndSimilar = [...implicantsWithoutCore]

    for (let i = 0; i < implicantsWithoutCore.length; i++) {
        for (let j = 0; j < coverageTable.length; j++) {
            for (let key in coverageTable[j]) {
                if (key === implicantsWithoutCore[i]) {
                    for (let k = 0; k < coverageTable[j][key].length; k++) {
                        if (coverageTable[j][key][k] === "+") {
                            for (let l = 0; l < indexesOfCoreArr.length; l++) {
                                if (k === indexesOfCoreArr[l]) {
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

    // Ищем дополнительные импликанты в МДНФ
    let dopImplicants = []
    for (let i = 0; i < withoutCoreAndSimilar.length; i++) {
        for (let j = 0; j < coverageTable.length; j++) {
            for (let key in coverageTable[j]) {
                if (key === withoutCoreAndSimilar[i]) {
                    for (let k = coverageTable[j][key].length; k > 0; k--) {
                        if (coverageTable[j][key][k] === "+") {
                            dopImplicants.push(result.foundPares[result.foundPares.length - 1][k])
                            break
                        }
                    }
                }
            }
        }
    }


    // Формируем результат
    result.dopImplicants = dopImplicants
    result.core = findOnlyUnique(result.core)
    result.dopImplicants = findOnlyUnique(result.dopImplicants)
    result.mdnf = fromNumToLetterForFourImplicant(result.core.concat(result.dopImplicants))
    result.mdnf = result.mdnf.slice(0, result.mdnf.length - 3)
    result.resultArr = result.core.concat(result.dopImplicants)

    return result
}
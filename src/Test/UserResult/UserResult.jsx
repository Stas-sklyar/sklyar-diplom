import s from '../Test.module.scss'
import Divider from '@mui/material/Divider'

function UserResult({ userResult }) {

    return (
        <section>
            <h3>Ваш бал: {userResult.userGrade.totalResult}</h3>

            {userResult.step1.notFoundPares.length > 0 &&
                <p>
                    На першому кроці ви не знайшли такі пари:
                    <br></br>
                    {userResult.step1.notFoundPares.map((item, index) => (
                        <span>[{item[0] + ' - ' + item[1]}]
                            {userResult.step1.notFoundPares.length - 1 === index ? ' ' : ', '}
                        </span>
                    ))}
                </p>
            }

            {userResult.step1.mismatchedPairs.length > 0 &&
                <p>Також пари, які ви знайшли неправильно:
                    <br></br>
                    {userResult.step1.mismatchedPairs.map((item, index) => (
                        <span>[{item[0] + ' - ' + item[1]}]
                            {userResult.step1.mismatchedPairs.length - 1 === index ? ' ' : ', '}
                        </span>
                    ))}
                </p>
            }
            <p>За перший крок ви отримуєте - {userResult.userGrade.userGradeForStep1} балів із 30</p>
            <Divider />


            {userResult.step2.notFoundImplicants.length > 0 &&
                <p>На другому кроці ви не знайшли такі імпліканти:
                    <br></br>
                    {userResult.step2.notFoundImplicants.map((item, index) => (
                        <span>[{item}]
                            {userResult.step2.notFoundImplicants.length - 1 === index ? ' ' : ', '}
                        </span>
                    ))}
                </p>
            }
            {userResult.step2.mismatchedImplicants.length > 0 &&
                <p>Також імпліканти, які ви знайшли неправильно:
                    <br></br>
                    {userResult.step2.mismatchedImplicants.map((item, index) => (
                        <span>[{item}]
                            {userResult.step2.notFoundImplicants.length - 1 === index ? ' ' : ', '}
                        </span>
                    ))}
                </p>
            }
            <p>За другий крок ви отримуєте - {userResult.userGrade.userGradeForStep2} балів із 25</p>
            <Divider />


            {userResult.step3.notFoundImplicants.length > 0 &&
                <p>На третьому кроці ви не знайшли такі імпліканти, які належать до ядра:
                    <br></br>
                    {userResult.step3.notFoundImplicants.map((item, index) => (
                        <span>[{item}]
                            {userResult.step3.notFoundImplicants.length - 1 === index ? ' ' : ', '}
                        </span>
                    ))}
                </p>
            }
            {userResult.step3.mismatchedImplicants.length > 0 &&
                <p>Також імпліканти, які ви знайшли неправильно:
                    <br></br>
                    {userResult.step3.mismatchedImplicants.map((item, index) => (
                        <span>[{item}]
                            {userResult.step3.notFoundImplicants.length - 1 === index ? ' ' : ', '}
                        </span>
                    ))}
                </p>
            }
            <p>За третій крок ви отримуєте - {userResult.userGrade.userGradeForStep3} балів із 25</p>
            <Divider />


            {userResult.step4.notFoundItemsOfMDNF.length > 0 &&
                <p>На четвертому кроці ви не знайшли ?такі імпліканти, які належать до МДНФ?:
                    <br></br>
                    {userResult.step4.notFoundItemsOfMDNF.map((item, index) => (
                        <span>[{item}]
                            {userResult.step4.notFoundItemsOfMDNF.length - 1 === index ? ' ' : ', '}
                        </span>
                    ))}
                </p>
            }
            {userResult.step4.mismatchedItemsOfMDNF.length > 0 &&
                <p>Також ?імпліканти?, які ви знайшли неправильно:
                    <br></br>
                    {userResult.step4.mismatchedItemsOfMDNF.map((item, index) => (
                        <span>[{item}]
                            {userResult.step4.mismatchedItemsOfMDNF.length - 1 === index ? ' ' : ', '}
                        </span>
                    ))}
                </p>
            }
            <p>За четвертий крок ви отримуєте - {userResult.userGrade.userGradeForStep4} балів із 25</p>

        </section>
    )
}

export default UserResult
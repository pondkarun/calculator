import Head from 'next/head'
import { useState } from 'react'

const Calculator = () => {
    const [result, setResult] = useState('0')
    const [memory, setMemory] = useState(null)
    const [operator, setOperator] = useState(null)
    const [clearLog, setclearLog] = useState(false)

    /* List ปุ่ม */
    const calcBtnRowList = [
        [
            {
                class: "calc_btn",
                value: "c",
            },
            {
                class: "calc_btn",
                value: "+/-",
            },
            {
                class: "calc_btn",
                value: "%",
            },
            {
                class: "calc_btn",
                value: "÷",
            },
        ],
        [
            {
                class: "calc_btn",
                value: "7",
            },
            {
                class: "calc_btn",
                value: "8",
            },
            {
                class: "calc_btn",
                value: "9",
            },
            {
                class: "calc_btn",
                value: "x",
            },
        ],
        [
            {
                class: "calc_btn",
                value: "4",
            },
            {
                class: "calc_btn",
                value: "5",
            },
            {
                class: "calc_btn",
                value: "6",
            },
            {
                class: "calc_btn",
                value: "-",
            },
        ],
        [
            {
                class: "calc_btn",
                value: "1",
            },
            {
                class: "calc_btn",
                value: "2",
            },
            {
                class: "calc_btn",
                value: "3",
            },
            {
                class: "calc_btn",
                value: "+",
            },
        ],
        [
            {
                class: "calc_btn bouble",
                value: "0",
            },
            {
                class: "calc_btn",
                value: ".",
            },
            {
                class: "calc_btn",
                value: "=",
            },
        ],
    ]

    const handleClick = (value) => {
        if (value >= 0 && value <= 9) pushResult(value);
        else if (value === "c") setResult('0');
        else if (value === "+/-") setResult(parseFloat(result) * -1)
        else if (value === "%") setResult((parseFloat(result) / 100));
        else if (value === "÷") pushOperator(value);
        else if (value === "x") pushOperator(value);
        else if (value === "-") pushOperator(value);
        else if (value === "+") pushOperator(value);
        else if (value === "=") operation();
    }
    const pushResult = (value) => {
        // console.log('pushResult :>> ', value);
        if (clearLog) {
            setclearLog(false)
            setResult(value)
        } else if (result != 0) {
            setResult(result + value)
        } else {
            setResult(value)
        }
    }

    const pushOperator = (value) => {
        setMemory(result) //เก็บค่า ของ result
        setResult('0')
        setOperator(value)
    }

    const operation = () => {
        setMemory(null)
        setOperator(null)
        setclearLog(true)
        setResult(calResult(parseFloat(memory), parseFloat(result), operator))
    }
    const calResult = (valA, valB, opr) => {
        switch (opr) {
            case "+":
                return valA + valB;
            case "-":
                return valA - valB;
            case "x":
                return valA * valB;
            case "÷":
                return valA / valB;
            default:
                return '0';
        }
    }

    return (
        <div className="calculator">
            <Head>
                <title>Calculator</title>
            </Head>
            <div className="wrapper">
                <section className="screen">
                    <div className="current">{result}</div>
                </section>
                <section className="calc-btn-row">
                    {calcBtnRowList.map((item, key) => (
                        <div className="calc_btn_row" key={key}>
                            {item.map((e, index) => (
                                <button key={index} className={e.class} onClick={() => handleClick(e.value)}>{e.value}</button>
                            ))}
                        </div>
                    ))}
                </section>

            </div>
        </div>
    )
}

export default Calculator;
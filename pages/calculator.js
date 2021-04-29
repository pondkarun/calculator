import Head from 'next/head'
import { useState } from 'react'
import Layout from '../components/Layout'
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Axios from 'axios'

const Calculator = () => {
    const [result, setResult] = useState(null)
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
        else if (value === "c") setResult(null);
        else if (value === "+/-") setResult(parseFloat(result) * -1)
        else if (value === "%") setResult((parseFloat(result) / 100));
        else if (value === "÷") pushOperator(value);
        else if (value === "x") pushOperator(value);
        else if (value === "-") pushOperator(value);
        else if (value === "+") pushOperator(value);
        else if (value === "=") operation();
        else if (value === ".") pushDot();
    }
    const pushResult = (value) => {
        // console.log('pushResult :>> ', value);
        if (clearLog) {
            setclearLog(false)
            setResult(value)
        } else if (result) {
            setResult(result + value)
        } else {
            setResult(value)
        }
    }

    const pushOperator = (value) => {
        setMemory(result) //เก็บค่า ของ result
        setResult(null)
        setOperator(value)
    }

    const operation = () => {
        setMemory(null)
        setOperator(null)
        setclearLog(true)
        setResult(calResult(parseFloat(memory), parseFloat(result), operator))
    }

    const pushDot = () => {
        const res = result.toString()
        if (!res.includes('.'))
            setResult(res + ".")
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

    const beforeUpload = (file) => {
        console.log(`file`, file)
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState(null)
    const [file, setFile] = useState(null)
    const handleChange = (info) => {
        console.log(`info`, info)
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageUrl) => {
                setImageUrl(imageUrl)
                console.log(`info.file`, info.file)
                debugger
                setFile(info.file)
                setLoading(false);
            });
        }
    };

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    return (
        <>
            <Head>
                <title>เครื่องคิดเลข</title>
            </Head>
            <Layout>
                <div className="calculator">
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

                <div className="upload">
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : (
                            <div>
                                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>)}
                    </Upload>

                    <button onClick={async () => {
                        try {
                            console.log(`file`, file)
                            var formData1 = new FormData();
                            formData1.append("file", file.originFileObj);

                            await Axios({
                                method: "post",
                                url: `http://localhost:9000/upload?path=demo`,
                                headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwibmFtZSI6IuC4geC4suC4o-C4seC4k-C4ouC5jCIsInNlcm5hbWUiOiLguIHguLDguKXguLHguJnguJXguLDguJrguLjguJXguKPguYwiLCJlbWFpbCI6InBvbmRrYXJ1bkBnbWFpbC5jb20iLCJnZW5kZXIiOiIyIiwiYmlydGhkYXkiOiIxOTk2LTA3LTE3IiwiaW1nIjpudWxsLCJzdGF0dXMiOiIxIiwiaWF0IjoxNjE5Njg0Nzc1fQ.FACz3tPqzpZmntS_5ZY0VZ2yWqnHFREmCw0HuSOI5hE" },
                                config: { headers: { "Content-Type": "multipart/form-data" } },
                                data: formData1
                            })
                        } catch (error) {
                            alert("Error")
                        }
                    }}>Upload</button>
                </div>
            </Layout>
        </ >
    )
}

export default Calculator;
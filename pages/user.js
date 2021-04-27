import Layout from "../components/Layout"
import Head from 'next/head'
import { Form, Input, Button, Select, DatePicker, Radio, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { Notifications } from "../shared/notifications";
import Country from '../service/country-list-th'
import { uuid } from 'uuidv4';
const { Option } = Select;

const User = () => {

    const defaultValueModel = {
        id: null,
        title: null,
        firstname: null,
        lastname: null,
        birthday: null,
        nationaliy: null,
        citizenid: null,
        gender: null,
        prefix: "66",
        phone: null,
        passport: null,
        expectedSalary: null
    }

    const [data, setData] = useState([])
    const [model, setModel] = useState(defaultValueModel)
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(defaultValueModel);
    }, [])

    const onFinish = (val) => {
        console.log(`model`, model)
        if (model.id) {
            const tempData = data;
            const index = data.findIndex(e => e.id == model.id);
            console.log(`index`, index)
            tempData[index] = model
            console.log(`tempData`, tempData)
            setData([])
            setData(tempData)
        } else {
            const tempModel = model;
            tempModel.id = uuid();
            setData([...data, tempModel])
        }
        form.setFieldsValue(defaultValueModel);
        setModel(defaultValueModel)
    }
    const onFinishFailed = (error) => {
        Notifications(`กรอกข้อมูลให้ครบถ้วน`, "warning")
    }

    const autoTab = (value) => {
        /* กำหนดรูปแบบข้อความโดยให้ _ แทนค่าอะไรก็ได้ แล้วตามด้วยเครื่องหมาย
        หรือสัญลักษณ์ที่ใช้แบ่ง เช่นกำหนดเป็น  รูปแบบเลขที่บัตรประชาชน
        4-2215-54125-6-12 ก็สามารถกำหนดเป็น  _-____-_____-_-__
        รูปแบบเบอร์โทรศัพท์ 08-4521-6521 กำหนดเป็น __-____-____
        หรือกำหนดเวลาเช่น 12:45:30 กำหนดเป็น __:__:__
        ตัวอย่างข้างล่างเป็นการกำหนดรูปแบบเลขบัตรประชาชน
        */
        let pattern = new String("_-____-_____-_-__"); // กำหนดรูปแบบในนี้
        let pattern_ex = new String("-"); // กำหนดสัญลักษณ์หรือเครื่องหมายที่ใช้แบ่งในนี้
        let returnText = new String("");
        let obj_l = value.length;
        let obj_l2 = obj_l - 1;
        for (let i = 0; i < pattern.length; i++) {
            if (obj_l2 == i && pattern.charAt(i + 1) == pattern_ex) {
                returnText += value + pattern_ex;
                value = returnText;
            }
        }
        if (obj_l >= pattern.length) {
            value = value.substr(0, pattern.length);
        }
        return value
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (a, b) => <p>{b.title} {b.firstname} {b.lastname}</p>,
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Mobile Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Nationaliy',
            dataIndex: 'nationaliy',
            key: 'nationaliy',
        },
        {
            title: 'Action',
            key: 'action',
            render: (a, b) => (
                <>
                    <a style={{ paddingRight: 5 }} onClick={() => delEditRow(b, "edit")}><EditOutlined /></a>
                    <a onClick={() => delEditRow(b, "del")}><DeleteOutlined /></a>
                </>
            ),
        },
    ];

    const allowInteger = (event, elem) => {
        if (event) {
            if (event.which < 48 || event.which > 57) {
                event.preventDefault();
            }
        }
    }

    const delEditRow = (item, type) => {
        if (type === "edit") {
            console.log(`edit`, item)
            form.setFieldsValue(item);
            setModel(item);
        } else if (type === "del") {
            console.log(`del`, item)
        }
    }


    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const onSelectChange = (item, obj) => {
        console.log('selectedRowKeys changed: ', item);
        console.log('selectedRowKeys obj: ', obj);
        setSelectedRowKeys([selectedRowKeys, ...item]);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };


    return (
        <Layout>
            <Head>
                <title>จัดการ</title>
            </Head>
            <div className="card">
                <div className="card-body">
                    <Form
                        form={form}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <div className="row">
                            <div className="col" />
                            <div className="col-8">

                                <div className="row">
                                    <div className="col-3">
                                        <Form.Item
                                            label="Title"
                                            name="title"
                                            rules={[{ required: true, message: 'Please input your Title!' }]}
                                        >
                                            <Select allowClear onChange={(event) => setModel({ ...model, title: event, })}>
                                                <Option value="Mr.">Mr.</Option>
                                                <Option value="Mrs.">Mrs.</Option>
                                                <Option value="Miss">Miss</Option>
                                                <Option value="Ms.">Ms.</Option>
                                            </Select>
                                        </Form.Item>
                                    </div>
                                    <div className="col-4">
                                        <Form.Item
                                            label="Firstname"
                                            name="firstname"
                                            rules={[{ required: true, message: 'Please input your Firstname!' }]}
                                            onChange={(event) => setModel({ ...model, firstname: event.target.value, })}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </div>
                                    <div className="col-4">
                                        <Form.Item
                                            label="Lastname"
                                            name="lastname"
                                            rules={[{ required: true, message: 'Please input your Lastname!' }]}
                                            onChange={(event) => setModel({ ...model, lastname: event.target.value, })}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-4">
                                        <Form.Item
                                            label="Birthday"
                                            name="birthday"
                                            rules={[{ required: true, message: 'Please input your Birthday!' }]}

                                        >
                                            <DatePicker style={{ width: "100%" }} onChange={(event) => setModel({ ...model, birthday: event, })} />
                                        </Form.Item>
                                    </div>
                                    <div className="col-5">
                                        <Form.Item
                                            label="Nationaliy"
                                            name="nationaliy"
                                        >
                                            <Select showSearch allowClear filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            } onChange={(event) => setModel({ ...model, nationaliy: event, })}>
                                                {Country.map((e, i) => <Option key={i} value={e.name}>{e.name}</Option>)}
                                            </Select>
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <Form.Item
                                            label="Citizenid"
                                            name="citizenid"
                                            onChange={(event) => setModel({ ...model, citizenid: event.target.value, })}
                                        >
                                            <Input onKeyUp={(e) => e.target.value = autoTab(e.target.value)} maxLength={17} placeholder="X-XXXX-XXXXX-XX-X" />
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <Form.Item
                                            label="Gender"
                                            name="gender"
                                        >
                                            <Radio.Group onChange={(event) => setModel({ ...model, gender: event.target.value, })}>
                                                <Radio value="Male">Male</Radio>
                                                <Radio value="Female">Female</Radio>
                                                <Radio value="Unisex">Unisex</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <Form.Item
                                            name="phone"
                                            label="Mobile Phone"
                                            rules={[{ required: true, message: 'Please input your Mobile Phone!' }]}
                                            onChange={(event) => setModel({ ...model, phone: event.target.value, })}
                                        >
                                            <Input addonBefore={
                                                <Form.Item name="prefix" noStyle>
                                                    <Select style={{ width: 70 }} defaultValue="66" value="66" onChange={(event) => setModel({ ...model, prefix: event, })}>
                                                        <Option value="66">+66</Option>
                                                    </Select>
                                                </Form.Item>
                                            } style={{ width: '70%' }} />
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-5">
                                        <Form.Item
                                            label="Passport No"
                                            name="passport"
                                            onChange={(event) => setModel({ ...model, passport: event.target.value, })}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-5">
                                        <Form.Item
                                            label="Expected Salary"
                                            name="expectedSalary"
                                            rules={[{ required: true, message: 'Please input your Expected Salary!' }]}
                                            onChange={(event) => setModel({ ...model, expectedSalary: event.target.value, })}
                                        >
                                            <Input onKeyPress={(event) => allowInteger(event, this)} addonAfter="THB" style={{ width: "100%" }} />
                                        </Form.Item>
                                    </div>
                                    <div className="col-4" />
                                    <div className="col-2">
                                        <Form.Item >
                                            <Button type="primary" htmlType="submit"> Submit</Button>
                                        </Form.Item>
                                    </div>
                                </div>

                            </div>
                            <div className="col" />
                        </div>

                    </Form>
                </div>
            </div>
            <div style={{ padding: 5 }} />
            <div className="card">
                <div>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
                </div>
            </div>

        </Layout >
    )
}

export default User

import Layout from "../components/Layout"
import Head from 'next/head'
import { Form, Input, Button, Select, DatePicker, Radio, Table, Tag, Space } from 'antd';
import { useState } from "react";
const { Option } = Select;

const User = () => {
    const onFinish = () => {

    }
    const onFinishFailed = () => {

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
            render: text => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const onSelectChange = (item , obj) => {
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
                                            <Select allowClear>
                                                <Option value="male">male</Option>
                                                <Option value="female">female</Option>
                                                <Option value="other">other</Option>
                                            </Select>
                                        </Form.Item>
                                    </div>
                                    <div className="col-4">
                                        <Form.Item
                                            label="Firstname"
                                            name="firstname"
                                            rules={[{ required: true, message: 'Please input your Firstname!' }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </div>
                                    <div className="col-4">
                                        <Form.Item
                                            label="Lastname"
                                            name="lastname"
                                            rules={[{ required: true, message: 'Please input your Lastname!' }]}
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
                                            <DatePicker style={{ width: "100%" }} />
                                        </Form.Item>
                                    </div>
                                    <div className="col-5">
                                        <Form.Item
                                            label="Nationaliy"
                                            name="nationaliy"
                                        >
                                            <Select allowClear>
                                                <Option value="male">male</Option>
                                                <Option value="female">female</Option>
                                                <Option value="other">other</Option>
                                            </Select>
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <Form.Item
                                            label="Citizenid"
                                            name="citizenid"
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
                                            <Radio.Group >
                                                <Radio value={1}>Male</Radio>
                                                <Radio value={2}>Female</Radio>
                                                <Radio value={3}>Unisex</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <Form.Item
                                            label="Mobile Phone"
                                            name="phone"
                                            rules={[{ required: true, message: 'Please input your Mobile Phone!' }]}

                                        >
                                            <Input.Group compact>
                                                <Select style={{ width: '30%' }} defaultValue="Home">
                                                    <Option value="Home">Home</Option>
                                                    <Option value="Company">Company</Option>
                                                </Select>
                                                <Input style={{ width: '70%' }} />
                                            </Input.Group>
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-5">
                                        <Form.Item
                                            label="Passport No"
                                            name="Passport"
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
                                        >
                                            <Input addonAfter="THB" />
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

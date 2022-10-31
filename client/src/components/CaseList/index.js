import { Space, Table, Tag, Button, Breadcrumb, Modal, Input, DatePicker, Select, Form, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALL_CASES, QUERY_ALL_USERS } from '../../utils/queries';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ADD_CASE, UPDATE_CASE, REMOVE_CASE } from '../../utils/mutations';
import { Routes, Route } from 'react-router-dom';
import moment from 'moment';
import Dashboard from '../Dashboard';
import CaseItem from '../CaseItem';
import Home from '../../pages/Home';

function CaseList() {

  const { Option } = Select;

  const { loading: loading1, data: caseData } = useQuery(QUERY_ALL_CASES);
  const { data: userData } = useQuery(QUERY_ALL_USERS);

  const [addCase] = useMutation(ADD_CASE);
  const [updateCase] = useMutation(UPDATE_CASE);
  const [removeCase] = useMutation(REMOVE_CASE);

  const [isEditing, setIsEditing] = useState(false);
  const [editingCase, setEditingCase] = useState(null);
  const [cases, setCases] = useState([]);
  const [users, setUsers] = useState([]);
  const [isNew, setIsNew] = useState(false);
  const [newCase, setNewCase] = useState(null);


  useEffect(() => {
    if (caseData) {
      setCases(caseData.cases);
    }

    if (userData) {
      setUsers(userData.users.map((user) => {
        return <Option key={user._id}>{user.firstName}</Option>
      }))
    }

  }, [caseData, userData])


  const dataSource = cases.map((obj) => {
    return {
      "key": obj._id,
      "firstName": obj.firstName,
      "lastName": obj.lastName,
      "dob": obj.dob,
      "bio": obj.bio,
      // "userObj": obj.users,
      "users": obj.users.map((user) => {
        return user._id
      }),
      "userNames": obj.users.map((user) => {
        return user.firstName
      }),
    }
  }
  )

  // console.log(dataSource);

  const handleDeleteCase = (record) => {
    const getId = record.key
    Modal.confirm({
      title: "Are you sure you wanna delete this case and its notes?",
      okText: "YES",
      okType: 'danger',
      onOk: () => {
        // console.log(e)
        removeCase({ variables: { id: getId } })
        window.location.reload();
      }
    })
  }

  const handleNewCase = () => {
    setIsNew(true);
  }

  const resetNewCase = () => {
    setIsNew(false);
    setNewCase(null);
  }

  const handleEditCase = (record) => {
    setEditingCase({ ...record });
    setIsEditing(true);
  }

  const resetEditing = () => {
    setIsEditing(false);
    setEditingCase(null);

  }

  function calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  async function handleAddCase() {
    await addCase({ variables: { ...newCase } });
    // console.log(newCase)
    resetNewCase();
    window.location.reload();
  }

  async function handleEditCaseGQL() {
    // console.log(editingCase)
    await updateCase({ variables: { id: editingCase.key, ...editingCase } });
    resetEditing();
    window.location.reload();
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <a href={"cases/" + record.key}>{record.firstName + " " + record.lastName}</a>
      )
    },
    {
      title: 'Age',
      dataIndex: 'dob',
      key: 'dob',
      render: (_, record) => <p>{calculate_age(new Date(parseInt(record.dob)))}</p>,
      sorter: (a, b) => a.dob - b.dob
    },
    {
      title: 'Bio',
      dataIndex: 'bio',
      key: 'bio',
    },
    {
      title: 'Assigned to',
      key: 'userNames',
      dataIndex: 'userNames',
      render: (tags) => (
        <>
          {tags.map((tag) => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space>
          <EditOutlined onClick={() => { handleEditCase(record) }} />
          <DeleteOutlined onClick={() => { handleDeleteCase(record) }} style={{ color: 'red', marginLeft: 12 }} />
        </Space>
      ),
    },
  ];


  return (
    loading1 ?
      <Spin size="large" />
      : <div>
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>
            <Button onClick={handleNewCase}>Add new Case</Button>
          </Breadcrumb.Item>

        </Breadcrumb>

        <Table columns={columns} dataSource={dataSource} />

        <Modal
          title="Edit Case"
          open={isEditing}
          okText='Save'
          onCancel={() => { resetEditing() }}
          onOk={() => {
            handleEditCaseGQL();
          }}
        >
          <Form
            name="Edit Case"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          // initialValues={{ editingCase }}
          // onFinish={"All Good"}
          //   onFinishFailed={"Please fill in all details"}
          // autoComplete="off"
          >

            <Form.Item
              label="First Name"
            // rules={[{ required: true, message: 'Please input your name!' }]}
            >

              <Input value={editingCase?.firstName} onChange={(e) => {
                setEditingCase(pre => {
                  return { ...pre, firstName: e.target.value }
                })
              }} />
            </Form.Item>

            <Form.Item
              label="Last Name"
            >
              <Input value={editingCase?.lastName} onChange={(e) => {
                setEditingCase(pre => {
                  return { ...pre, lastName: e.target.value }
                })
              }} />
            </Form.Item>

            <Form.Item
              label="Date of Birth"
            >
              <DatePicker
                value={moment(parseInt(editingCase?.dob))}
                format="DD-MM-YYYY"
                onChange={(date) => {
                  setEditingCase(pre => {
                    // console.log(moment(date))
                    return { ...pre, dob: moment(date).valueOf() }
                  })
                }} />
            </Form.Item>

            <Form.Item
              label="Bio"
            >
              <Input value={editingCase?.bio} onChange={(e) => {
                setEditingCase(pre => {
                  return { ...pre, bio: e.target.value }
                })
              }} />
            </Form.Item>

            <Form.Item
              label="Assigned to"
            >
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: '100%',
                }}
                placeholder="Please select users"
                defaultValue={editingCase?.userNames[0]}
                value={editingCase?.users}
                onChange={(selected) => {
                  // setCurrentUsers(selected.fieldNames)
                  setEditingCase(pre => {
                    return { ...pre, users: selected }
                  })
                  // console.log(editingCase?.userNames)
                }}
              >
                {users}
              </Select>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="New Case"
          open={isNew}
          okText='Save'
          onCancel={() => { resetNewCase() }}
          onOk={() => {
            handleAddCase()
          }}
        >

          <Form
            name="New Case"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            // onFinish={"All Good"}
            //   onFinishFailed={"Please fill in all details"}
            autoComplete="off"
          >
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input onChange={(e) => {
                setNewCase(pre => {
                  return { ...pre, firstName: e.target.value }
                })
              }} />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input onChange={(e) => {
                setNewCase(pre => {
                  return { ...pre, lastName: e.target.value }
                })
              }} />
            </Form.Item>

            <Form.Item
              label="Date of Birth"
              name="dob"
              rules={[{ required: true, message: 'Please input your date of birth!' }]}
            >
              <DatePicker
                value={[]}
                format="DD-MM-YYYY"
                onChange={(date) => {
                  setNewCase(pre => {
                    return { ...pre, dob: `${moment(date).valueOf()}` }
                  })
                }} />
            </Form.Item>

            <Form.Item
              label="Bio"
              name="bio"
            >
              <Input onChange={(e) => {
                setNewCase(pre => {
                  return { ...pre, bio: e.target.value }
                })
              }} />
            </Form.Item>


            <Form.Item
              label="Assigned to"
              name="users"
            >
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: '100%',
                }}
                placeholder="Please select users"
                onChange={(selected) => {
                  setNewCase(pre => {
                    return { ...pre, users: selected }
                  })
                }}
              >
                {users}
              </Select>
            </Form.Item>

          </Form>

        </Modal>

        <Routes>
          <Route element={<Home />}>
            <Route path="/cases/:id" element={<CaseItem />}></Route>
          </Route>
        </Routes>




      </div>

  )
}

export default CaseList;
import { Space, Table, Tag, Button, Breadcrumb, Modal, Input, DatePicker, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALL_CASES, QUERY_ALL_USERS } from '../../utils/queries';
import { EditOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import { UPDATE_CASE } from '../../utils/mutations';
import moment from 'moment';

function CaseList() {
  // const [state, dispatch] = useStoreContext();

  const { Option } = Select;
  const { loading: loading1, data: caseData } = useQuery(QUERY_ALL_CASES);
  const { loading: loading2, data: userData } = useQuery(QUERY_ALL_USERS);
  const [updateCase] = useMutation(UPDATE_CASE);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCase, setEditingCase] = useState(null);
  const [cases, setCases] = useState([]);
  const [users, setUsers] = useState([]);
  // const [currentUsers, setCurrentUsers] = useState([]);


  useEffect(() => {
    if (caseData) {
      setCases(caseData.cases);
    }

    if (userData) {
      setUsers(userData.users.map((user)=> {
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
      "users": [obj.users.map((user) => {
        return user._id
      })],
      "userNames": [obj.users.map((user) => {
        return user.firstName
      })],
    }
  }
  )

  // console.log(dataSource)
  // console.log(userData)


  const handleDeleteCase = (record) => {
    Modal.confirm({
      title: "Are you sure you wanna delete this case and its notes?",
      okText: "YES",
      okType: 'danger',
      onOk: () => {
        "delete this record."
      }
    })
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
      // render: (record) => <p>{record.users.map((obj)=> {return obj.name})}</p>,
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
      <LoadingOutlined style={{ textAlign: 'center', height: 40 }} />
      : <div>
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>
            <Button>Add new Case</Button>
          </Breadcrumb.Item>

        </Breadcrumb>

        <Table columns={columns} dataSource={dataSource} />

        <Modal
          title="Edit Case"
          open={isEditing}
          okText='Save'
          onCancel={() => { resetEditing() }}
          onOk={() => {
            // console.log(editingCase)
            updateCase({ variables: { id: editingCase.key, ...editingCase } });
            resetEditing();
            window.location.reload();
          }}
        >
          <Input value={editingCase?.firstName} onChange={(e) => {
            setEditingCase(pre => {
              return { ...pre, firstName: e.target.value }
            })
          }} />
          <Input value={editingCase?.lastName} onChange={(e) => {
            setEditingCase(pre => {
              return { ...pre, lastName: e.target.value }
            })
          }} />
          <DatePicker
            value={moment(parseInt(editingCase?.dob))}
            format="DD-MM-YYYY"
            onChange={(date) => {
              setEditingCase(pre => {
                console.log(moment(date))
                return { ...pre, dob: moment(date).valueOf() }
              })
            }} />
          <Input value={editingCase?.bio} onChange={(e) => {
            setEditingCase(pre => {
              return { ...pre, bio: e.target.value }
            })
          }} />
          <Select
            mode="multiple"
            allowClear
            style={{
              width: '100%',
            }}
            placeholder="Please select users"
            // defaultValue={editingCase?.users}
            // value={editingCase?.users} 
            onChange={(selected) => {
              // setCurrentUsers(selected.fieldNames)
              setEditingCase(pre => {
                return {...pre, users: selected}
              })
              // console.log(selected)
            }}
          >
            {users}
          </Select>

        </Modal>


      </div>

  )
}

export default CaseList;
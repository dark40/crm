import { Space, Table, Tag, Button, Breadcrumb, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_CASES } from '../../utils/queries';
import { EditOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import { makeProcessedFieldsMerger } from '@apollo/client/cache/inmemory/helpers';



function CaseList() {
  // const [state, dispatch] = useStoreContext();

  const { loading, data } = useQuery(QUERY_ALL_CASES);

  const [isEditing, setIsEditing] = useState(false);

  const [cases, setCases] = useState([])

  useEffect(() => {
    if (data) {
      setCases(data.cases)
    }
  }, [data])

  const dataSource = cases.map((obj) => {
    return {
      "key": obj._id,
      "name": obj.firstName + " " + obj.lastName,
      "dob": obj.dob,
      "bio": obj.bio,
      "users": [obj.users.map((name) => {
        return name.firstName;
      })]
    }
  }
  )

  console.log(dataSource)

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
    setIsEditing(true);
  }



  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <a href={"cases/" + record.key}>{record.name}</a>
      ),
    },
    {
      title: 'DOB',
      dataIndex: 'dob',
      key: 'dob',
      render: (date) => <p>{Date(date)}</p>,
      sorter: (a, b) => a.dob - b.dob
    },
    {
      title: 'Bio',
      dataIndex: 'bio',
      key: 'bio',
    },
    {
      title: 'Users',
      key: 'users',
      dataIndex: 'users',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space>
          <EditOutlined onClick={() => {handleEditCase(record)}} />
          <DeleteOutlined onClick={() => {handleDeleteCase(record)}} style={{ color: 'red', marginLeft: 12 }} />
        </Space>
      ),
    },
  ];


  return (
    loading ?
      <LoadingOutlined style={{ textAlign: 'center', height: 40 }} />
      : <div>
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Button>Add new Case</Button>
        </Breadcrumb>

        <Table columns={columns} dataSource={dataSource} />
        
        <Modal
        title= "Edit Case Detail"
        visible={isEditing}
        onCancel={()=> {setIsEditing(false)}}
        onOk={()=> {
          setIsEditing(false)
        }}
        >

        </Modal>


      </div>

  )
}

export default CaseList;
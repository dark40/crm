import { Space, Table, Tag } from 'antd';
import React, { useEffect } from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_CASES} from '../../utils/queries';

function CaseList () {
    const [state, dispatch] = useStoreContext();
    
    const {loading, data} = useQuery(QUERY_ALL_CASES);


    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'DOB',
          dataIndex: 'dob',
          key: 'dob',
        },
        {
          title: 'CreatedDate',
          dataIndex: 'createdDate',
          key: 'createdDate',
        },
        {
          title: 'Assigned',
          key: 'tags',
          dataIndex: 'tags',
          render: (_, { tags }) => (
            <>
              {tags.map((tag) => {
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
          render: (_, record) => (
            <Space size="middle">
              <a>Invite {record.name}</a>
              <a >Delete</a>
            </Space>
          ),
        },
      ];

      const ClearData = () => {
            data.map((case) => (
                
                key = case._id
                name = case.firstName + " " + case.lastName
                dob = case.dob
                createdDate = case.createdDate
                tags = [case.users]
                

            )    
            )
      }






    return (
        <Table columns={columns} dataSource={data} />
    )
}

export default CaseList;
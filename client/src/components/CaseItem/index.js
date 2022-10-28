import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Card, Spin, Avatar, List } from 'antd';
import { useStoreContext } from '../../utils/GlobalState';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_CASE } from '../../utils/queries';
import moment from 'moment';


function CaseItem() {
    // const [state, dispatch] = useStoreContext();
    const { id: idParam } = useParams();

    const [currentCase, setCurrentCase] = useState([]);

    const { loading, data } = useQuery(QUERY_CASE, {
        variables: { id: idParam },
    });

    useEffect(() => {
        if (data) {
            setCurrentCase(data.case);
        }
    }, [data])


    if (loading) {
        return <Spin size="large" />
    }

    return (
        <>
            <Card
                title={currentCase.firstName + " " + currentCase.lastName}
                extra={""}
                style={{
                    width: 300,
                }}
            >
                <p>Date of Birth: {moment(new Date(parseInt(currentCase.dob))).format("DD-MMM-YYYY")}</p>
                <p>Bio: {currentCase.bio}</p>
                <p>Created at: {moment(new Date(parseInt(currentCase.createdDate))).endOf('day').fromNow()}</p>
            </Card>

            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                dataSource={currentCase.notes}
                // footer={
                //     <div>
                //         <b>ant design</b> footer part
                //     </div>
                // }
                renderItem={(item) => (
                    <List.Item
                        key={item._id}
                        // actions={[
                        //   <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                        //   <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                        //   <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                        // ]}
                        // extra={
                        //     // <img
                        //     //     width={272}
                        //     //     alt="logo"
                        //     //     src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        //     // />
                        // }
                    >
                        <List.Item.Meta
                            // avatar={<Avatar src={item.avatar} />}
                            // title={<a href={item.href}>{item.}</a>}
                            description={moment(new Date(parseInt(item.createdDate))).endOf('day').fromNow()}
                        />
                        {item.content}
                    </List.Item>
                )}
            />


        </>
    )
}

export default CaseItem;
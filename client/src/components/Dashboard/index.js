import React from 'react';
import { useQuery } from '@apollo/client';
import { Button, Col, Row, Statistic } from 'antd';



function Dashboard() {
    // const [state, dispatch] = useStoreContext();



    // const { data } = useQuery(QUERY_USER);
    // let user;

    // if (data) {
    //     user = data.user;
    // }


    return (
        <>
            <h1>Welcome</h1>

            <Row gutter={16}>
                <Col span={12}>
                    <Statistic title="Active Users" value={112893} />
                </Col>
                <Col span={12}>
                    <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
                    <Button
                        style={{
                            marginTop: 16,
                        }}
                        type="primary"
                    >
                        Recharge
                    </Button>
                </Col>
                <Col span={12}>
                    <Statistic title="Active Users" value={112893} loading />
                </Col>
            </Row>
        </>
    )
}

export default Dashboard;
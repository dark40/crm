import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Spin, List, Input, Button, Col, Row } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_NOTE, ADD_NOTE_TO_CASE } from '../../utils/mutations';
import { QUERY_CASE } from '../../utils/queries';
import moment from 'moment';

const { TextArea } = Input;


function CaseItem() {

    const { id: idParam } = useParams();

    const [currentCase, setCurrentCase] = useState([]);

    const { loading, data } = useQuery(QUERY_CASE, {
        variables: { id: idParam },
    });

    const [newNote, setNewNote] = useState("");
    const [addNote] = useMutation(ADD_NOTE)

    const [addNoteToCase] = useMutation(ADD_NOTE_TO_CASE);



    useEffect(() => {
        if (data) {
            setCurrentCase(data.case);
        }
    }, [data])


    if (loading) {
        return <Spin size="large" />
    }

    async function handleAddNote() {

        await addNote({ variables: { content: newNote } })
            .then((res) => {
                addNoteToCase({ variables: { caseId: currentCase._id, noteId: res.data.addNote._id } })
            })

        window.location.reload();
    }


    return (
        <>
            <Row>
                <Col span={8}> 
                <Card
                    title={currentCase.firstName + " " + currentCase.lastName}
                    extra={""}
                    style={{
                        width: 'auto',
                    }}
                >
                    <p>Date of Birth: {moment(new Date(parseInt(currentCase.dob))).format("DD-MMM-YYYY")}</p>
                    <p>Bio: {currentCase.bio}</p>
                    <p>Created at: {moment(new Date(parseInt(currentCase.createdDate))).format("Do MMM YYYY")}</p>
                </Card>

                <TextArea value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add new Note here"
                    autoSize={{
                        minRows: 3,
                        maxRows: 5,
                    }}>

                </TextArea>

                <Button
                    type="primary"
                    onClick={() => { handleAddNote() }}>
                    Submit
                </Button>
                </Col>
            

            
            <Col span={16}> 
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            // console.log(page);
                        },
                        pageSize: 5,
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
                                description={moment(new Date(parseInt(item.createdDate))).format("Do MMM YY, h:mm a")}
                            />
                            {item.content}
                        </List.Item>
                    )}
                />
                </Col>
            </Row>
        </>
    )
}

export default CaseItem;
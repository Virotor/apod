import { Image, Space, Table, Tag } from "antd";
import { APOD } from "../scripts/interfaces/APOD";
import ColumnGroup from "antd/es/table/ColumnGroup";
import Column from "antd/es/table/Column";



export type APODProps = {
    apods: APOD[]
}


export const APODComponents: React.FC<APODProps> = ({ apods }: APODProps) => {


    return (
        <>
            <Table dataSource={apods}>
                <Column title="Title" dataIndex="title" key="lastName" />
                <Column title="Date" dataIndex="date" key="age" />
                <Column title="Service_version" dataIndex="service_version" key="address" />
                {/* <Column
                    title="Tags"
                    dataIndex="concepts"
                    key="tags"
                    render={(tags: string[]) => (
                        <>
                            {tags.map((tag) => (
                                <Tag color="blue" key={tag}>
                                    {tag}
                                </Tag>
                            ))}
                        </>
                    )}
                /> */}
                <Column
                    title="Image"
                    key="image"
                    render={(_: any, record: APOD) => (
                        <>
                            {
                                record.media_type == 'video'
                                    ?
                                    <p>
                                        Video not supported
                                    </p>
                                    :
                                    <Image
                                        width={200}
                                        src={`${record.hdurl}`}
                                        title={`${record.hdurl}`}
                                        alt={`${record.media_type}`}
                                    />
                            }

                        </>
                    )}
                />
            </Table>
        </>
    )
}

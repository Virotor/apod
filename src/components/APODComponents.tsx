import { Image, Space, Table, Tag } from "antd";
import { APOD } from "../scripts/interfaces/APOD";
import Column from "antd/es/table/Column";
import styles from './HomePage.module.scss'


export type APODProps = {
    apods: APOD[]
}


export const APODComponents: React.FC<APODProps> = ({ apods }: APODProps) => {


    return (
        <>
            <Table dataSource={apods} className={styles.table} rowKey={(record) => record.hdurl}>
                <Column  width = {'30%'} title="Title" dataIndex="title" key="lastName" />
                <Column  width = {'10%'} title="Date" dataIndex="date" key="age" />
                <Column
                    width = {'60%'}
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
                                        className={styles.image}
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

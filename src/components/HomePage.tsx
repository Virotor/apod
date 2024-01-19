import { useEffect, useState } from "react";
import { APOD } from "../scripts/interfaces/APOD";
import { getAPODOneDay, getAPODPeriod } from "../scripts/APICalls";
import { Button, Form, Skeleton } from "antd";
import { APODComponents } from "./APODComponents";
import styles from './HomePage.module.scss'
import { DatePicker, Space } from 'antd';
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;




const disabledDate: RangePickerProps['disabledDate'] = (current: any) => {
    return current && current > dayjs().endOf('day');
};


export const HomePage: React.FC = () => {

    const [apods, setApods] = useState<APOD[]>([])
    const [isLoadind, setIsLoading] = useState(true)
    const [form] = Form.useForm()


    useEffect(() => {
        getAPODOneDay(new Date()).then((response) => {
            setApods(() => [response])
            setIsLoading(false)
        })
        return () => {
            setApods(() => [])
        }
    }, [])


    const handleSubmit = () => {
        const values = form.getFieldsValue()
        console.log(values)
        setIsLoading(() => true)
        getAPODPeriod(new Date(values.date[0]), new Date(values.date[1]))
            .then((response) => {
                setApods(() => response)
                setIsLoading(() => false)
            })
    }

    return (
        <>
            <Space direction="vertical" size={12} style={{ width: '100%', backgroundColor: 'skyblue' }}>
                <p className={styles.text}>
                    One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact,
                    this website is one of the most popular websites across all federal agencies. It has
                    the popular appeal of a Justin Bieber video. This endpoint structures the APOD imagery
                    and associated metadata so that it can be repurposed for other applications. In addition,
                    if the concept_tags parameter is set to True, then keywords derived from the image explanation
                    are returned. These keywords could be used as auto-generated hashtags for twitter
                    or instagram feeds; but generally help with discoverability of relevant imagery.
                    The full documentation for this API can be found in the APOD API Github repository.
                </p>
                <Form
                    className={styles.edit}
                    form={form}
                    name="APOD"

                    scrollToFirstError
                    // onValuesChange={(e) => setChangeFields(() => true)}
                    onFinish={handleSubmit}
                >

                    <Form.Item
                        name='date'
                        rules={[{ required: true, message: 'Please input date' }]}
                    >
                        <RangePicker
                            allowClear={true}
                            className={styles.datepicker}
                            disabledDate={disabledDate}
                        />
                    </Form.Item>
                    <Form.Item
                        name='submit'
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <Skeleton loading={isLoadind} active>
                   <APODComponents apods={apods}/>
                </Skeleton>
            </Space >
        </>
    )
}
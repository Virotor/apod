import { useEffect, useState } from "react";
import { APOD } from "../scripts/interfaces/APOD";
import { getAPODOneDay, getAPODPeriod } from "../scripts/APICalls";
import { App, Button, message, Form, Skeleton } from "antd";
import { APODComponents } from "./APODComponents";
import styles from './HomePage.module.scss'
import { DatePicker, Space } from 'antd';
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";







export const HomePage: React.FC = () => {

    const [apods, setApods] = useState<APOD[]>([])
    const [isLoadind, setIsLoading] = useState(true)
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage()
    useEffect(() => {
        getAPODOneDay(new Date()).then((response) => {
            setApods(() => [response])
            setIsLoading(false)
        })
        return () => {
            setApods(() => [])
        }
    }, [])


    const errorShow = (message: string) => {
        messageApi.open({
            type: 'error',
            content: message,
            duration: 4,
        });
    };


    const disabledDate: RangePickerProps['disabledDate'] = (current: any) => {
        return current && current > dayjs().endOf('day');
    };

    const endDisabledDate: RangePickerProps['disabledDate'] = (current: any) => {
        const start = form.getFieldValue("start_date")
        if (current && current > dayjs().endOf('day')) {
            return true;
        }
        if (start === undefined || start === null) {
            return false;
        }
        if (current < start.endOf('day')) {
            return true;
        }
        return false;
    };


    const handleSubmit = () => {
        const values = form.getFieldsValue()
        if (values.start_date > values.end_date.endOf('day')) {
            errorShow("End date should be alter start date!");
            return;
        }
        setIsLoading(() => true)
        getAPODPeriod(new Date(values.start_date), new Date(values.end_date))
            .then((response) => {
                setApods(() => response)
                setIsLoading(() => false)
            })
    }

    return (
        <div className={styles.back}>
            {contextHolder}
            <div className={styles.space} >
                <p className={styles.text}>
                    One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact,
                    this website is one of the most popular websites across all federal agencies. It has
                    the popular appeal of a Justin Bieber video. This endpoint structures the APOD imagery
                    and associated metadata so that it can be repurposed for other applications.
                    These keywords could be used as auto-generated hashtags for twitter
                    or instagram feeds; but generally help with discoverability of relevant imagery.
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
                        name='start_date'
                        rules={[{ required: true, message: 'Please input start date' }]}
                    >
                        <DatePicker
                            placeholder="Please enter start date"
                            format="YYYY/MM/DD"
                            allowClear
                            showNow
                            placement='bottomRight'
                            className={styles.datepicker}
                            disabledDate={disabledDate}
                        />
                    </Form.Item>
                    <Form.Item
                        name='end_date'
                        rules={[{ required: true, message: 'Please input end date' }]}
                    >
                        <DatePicker
                            placeholder="Please, enter end date"
                            format="YYYY/MM/DD"
                            allowClear
                            showNow
                            placement='bottomRight'
                            className={styles.datepicker}
                            disabledDate={endDisabledDate}
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
                    <APODComponents apods={apods} />
                </Skeleton>

            </div >

        </div>
    )
}
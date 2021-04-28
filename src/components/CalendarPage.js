import React, { useEffect, useState } from 'react'
import { momentLocalizer, Calendar } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";

import axios from 'axios';

const localizer = momentLocalizer(moment);

function CalendarPage() {

    const [events, setEvents] = useState([])
    let eventList = [];
    let startDate, endDate;
    const gettraining = async () => {
        try {
            const { data } = await axios.get('https://customerrest.herokuapp.com/gettrainings')
            for (var i = 0; i < data.length; i++) {
                if (data[i].date == null) {
                    continue;
                }
                try {
                    startDate = new Date(data[i].date);
                    endDate = new Date(data[i].date);
                    endDate.setUTCMinutes(startDate.getUTCMinutes() + data[i].duration);
                    eventList.push({
                        title: data[i].activity + "/ " + data[i].customer.firstname,
                        start: startDate,
                        end: endDate
                    });
                } catch (err) {
                    console.error(err);
                }
            }
            setEvents(eventList)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        gettraining()
        // eslint-disable-next-line 
    }, [])

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "80vh", width: "80vw", margin: "0 auto"}}
            />
        </div>
    )
}

export default CalendarPage

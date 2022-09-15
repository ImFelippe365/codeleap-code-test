import moment from 'moment';

export default function timePast(time: Date) {

    const now = moment(new Date());
    const past = moment(time);
    const duration = moment.duration(now.diff(past))

    let times = [
        {
            type: "year",
            time: Math.floor(duration.asYears())
        },
        {
            type: "month",
            time: Math.floor(duration.asMonths())
        },
        {
            type: "week",
            time: Math.floor(duration.asWeeks())
        },
        {
            type: "day",
            time: Math.floor(duration.asDays())
        },
        {
            type: "hour",
            time: Math.floor(duration.asHours())
        },
        {
            type: "minute",
            time: Math.floor(duration.asMinutes())
        },
        {
            type: "second",
            time: Math.floor(duration.asSeconds())
        },
        {
            type: "just now",
            time: 1
        }
    ]

    times = times.filter(({ time }) => time > 0)

    return times[0]

}
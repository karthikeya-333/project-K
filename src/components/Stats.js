import { useEffect, useState } from "react";

function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function formatDate(date) {
    var d = new Date(date);
    d=new Date(d.setHours(15));
    console.log(d);
    let  month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('/');
}

function Stats() {
    let x=[],y=[];
    for(var i=1;i<=3;i++){
        let a = Array(3).fill().map(() => Array(15*i).fill(0));
        let b=  Array(15*i).fill(0);
        x.push(a);
        y.push(b);
    }
    let [src,setSrc]=useState("");
    let [dates,setDates]=useState(y);
    let [data, setData] = useState(x);
    
    


    useEffect(() => {
        getDetails(15);
    }, []);


    async function getDetails(length) {
        const response = await fetch("http://localhost:5000/api/session/getSessions", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
        });
        let json = await response.json();
        json.reverse();
        let today = new Date();
        today.setDate(today.getDate() + 1);
        //console.log(length);
        for (var i = 0; i < length*3; i++) {
            if (i > json.length - 1) {
                break;
            }
            let a = json[i];
            let b = dateDiffInDays(new Date(a.date), today)-1;
            if (b < length) {
               //console.log(a.date,formatDate(a.date));
               dates[length/15-1][length-1 - b]=formatDate(a.date);
                data[length/15-1][a.session - 1][length-1 - b] = a.attendance.length;
            }
        }
        console.log( data[length/15-1],dates[length/15-1])
        setDates(dates);
        setData(data);
        let chartData={
            type: 'line',
            data: {
                labels: dates[length/15-1],
                datasets: [
                    {
                        label: 'Breakfast',
                        data: data[length/15-1][0],
                        fill: false,
                        borderColor: 'blue',
                    },
                    {
                        label: 'Lunch',
                        data: data[length/15-1][1],
                        fill: false,
                        borderColor: 'green',
                    },
                    {
                        label: 'Dinner',
                        data: data[length/15-1][2],
                        fill: false,
                        borderColor: 'red',
                    },
                ],
            },
        };
        const chartConfig = encodeURIComponent(JSON.stringify(chartData));
         src = `https://quickchart.io/chart?c=${chartConfig}`;
        setSrc(src);
    }

    async function handleChange(e){
        let i=e.target.value;
        getDetails(i);
    }
 
    return (
        <div className="text-center">
            <div style={{ marginBottom: 50 }}>
                        <label >Session:</label>
                        <select onChange={handleChange} >
                            <option value={15}>15 days</option>
                            <option value={30}>30 days</option>
                            <option value={45}>45 days</option>
                        </select>
                    </div>
            <img src={src} />

        </div>
    )
}

export default Stats;
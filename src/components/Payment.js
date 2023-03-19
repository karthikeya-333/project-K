import { useContext, useState } from "react";
import kContext from "../contexts/Context";
//import axios from 'axios';

function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function Payment() {

    const context = useContext(kContext);
    const [details, setDetails] = useState({ startDate: new Date(), endDate: new Date() });
    const [amount, setAmount] = useState(100);
    let { transactions } = context;
    let lastTransaction = transactions[transactions.length - 1];
    let smin; let emin = new Date(), emax = new Date(), smax = new Date();

    let today = new Date();
    if (lastTransaction) {
        let last = lastTransaction.endDate;
        last = new Date(last);
        let lastnext = new Date(last);
        lastnext.setDate(last.getDate() + 1);
        if (lastnext.getTime() > today.getTime()) {
            smin = lastnext;
        }
        else {
            smin = today
        }
    }
    else {
        smin = today;
    }
    emin.setDate(smin.getDate() + 1);
    emax.setDate(smin.getDate() + 30);
    smax.setDate(today.getDate() + 5);

    // function handleChange(e) {
    //     setDetails({ ...details, [e.target.name]: e.target.value });
    //     setAmount(120 * dateDiffInDays(details.endDate, details.startDate));
    // }

    async function handleClick() {
        const response = await axios.post('/api/create-order', { amount });
        const { data } = response;
    
        //console.log(response.json());

        const options = {
            key: 'your_key_id',
            amount: data.amount,
            currency: data.currency,
            name: 'Your Website Name',
            description: 'Payment for your order',
            order_id: data.id,
            handler: function (response) {
                console.log(response);
            },
            prefill: {
                email: 'user@example.com',
                contact: '9999999999',
            },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

    }


    return (
        <div>
            {/* <label>start date</label>
            <input type="date" name="startDate" min={formatDate(smin)} max={formatDate(smax)} onChange={handleChange} />
            <label> end date</label>
            <input type="date" name="endDate" min={formatDate(emin)} max={formatDate(emax)} onChange={handleChange} />
            <h3>{amount}</h3> */}
            <button onClick={handleClick}>Pay</button>
        </div>
    )
};

export default Payment;










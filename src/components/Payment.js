import { useContext, useState } from "react";
import kContext from "../contexts/Context";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

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
    const [amount1, setAmount] = useState(100);
    const Navigate = useNavigate();
    let { transactions } = context;
    let lastTransaction = transactions[transactions.length - 1];
    let smin; let emin = new Date(), emax = new Date(), smax = new Date();
    let today = new Date();
    if (lastTransaction) {
        let last = lastTransaction.endDate;
        last = new Date(last);
        let lastnext = new Date(last);
        //lastnext.setDate(last.getDate() + 1);
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

    async function handleChange(e) {
        setDetails({ ...details, [e.target.name]: new Date(e.target.value) });
        if(e.target.name=="startDate"){
            setAmount(120 * (dateDiffInDays(new Date(e.target.value), new Date(details.endDate)) + 1));
        }
        else{
            setAmount(120 * (dateDiffInDays(new Date(details.startDate), new Date(e.target.value)) + 1));
        }
    }

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function handleClick() {
        if(details.startDate.getTime()>=details.endDate.getTime()){
            alert("Invalid Date Selection");
            return;
        }
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        const result = await axios.post("http://localhost:5000/api/payment/create-order", { amount: amount1 });
        if (!result) {
            alert("Server error. Are you online?");
            return;
        }
        const { amount, id: order_id, currency } = result.data;
        //console.log(result);
        const options = {
            key: "rzp_test_YKhImZiBX9Sshd",
            amount: amount.toString(),
            currency: currency,
            name: "K-group",
            description: "Test Transaction",
            image: {},
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    startDate: details.startDate,
                    endDate: details.endDate,
                    authToken: localStorage.getItem('token')
                };
                //console.log(data);
                const result = await axios.post("http://localhost:5000/api/payment/success", data);
                console.log(result)
                alert(result.data.msg);
                Navigate("/");
            },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.on('payment.failed', function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });
        paymentObject.open();

    }


    return (
        <div className='payment'>
            <div className="container">
                <div className="payment-title">
                    <h2 style={{ marginBottom: 0 }}>Recharge Now!</h2>
                </div>
                <div style={{ marginBottom: 50 }}>
                    <label style={{ marginRight: 5 }}>Start Date:</label>
                    <input type="date" name="startDate" min={formatDate(smin)} max={formatDate(smax)} onChange={handleChange} />
                </div>
                <div style={{ marginBottom: 50 }}>
                    <label style={{ marginRight: 5 }}>End Date:</label>
                    <input type="date" name="endDate" min={formatDate(emin)} max={formatDate(emax)} onChange={handleChange} />
                </div>
                <h3 style={{ marginBottom: 50 }}>Amount:{amount1}</h3>
                <div className="form-group" style={{display:"inline"}}>
                    <button style={{width:250}} onClick={handleClick}>Pay</button>
                </div>

            </div>
        </div>
    )
};

export default Payment;












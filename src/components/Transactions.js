import { useContext } from "react";
import kContext from "../contexts/Context";
import TransactionItem from "./TransactionItem";


function Transactions() {

    let context = useContext(kContext);
    let { transactions } = context;

    //console.log(transactions)

    return (

        <div className="container">
            <div>
                <div className="title  fontheading text-center" style={{ padding: 0, marginBottom: 45 }}><h3>My Transactions</h3></div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ORDER ID</th>
                            <th scope="col">DATE</th>
                            <th scope="col">AMOUNT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction, index) => {
                            return (
                                <TransactionItem key={transaction._id} index={index} transaction={transaction} />
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default Transactions;



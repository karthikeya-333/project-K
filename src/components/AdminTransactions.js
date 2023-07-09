import { useContext, useEffect, useState } from "react";
import kContext from "../contexts/Context";
import TransactionItem from "./TransactionItem";


function AdminTransactions() {

    const context = useContext(kContext);
    let { allTransactions, getAllTransactions } = context;

    useEffect(() => {
        getAllTransactions();
    }, [])




    return (
        <div className="container transactions">
            <div>
                <div className="title  fontheading text-center" style={{ padding: 0, marginBottom: 45 }}><h3>My Transactions</h3></div>
                <table>
                    {/* <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ORDER ID</th>
                            <th scope="col">DATE</th>
                            <th scope="col">AMOUNT</th>
                        </tr>
                    </thead> */}
                    <tbody>
                        {/* {allTransactions.map((transaction, index) => {
                            return (
                                <TransactionItem key={transaction._id} index={index} transaction={transaction} />
                            )
                        })} */}
                        <tr className="collapsible">
                            <td>Row 1</td>
                        </tr>
                        <tr className="content">
                            <td>Additional content for row 1</td>
                        </tr>
                        <tr className="collapsible">
                            <td>Row 2</td>
                        </tr>
                        <tr className="content">
                            <td>Additional content for row 2</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminTransactions;
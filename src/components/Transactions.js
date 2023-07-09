import { useContext } from "react";
import kContext from "../contexts/Context";
import TransactionItem from "./TransactionItem";


function Transactions() {


    
    let context = useContext(kContext);
    let { transactions } = context;

    //console.log(transactions)

    return (

        <>
          <div className="transactions">
          <div className="container">
            <div>
                <div className="title  fontheading text-center" style={{ padding: 0, marginBottom: 45 }}><h3>My Transactions</h3></div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">TRANSACTION ID</th>
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
          </div>

        </>


    )
}

export default Transactions;


{/**/}

    //     <table className="table">
    //     <thead>
    //         <tr>
    //             <th></th>
    //             <th>Customer</th>
    //             <th>Telephone</th>
    //         </tr>
    //     </thead>
    //     <tbody>
    //         <tr>
    //             <td><span className="expandChildTable"></span></td>
    //             <td>Fred Smith</td>
    //             <td>01102299393</td>
    //         </tr>
    //         <tr className="childTableRow">
    //             <td colSpan="3">
    //                 <h5>Account Detils</h5>
    //                 <table className="table">
    //                     <thead>
    //                         <tr>
    //                             <th>Date</th>
    //                             <th>Description</th>
    //                             <th>Amount</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                         <tr>
    //                             <td>2021-03-01</td>
    //                             <td>Goods</td>
    //                             <td>100.00</td>
    //                         </tr>
    //                         <tr>
    //                             <td>2021-03-02</td>
    //                             <td>Materials</td>
    //                             <td>200.00</td>
    //                         </tr>
    //                     </tbody>
    //                 </table>
    //             </td>
    //         </tr>
    //         <tr>
    //             <td><span className="expandChildTable"></span></td>
    //             <td>John Doe</td>
    //             <td>0456787899907</td>
    //         </tr>
    //         <tr className="childTableRow">
    //             <td colSpan="3">
    //                 <h5>Account Detils</h5>
    //                 <table className="table">
    //                     <thead>
    //                         <tr>
    //                             <th>Date</th>
    //                             <th>Description</th>
    //                             <th>Amount</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                         <tr>
    //                             <td>2021-03-07</td>
    //                             <td>Food</td>
    //                             <td>150.00</td>
    //                         </tr>
    //                         <tr>
    //                             <td>2021-03-10</td>
    //                             <td>Vehicles</td>
    //                             <td>240.00</td>
    //                         </tr>
    //                     </tbody>
    //                 </table>
    //             </td>
    //         </tr>
    //         <tr>
    //             <td><span className="expandChildTable"></span></td>
    //             <td>Grace Jones</td>
    //             <td>02304524663</td>
    //         </tr>
    //         <tr className="childTableRow">
    //             <td colSpan="3">
    //                 <h5>Account Detils</h5>
    //                 <table className="table">
    //                     <thead>
    //                         <tr>
    //                             <th>Date</th>
    //                             <th>Description</th>
    //                             <th>Amount</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                         <tr>
    //                             <td>2021-03-05</td>
    //                             <td>Equipment</td>
    //                             <td>230.00</td>
    //                         </tr>
    //                     </tbody>
    //                 </table>
    //             </td>
    //         </tr>
    //     </tbody>
    // </table>
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('/');
}

function TransactionItem(props) {

    let { transaction } = props;


    return (
        <>
            <tr  className="collapsible">
                <th scope="row">{props.index + 1}</th>
                {/* <th><span className="expandChildTable"></span></th> */}
                <td>{transaction._id}</td>
                <td>{formatDate(transaction.Date)}</td>
                <td>{transaction.amount}</td>
            </tr>
            <tr className="content"> 
                <td>data</td>
                <td>data</td>
            </tr>
        </>
    )
}

export default TransactionItem;
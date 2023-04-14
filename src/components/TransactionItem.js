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

    function handleClick(event){
        document.getElementsByClassNameName("moreinfo").slideToggle("slow")

    }

    return (
        <tr className="order-link transaction-item" style={{cursor:"pointer"}} onClick={handleClick}>
            <th scope="row">{props.index + 1}</th>
            <td>{transaction._id}</td>
            <td>{formatDate(transaction.Date)}</td>
            <td>{transaction.amount}</td>
        </tr>

        

    )
}

export default TransactionItem;
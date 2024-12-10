const PendingBalanceLists = ({ item, index }) => {
    return (
        <tr>
            <td scope="row">{index + 1}</td>
            <td>{item?.date_time || "N/A"}</td>
            <td>Particular</td>
            <td>{item?.received || "N/A"}</td>
            <td>{item?.purpose || "N/A"}</td>
            <td className="text-end">৳ {item?.amount.toFixed(2) || "0.00"}</td>
        </tr>
    );
};

export default PendingBalanceLists;

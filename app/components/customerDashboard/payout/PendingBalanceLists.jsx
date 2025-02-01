const PendingBalanceLists = ({ item, index }) => {
    return (
        <tr>
            <td scope="row">{index + 1}</td>
            <td>{item?.date_time || "N/A"}</td>
            <td className="d-lg-none">
                {item?.from || ""}, <br /> {item?.purpose || ""}
            </td>
            <td className="d-none d-lg-table-cell">{item?.from || "N/A"}</td>
            <td className="d-none d-lg-table-cell">{item?.purpose || "N/A"}</td>
            <td className="text-end">৳ {item?.amount || "0.00"}</td>
        </tr>
    );
};

export default PendingBalanceLists;

import { useEffect, useState } from "react";
import NoDataFound from "../../NoDataFound";
import Pagination from "../../productCategory/Pagination";
// import RebateClaimedModal from "./RebateClaimedModal";
import { useSession } from "next-auth/react";
import { getPrivilegeCardShoppingChoiceDetail } from "@/app/services/privilegeCard/getPrivilegeCardShoppingChoiceDetail";
import InnerRebateClaimedModal from "./InnerRebateClaimedModal";
import RebateClaimedDropdown from "./RebateClaimedDropdown";

const PrivilegeRebateRecordData = ({
    rebateRecordData,
    rebateRecordRecall,
    setRebateRecordRecall,
    currentPage,
    lastPage,
}) => {
    const [ownChoocingAmount, setOwnChoocingAmount] = useState({});
    const [choocingProductAmount, setChoocingProductAmount] = useState({});
    const { data: session } = useSession();
    // Choose Listed Products
    useEffect(() => {
        const fetchingChooseListedProducts = async () => {
            try {
                const rebate = 1;
                const response = await getPrivilegeCardShoppingChoiceDetail(
                    session?.accessToken,
                    rebate
                );
                setChoocingProductAmount(response?.results);
            } catch (error) {
                console.error("Error fetching choosing products:", error);
                console.info(error);
            }
        };
        if (session?.accessToken) {
            fetchingChooseListedProducts();
        }
    }, [session?.accessToken]);

    // Choose Own Choice Shopping
    useEffect(() => {
        const fetchingChooseOwnShopping = async () => {
            try {
                const rebate = 2;
                const response = await getPrivilegeCardShoppingChoiceDetail(
                    session?.accessToken,
                    rebate
                );
                setOwnChoocingAmount(response?.results);
            } catch (error) {
                console.error(
                    "Error fetching Choose Own Choice Shopping",
                    error
                );
                console.info(error);
            }
        };
        if (session?.accessToken) {
            fetchingChooseOwnShopping();
        }
    }, [session?.accessToken]);

    return (
        <>
            <div className="px-4 py-4">
                <div className="table-responsive">
                    {rebateRecordData?.length > 0 ? (
                        <table
                            className="table align-middle"
                            style={{ minWidth: "720px" }}
                        >
                            <thead>
                                <tr>
                                    <th scope="col">SL</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Purpose</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col" className="text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {rebateRecordData?.map((item, index) => {
                                    const { id, date, amount, note } = item;
                                    return (
                                        <tr key={id}>
                                            <td>{index + 1}</td>
                                            <td>{date}</td>
                                            <td>{note}</td>
                                            <td>৳ {amount.toFixed(2)}</td>
                                            <td className="text-end">
                                                {item?.status === 0 ? (
                                                    <div className="dropdown">
                                                        <button
                                                            className="btn btn-info dropdown-toggle"
                                                            type="button"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                        >
                                                            Last Month Rebate
                                                        </button>
                                                        <RebateClaimedDropdown />
                                                    </div>
                                                ) : (
                                                    <span
                                                        className="text-center btn btn-success btn-sm "
                                                        style={{
                                                            cursor: "auto",
                                                        }}
                                                    >
                                                        Rebate was Claimed
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <NoDataFound title={`Rebate History Data Not Found`} />
                    )}
                    <Pagination currentPage={currentPage} lastPage={lastPage} />
                </div>
            </div>

            <InnerRebateClaimedModal
                rebateRecordRecall={rebateRecordRecall}
                setRebateRecordRecall={setRebateRecordRecall}
                choocingProductAmount={choocingProductAmount}
                ownChoocingAmount={ownChoocingAmount}
            />
        </>
    );
};

export default PrivilegeRebateRecordData;

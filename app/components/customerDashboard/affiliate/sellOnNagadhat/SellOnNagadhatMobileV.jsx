import Link from "next/link"
import { FaCheckCircle } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";

const SellOnNagadhatMobileV = ({item}) => {
  return (
    <div className=" shadow py-4 px-2 mb-3 rounded-4" key={item?.id}>
        <p className=" d-flex align-items-center justify-content-between pt-2 pb-2 gap-4 border-bottom">
            <span><strong>Date:</strong>  {item?.start_date || "---"}</span>
            <span><strong>Package:</strong> {item?.package_invoice || "---"}</span>
        </p>
        <p className=" d-flex align-items-center justify-content-between pt-2 pb-2 gap-4 border-bottom">
            <span><strong>Duration (Month):</strong> {item?.duration || "---"}</span>
            <span><strong>Completed (Month):</strong> {item?.completed_months || "---"}</span>
        </p>
        <p className=" d-flex align-items-center justify-content-between pt-2 pb-2 gap-4 border-bottom">
            <span><strong>Order Value:</strong> ৳ {item?.order_value || "---"}</span>
            <span> <strong>MRP Value:</strong> ৳ {item?.mrp_value || "---"}</span>
        </p>
        <p className=" d-flex align-items-center justify-content-between pt-2 pb-2 gap-4 border-bottom"><strong>Monthly Return:</strong> <span>৳ {(item?.monthly_bonus || 0).toFixed(2)}</span></p>
        <p className=" d-flex align-items-center justify-content-between pt-2 pb-2 gap-4 border-bottom">
            <strong>Instalment:
            {item?.is_instalment === 1 ? (
                    <>
                        <FaCheckCircle className="text-success" />{" "}
                            Yes
                    </>
                    ) : (
                    <>
                        <FcCancel className="text-danger" />{" "}
                        No
                    </>
            )}
                
            </strong> 
            <strong>
            {item?.active_status === 0 ? (
                <span className="text-primary">
                    Active
                </span>) :(
                <span className="text-success">
                    Completed
                </span>)
            }
            </strong> 
                <Link href={`/affiliate-buyback-policy-details/${item?.id}`} className="btn btn-success">View</Link>
        </p>
    </div>
  )
}

export default SellOnNagadhatMobileV
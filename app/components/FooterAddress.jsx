import Image from "next/image"

const FooterAddress = ({ icon, title, subtitle }) => {
    return (
        <>
            <div className="footer-widget-address-item d-flex">
                <div className="footer-widget-address-icon">
                    <Image
                        src={icon}
                        width={22}
                        height={22}
                        alt={title}
                    />
                </div>
                <div className="footer-widget-address-info">
                    <strong>{title}</strong>
                    <p className="w-100">{subtitle}</p>
                </div>
            </div>
        </>
    )
}

export default FooterAddress
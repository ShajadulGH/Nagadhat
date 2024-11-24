import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const PartnerItems = ({ optionData }) => {
    const { path, imageUrl, altText } = optionData;
    return (
        <div className="px-2">
            <div className="nagadhat-partner">
                <Link href={path} target='_blank'>
                    <Image
                        className="img-fluid"
                        src={imageUrl}
                        alt={altText}
                        height={200}
                        width={300}
                    />
                </Link>
            </div>
        </div>
    )
}

export default PartnerItems
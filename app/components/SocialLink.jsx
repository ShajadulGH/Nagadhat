import SocialLinkItems from "./SocialLinkItems";

const SocialLink = ({ path_name, product_name, product_thumbnail }) => {
    // console.log("path_name ", path_name);

    const socialLinkItem = [
        {
            image: "/images/facbook.svg",
            alt: "Facebook",
            path: `https://www.facebook.com/nagadhat`,
        },
        {
            image: "/images/twitter.svg",
            alt: "Twitter",
            path: `#`,
        },
        {
            image: "/images/linkedin.svg",
            alt: "LinkedIn",
            path: `https://www.linkedin.com/in/nagadhat-bangladesh-ltd-6a59071b1/`,
        },
        {
            image: "/images/youtube.svg",
            alt: "YouTube",
            path: "https://www.youtube.com/channel/UCS5oyiXLPqlTjirRuGhkUVA",
        },
        {
            image: "/images/instagram.svg",
            alt: "Instagram",
            path: "https://www.instagram.com/nagadhat9/",
        },
    ];
    // console.log("socialLinkItem final path path ", socialLinkItem);
    return (
        <div className="nh-social-link d-flex align-items-center">
            {socialLinkItem.map((item) => {
                const { image, alt, path } = item;
                return (
                    <SocialLinkItems
                        key={alt}
                        img={image}
                        alt={alt}
                        path={path}
                    />
                );
            })}
        </div>
    );
};

export default SocialLink;

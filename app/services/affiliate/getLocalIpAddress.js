export const getLocalIpAddress = async () => {
    try {
        const response = await fetch(`https://api.ipify.org?format=json`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Something went wrong fetching ip address ");
        console.info(error);
    }
};

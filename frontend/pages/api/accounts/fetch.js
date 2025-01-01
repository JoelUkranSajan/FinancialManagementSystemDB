export default async function handler(req, res) {
    const { mobileNumber } = req.query;

    if (req.method === "GET") {
        if (!mobileNumber) {
            return res.status(400).json({ error: "Missing mobile number" });
        }

        try {
            const response = await fetch(`http://localhost:8081/api/fetch?mobileNumber=${mobileNumber}`);

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Backend error:", errorData);
                return res.status(response.status).json({ error: errorData.message || "Failed to fetch account" });
            }

            const data = await response.json();
            console.log("Mobile Number Received:", mobileNumber);
            console.log("Response Data:", data);

            res.status(200).json(data);
        } catch (error) {
            console.error("Error while fetching account data:", error);
            res.status(500).json({ error: "Server error, please try again" });
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}

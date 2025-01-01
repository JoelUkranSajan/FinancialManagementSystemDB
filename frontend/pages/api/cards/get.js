export default async function handler(req, res) {
    if (req.method === "GET") {
        const { mobileNumber } = req.query;

        if (!mobileNumber) {
            return res.status(400).json({ error: "Mobile number is required." });
        }

        try {
            const response = await fetch(`http://localhost:8090/api/fetch?mobileNumber=${mobileNumber}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "eazybank-correlation-id": "1",
                  },
            });

            if (response.ok) {
                const data = await response.json();
                return res.status(200).json(data);
            } else {
                const errorData = await response.json();
                return res.status(response.status).json(errorData);
            }
        } catch (error) {
            console.error("Error fetching cards:", error);
            return res.status(500).json({ error: "Internal server error." });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed." });
    }
}

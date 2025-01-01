export default async function handler(req, res) {
    if (req.method === "DELETE") {
        const { mobileNumber } = req.query;

        if (!mobileNumber) {
            return res.status(400).json({ error: "Mobile number is required." });
        }

        try {
            const response = await fetch(`http://localhost:8090/api/delete?mobileNumber=${mobileNumber}`, {
                method: "DELETE",
            });

            if (response.ok) {
                return res.status(200).json({ message: "Card deleted successfully." });
            } else {
                const errorData = await response.json();
                return res.status(response.status).json(errorData);
            }
        } catch (error) {
            console.error("Error deleting card:", error);
            return res.status(500).json({ error: "Internal server error." });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed." });
    }
}

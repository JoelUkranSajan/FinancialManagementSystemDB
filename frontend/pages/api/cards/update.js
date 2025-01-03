export default async function handler(req, res) {
    const CARDS_SERVICE_BASE_URL = "http://cards:8090";
    const UPDATE_ENDPOINT = "/api/update";
  
    if (req.method === "PUT") {
      const { mobileNumber } = req.query;
      const cardDetails = req.body;
  
      if (!mobileNumber) {
        return res.status(400).json({ error: "Mobile number is required." });
      }
  
      try {
        const response = await fetch(
          `${CARDS_SERVICE_BASE_URL}${UPDATE_ENDPOINT}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mobileNumber, ...cardDetails }),
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          return res.status(200).json(data);
        } else {
          const errorData = await response.json();
          return res.status(response.status).json(errorData);
        }
      } catch (error) {
        console.error("Error updating card:", error);
        return res.status(500).json({ error: "Internal server error." });
      }
    } else {
      return res.status(405).json({ error: "Method not allowed." });
    }
  }
  
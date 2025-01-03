export default async function handler(req, res) {
    const LOANS_SERVICE_BASE_URL = "http://loans:9000";
    const UPDATE_ENDPOINT = "/api/update";
  
    if (req.method === "PUT") {
      try {
        const response = await fetch(`${LOANS_SERVICE_BASE_URL}${UPDATE_ENDPOINT}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(req.body),
        });
  
        const responseData = await response.json();
  
        if (response.ok) {
          return res.status(200).json(responseData);
        } else {
          return res.status(response.status).json(responseData);
        }
      } catch (error) {
        console.error("Error updating loan:", error);
        return res.status(500).json({ error: "Internal server error." });
      }
    } else {
      return res.status(405).json({ error: "Method not allowed." });
    }
  }
  
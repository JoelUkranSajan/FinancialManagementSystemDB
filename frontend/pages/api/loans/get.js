export default async function handler(req, res) {
    const LOANS_SERVICE_BASE_URL = "http://loans:9000";
    const FETCH_ENDPOINT = "/api/fetch";
  
    if (req.method === "GET") {
      const { mobileNumber } = req.query;
  
      if (!mobileNumber) {
        return res.status(400).json({ error: "Mobile number is required." });
      }
  
      try {
        const response = await fetch(
          `${LOANS_SERVICE_BASE_URL}${FETCH_ENDPOINT}?mobileNumber=${mobileNumber}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "eazybank-correlation-id": "1",
            },
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
        console.error("Error fetching loan details:", error);
        return res.status(500).json({ error: "Internal server error." });
      }
    } else {
      return res.status(405).json({ error: "Method not allowed." });
    }
  }
  
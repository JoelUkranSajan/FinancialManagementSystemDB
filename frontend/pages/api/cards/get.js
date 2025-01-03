export default async function handler(req, res) {
    const CARDS_SERVICE_BASE_URL = "http://cards:8090";
    const FETCH_ENDPOINT = "/api/fetch";
  
    if (req.method === "GET") {
      const { mobileNumber } = req.query;
  
      if (!mobileNumber) {
        return res.status(400).json({ error: "Mobile number is required." });
      }
  
      try {
        const response = await fetch(
          `${CARDS_SERVICE_BASE_URL}${FETCH_ENDPOINT}?mobileNumber=${mobileNumber}`,
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
        console.error("Error fetching cards:", error);
        return res.status(500).json({ error: "Internal server error." });
      }
    } else {
      return res.status(405).json({ error: "Method not allowed." });
    }
  }
  
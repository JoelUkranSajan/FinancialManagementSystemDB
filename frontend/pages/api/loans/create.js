export default async function handler(req, res) {
    const LOANS_SERVICE_BASE_URL = "http://loans:9000";
    const CREATE_ENDPOINT = "/api/create";
  
    if (req.method === "POST") {
      const { mobileNumber } = req.query;
  
      if (!mobileNumber) {
        return res.status(400).json({ error: "Mobile number is required." });
      }
  
      try {
        const response = await fetch(
          `${LOANS_SERVICE_BASE_URL}${CREATE_ENDPOINT}?mobileNumber=${mobileNumber}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          return res.status(201).json(data);
        } else {
          const errorData = await response.json();
          return res.status(response.status).json(errorData);
        }
      } catch (error) {
        console.error("Error creating loan:", error);
        return res.status(500).json({ error: "Internal server error." });
      }
    } else {
      return res.status(405).json({ error: "Method not allowed." });
    }
  }
  
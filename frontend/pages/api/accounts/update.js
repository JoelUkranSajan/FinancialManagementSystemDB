export default async function handler(req, res) {
    const ACCOUNTS_SERVICE_BASE_URL = "http://accounts:8081";
    const UPDATE_ENDPOINT = "/api/update";
  
    if (req.method === "PUT") {
      const { name, email, mobileNumber, accountsDto } = req.body;
  
      if (!name || !email || !mobileNumber) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      try {
        const response = await fetch(
          `${ACCOUNTS_SERVICE_BASE_URL}${UPDATE_ENDPOINT}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, mobileNumber, accountsDto }),
          }
        );
  
        const data = await response.json();
        if (response.ok) {
          return res.status(200).json(data);
        } else {
          return res
            .status(response.status)
            .json({ error: data.message || "Update failed" });
        }
      } catch (error) {
        return res.status(500).json({ error: "Server error, please try again" });
      }
    } else {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  }
  
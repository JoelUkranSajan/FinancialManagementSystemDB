export default async function handler(req, res) {
    const ACCOUNTS_SERVICE_BASE_URL = "http://accounts:8081";
    const DELETE_ENDPOINT = "/api/delete";
  
    if (req.method === "DELETE") {
      const { mobileNumber } = req.query;
  
      if (!mobileNumber) {
        return res.status(400).json({ error: "Missing mobile number" });
      }
  
      try {
        const response = await fetch(
          `${ACCOUNTS_SERVICE_BASE_URL}${DELETE_ENDPOINT}?mobileNumber=${mobileNumber}`,
          { method: "DELETE" }
        );
  
        if (response.ok) {
          return res.status(200).json({ message: "Account deleted successfully" });
        } else {
          const data = await response.json();
          return res.status(response.status).json({
            error: data.message || "Delete failed",
          });
        }
      } catch (error) {
        return res.status(500).json({ error: "Server error, please try again" });
      }
    } else {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  }
  
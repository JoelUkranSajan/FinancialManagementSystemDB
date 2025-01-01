export default async function handler(req, res) {
    if (req.method === "POST") {
      const { mobileNumber } = req.query;
  
      if (!mobileNumber) {
        return res.status(400).json({ error: "Mobile number is required." });
      }
  
      try {
        const response = await fetch(
          `http://localhost:9000/api/create?mobileNumber=${mobileNumber}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );
  
        if (response.ok) {
          // Loan created successfully
          const data = await response.json();
          return res.status(201).json(data);
        } else {
          // Some error occurred in the loans microservice
          const errorData = await response.json();
          return res.status(response.status).json(errorData);
        }
      } catch (error) {
        console.error("Error creating loan:", error);
        return res.status(500).json({ error: "Internal server error." });
      }
    } else {
      // Only POST allowed
      return res.status(405).json({ error: "Method not allowed." });
    }
  }
  
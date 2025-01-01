export default async function handler(req, res) {
    if (req.method === "PUT") {
      // Typically, the Loans microservice expects a JSON body containing updated loan details.
      // For example, a "LoansDto" object with fields like loanNumber, amount, etc.
      // We'll assume req.body is already in the correct shape for your microservice.
  
      try {
        const response = await fetch("http://localhost:9000/api/update", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(req.body), // Forward the request body to the microservice
        });
  
        // The microservice might return 200 if successful, 417 if expectation failed, etc.
        const responseData = await response.json();
  
        if (response.ok) {
          // Loan updated successfully
          return res.status(200).json(responseData);
        } else {
          // Some error from the microservice
          return res.status(response.status).json(responseData);
        }
      } catch (error) {
        console.error("Error updating loan:", error);
        return res.status(500).json({ error: "Internal server error." });
      }
    } else {
      // Only PUT allowed
      return res.status(405).json({ error: "Method not allowed." });
    }
  }
  
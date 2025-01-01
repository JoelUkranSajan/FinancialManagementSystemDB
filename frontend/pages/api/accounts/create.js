export default async function handler(req, res) {
    console.log("Incoming request:", req.method, req.url);

    if (req.method === 'POST') {
        const { name, email, mobile_number } = req.body;

        // Ensure required fields are present
        if (!name || !email || !mobile_number) {
            console.log("Validation failed: Missing fields. Name:", name, "Email:", email, "Mobile:", mobile_number);
            return res.status(400).json({ error: 'All fields (name, email, mobile) are required' });
        }

        // Validate mobile number format
        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(mobile_number)) {
            console.log("Validation failed: Invalid mobile number format. Mobile number:", mobile_number);
            return res.status(400).json({ error: 'Invalid mobile number format' });
        }

        console.log("Request data being sent to Accounts service:", { name, email, mobile_number });

        try {

            // Log the data being sent to the Accounts service to debug
            console.log("Data being sent to Accounts service:", {
                name,
                email,
                mobile: mobile_number  // Make sure the mobile number is present here
            });
            // Forward the request to the Accounts service (running on port 8081)
            const response = await fetch('http://localhost:8081/api/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    mobileNumber: mobile_number,  // Send the correct field format
                }),
            });

            console.log("Received response from Accounts service. Status code:", response.status);

            const data = await response.json();
            console.log("Response data from Accounts service:", data);

            // Respond with the data from the accounts service
            if (response.ok) {
                console.log("Account registered successfully:", data);
                return res.status(200).json({ message: 'Account registered successfully', account: data });
            } else {
                console.log("Account registration failed. Error message:", data.message || 'Something went wrong');
                return res.status(response.status).json({ error: data.message || 'Something went wrong' });
            }
        } catch (error) {
            console.error("Error occurred while forwarding request to Accounts service:", error);
            return res.status(500).json({ error: 'Server error, please try again' });
        }
    } else {
        console.log("Method Not Allowed for request:", req.method);
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}



export default async function handler(req, res) {
    console.log("Incoming request:", req.method, req.url);

    const ACCOUNTS_SERVICE_BASE_URL = "http://accounts:8081";
    const CREATE_ENDPOINT = "/api/create";
    if (req.method === 'POST') {
        const { name, email, mobile_number } = req.body;

        if (!name || !email || !mobile_number) {
            console.log("Validation failed: Missing fields. Name:", name, "Email:", email, "Mobile:", mobile_number);
            return res.status(400).json({ error: 'All fields (name, email, mobile) are required' });
        }

        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(mobile_number)) {
            console.log("Validation failed: Invalid mobile number format. Mobile number:", mobile_number);
            return res.status(400).json({ error: 'Invalid mobile number format' });
        }

        console.log("Request data being sent to Accounts service:", { name, email, mobile_number });

        try {

            console.log("Data being sent to Accounts service:", {
                name,
                email,
                mobile: mobile_number  
            });
            const response = await fetch(`${ACCOUNTS_SERVICE_BASE_URL}${CREATE_ENDPOINT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    mobileNumber: mobile_number,  
                }),
            });

            console.log("Received response from Accounts service. Status code:", response.status);

            const data = await response.json();
            console.log("Response data from Accounts service:", data);

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



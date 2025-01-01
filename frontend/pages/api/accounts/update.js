export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const { name, email, mobileNumber, accountsDto } = req.body;

        // Validate required fields
        if (!name || !email || !mobileNumber) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        try {
            // Forward the request to the backend service
            const response = await fetch('http://localhost:8081/api/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, mobileNumber, accountsDto }),
            });

            const data = await response.json();
            if (response.ok) {
                return res.status(200).json(data);
            } else {
                return res.status(response.status).json({ error: data.message || 'Update failed' });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Server error, please try again' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}

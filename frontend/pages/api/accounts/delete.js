export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const { mobileNumber } = req.query;

        if (!mobileNumber) {
            return res.status(400).json({ error: 'Missing mobile number' });
        }

        try {
            // Forward the request to the backend service
            const response = await fetch(`http://localhost:8081/api/delete?mobileNumber=${mobileNumber}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                return res.status(200).json({ message: 'Account deleted successfully' });
            } else {
                const data = await response.json();
                return res.status(response.status).json({ error: data.message || 'Delete failed' });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Server error, please try again' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}

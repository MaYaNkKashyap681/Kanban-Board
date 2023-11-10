import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config();

export const fetchSingleProject = async (p_id: string, token: string | undefined) => {
    try {
        if(!token) return;
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects/${p_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // console.log(response.data)
        if (response.data.success === true) {
            return response.data;
        }
    } catch (err) {
        console.error('Error fetching data:', err);
    }
}


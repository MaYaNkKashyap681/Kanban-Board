import { useAuth } from '@/hooks/useAuth';
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config();

export const fetchProject = async (user_token: string | undefined) => {
    if(!user_token) return;
    try {

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
            headers: {
                'Authorization': `Bearer ${user_token}`
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


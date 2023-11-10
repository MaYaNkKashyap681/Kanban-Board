import axios from 'axios'

export const fetchSingleProject = async (p_id: string) => {
    try {
        const response = await axios.get(`http://localhost:8000/projects/${p_id}`, {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRjYTAzOTIxMjM2MzcxNGVlMDBhZjAiLCJpYXQiOjE2OTk2MDE1OTAsImV4cCI6MTY5OTYyNjc5MH0.H2BiK0XPLu869gKZKoLZiIDq1y4JpUd585AQ2myXYTQ'
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


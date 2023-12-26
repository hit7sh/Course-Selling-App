import axios from "axios";
const f = async () => {
        const resp = await axios.get('http://localhost:3000/admin/me', {
            headers: {
                Authorization:'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiJwYXNzIiwiaWF0IjoxNjkwNTY3NTI3LCJleHAiOjE2OTA2NTM5Mjd9.Mu1JqNi70-_94I1Qt0QCd0dqaCdFIQSmFFsVWyTAeoE'
            }
        });
        console.log(resp.data);
}
f();
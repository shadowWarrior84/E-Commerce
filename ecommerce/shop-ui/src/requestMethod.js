import axios from "axios";

const BASE_URL = "http://localhost:8000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMmUxYWZiNTM2ZjFmOWZlYjcyNjk4YiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NzYwNDM1NiwiZXhwIjoxNjQ3ODYzNTU2fQ.GdGf-K7OKW4Te3_P0C7FCiVLr3Sn6cXZiykYHqThinM";

export const publicRequest = axios.create({
    baseURL: BASE_URL
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header:{token: `Bearer ${TOKEN}`}
})


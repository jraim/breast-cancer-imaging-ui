import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:5000/';

const api = axios.create({ baseURL });

const datasetApi = {
    init: (caseCode) => api.post('api/mri/init', { case: caseCode }),
    getCaseCodes: () => api.get('api/mri/list'),
    getSlice: (sliceNum) => api.get(`api/mri/slice/${sliceNum}`),
    sendEllipseData: (sliceNum, data) => api.post(`api/mri/snake/${sliceNum}`, data),
    baseURL,
};

export default datasetApi;

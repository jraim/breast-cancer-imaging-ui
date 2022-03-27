// import axios from 'axios';

// export default axios.create({
//     baseURL: 'https://picsum.photos/',
// });

const datasetApi = {
    get: async () => {
        return [
            {
                id: 1,
                url: 'https://picsum.photos/600/400',
            },
            {
                id: 2,
                url: 'https://picsum.photos/600/401',
            },
            {
                id: 3,
                url: 'https://picsum.photos/600/402',
            },
            {
                id: 4,
                url: 'https://picsum.photos/601/400',
            },
            {
                id: 5,
                url: 'https://picsum.photos/601/401',
            },
            {
                id: 6,
                url: 'https://picsum.photos/601/402',
            },
            {
                id: 7,
                url: 'https://picsum.photos/602/400',
            },
            {
                id: 8,
                url: 'https://picsum.photos/602/401',
            },
            {
                id: 9,
                url: 'https://picsum.photos/602/402',
            },
            {
                id: 10,
                url: 'https://picsum.photos/603/400',
            },
        ];
    },
};

export default datasetApi;

// import axios from 'axios';

// export default axios.create({
//     baseURL: 'https://picsum.photos/',
// });

const datasetApi = {
    init: async () => {
        return new Promise((resolve, reject) => setTimeout(resolve, 2000, { success: true }));
    },
    getCaseCodes: async () => {
        return [
            'Breast_MRI_001/61-61-1990-NA-MRI BREAST BILATERAL NWO-97538/14.000900-ax dyn 4th paSS-47560',
            'Breast_MRI_991/01-91-1996-NA-MRI BREAST BILATERAL NWO-97538/11.990990-ax dyn 3rd paSS-41458',
            'Breast_MRI_661/01-91-1990-NA-MRI BREAST BILATERAL NWO-97538/5.909098-ax dyn lst paSS-59529',
            'Breast_MRI_091/01-91-1996-NA-MRI BREAST BILATERAL NWO-97538/26.098960-ax t1 tse C-58582',
        ];
    },
    getSlice: async (num) => {
        return new Promise((resolve, reject) => {
            const data = {
                1: {
                    image_path: 'https://picsum.photos/600/400',
                    shape: {
                        width: 600,
                        height: 400,
                    },
                    slice_number: num,
                    success: true,
                },
                2: {
                    image_path: 'https://picsum.photos/602/400',
                    shape: {
                        width: 602,
                        height: 400,
                    },
                    slice_number: num,
                    success: true,
                },
                3: {
                    image_path: 'https://picsum.photos/601/401',
                    shape: {
                        width: 601,
                        height: 401,
                    },
                    slice_number: num,
                    success: true,
                },
                4: {
                    image_path: 'https://picsum.photos/600/401',
                    shape: {
                        width: 600,
                        height: 401,
                    },
                    slice_number: num,
                    success: true,
                },
                5: {
                    image_path: 'https://picsum.photos/601/402',
                    shape: {
                        width: 601,
                        height: 402,
                    },
                    slice_number: num,
                    success: true,
                },
                6: {
                    image_path: 'https://picsum.photos/601/400',
                    shape: {
                        width: 600,
                        height: 400,
                    },
                    slice_number: num,
                    success: true,
                },
                7: {
                    image_path: 'https://picsum.photos/600/401',
                    shape: {
                        width: 600,
                        height: 401,
                    },
                    slice_number: num,
                    success: true,
                },
            };

            setTimeout(resolve, 1000, data[num]);
        });
    },
    sendEllipseData: (data) => {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 1000, { success: true });
        });
    },
};

export default datasetApi;

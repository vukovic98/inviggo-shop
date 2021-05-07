import API from '../services/axios.api';
import AuthService from '../services/Auth.service';


const ENDPOINTS = {
    LOAD_ADDS: 'advertisement/by-page/',
    FILTER_ADDS: 'advertisement/filter/by-page/',
    FILTER_MY_ADDS: 'advertisement/filter-my-adds/by-page/',
    ADDVERTISEMENT_ENDPOINT: 'advertisement/'
  };

const AddService = {

    loadAdds: async function (pageNum) {
        try {
            const {data} = await API.get(ENDPOINTS.LOAD_ADDS + pageNum);

            return data;
        } catch {
            return null;
        }
    },

    deleteAdd: async function (id) {
        try{
            const token = AuthService.getToken();
            const {data} = await API.delete(ENDPOINTS.ADDVERTISEMENT_ENDPOINT + id, { headers: {"Authorization" : `Bearer ${token}`}});
            return true;
        } catch {
            return false;
        }
    },

    addAdvertisement: async function (dto) {
        try{
            const token = AuthService.getToken();
            const {data} = await API.post(ENDPOINTS.ADDVERTISEMENT_ENDPOINT, dto, { headers: {"Authorization" : `Bearer ${token}`}});

            return true;
        } catch {
            return false;
        }
    },

    editAdvertisement: async function (dto) {
        try{
            const token = AuthService.getToken();
            const {data} = await API.put(ENDPOINTS.ADDVERTISEMENT_ENDPOINT, dto, { headers: {"Authorization" : `Bearer ${token}`}});

            return true;
        } catch {
            return false;
        }
    },

    fetchAdvertisement: async function (id) {
        try{
            const token = AuthService.getToken();
            const {data} = await API.get(ENDPOINTS.ADDVERTISEMENT_ENDPOINT + id, { headers: {"Authorization" : `Bearer ${token}`}});

            return data;
        } catch {
            return null;
        }
    },

    filterAdds: async function (page, dto) {
        if(dto.myAdds) {
            try{
                const token = AuthService.getToken();
                const {data} = await API.post(ENDPOINTS.FILTER_MY_ADDS + page, dto, { headers: {"Authorization" : `Bearer ${token}`}});

                return data;
            } catch {
                return null;
            }
        } else {
            try{
                const token = AuthService.getToken();
                const {data} = await API.post(ENDPOINTS.FILTER_ADDS + page, dto);

                return data;
            } catch {
                return null;
            }
        }
    }

}

export default AddService;
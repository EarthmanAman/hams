import { HAMS_ADMIN_URL, HAMS_NOTIFICATION_URL } from "../utils/_consts";

export const api_stub_get = async (extension) => {
    // var token = store.getState().auth_reducer.token
    try {
        let raw_data = await fetch(`${HAMS_ADMIN_URL}${extension}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // "Authorization": `Token ${token.token}`
            },

        });
        let data = await raw_data.json();
        // if (token.is_staff === false && depot === false) {
        //     data = data.filter(obj => {
        //         return token.depots_name.includes(obj.name)
        //     })
        // }
        raw_data = null;

        return data
    }
    catch (error) {
        console.log(error)
        throw error;

    }
}


export const notification_api_stub_get = async (extension) => {
    // var token = store.getState().auth_reducer.token
    try {
        let raw_data = await fetch(`${HAMS_NOTIFICATION_URL}${extension}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // "Authorization": `Token ${token.token}`
            },

        });
        let data = await raw_data.json();
        // if (token.is_staff === false && depot === false) {
        //     data = data.filter(obj => {
        //         return token.depots_name.includes(obj.name)
        //     })
        // }
        raw_data = null;

        return data
    }
    catch (error) {
        console.log(error)
        throw error;

    }
}

export const api_stub_post = async (extension, api_body) => {
    // var token = store.getState().auth_reducer.token
    try {
        let raw_data = await fetch(`${HAMS_ADMIN_URL}${extension}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // "Authorization": `Token ${token.token}`
            },
            body: JSON.stringify(api_body)
        });
        let data = await raw_data.json();
        raw_data = null;
        return data
    }
    catch (error) {
        console.log(error)
        throw error;

    }
}


export const notification_api_stub_post = async (extension, api_body) => {
    // var token = store.getState().auth_reducer.token
    try {
        let raw_data = await fetch(`${HAMS_NOTIFICATION_URL}${extension}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // "Authorization": `Token ${token.token}`
            },
            body: JSON.stringify(api_body)
        });
        let data = await raw_data.json();
        raw_data = null;
        return data
    }
    catch (error) {
        console.log(error)
        throw error;

    }
}


export const notification_api_stub_put = async (extension, api_body) => {
    // var token = store.getState().auth_reducer.token
    try {
        let raw_data = await fetch(`${HAMS_NOTIFICATION_URL}${extension}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // "Authorization": `Token ${token.token}`
            },
            body: JSON.stringify(api_body)
        });
        let data = await raw_data.json();
        raw_data = null;
        return data
    }
    catch (error) {
        console.log(error)
        throw error;

    }
}

export const notification_api_stub_delete = async (extension) => {
    // var token = store.getState().auth_reducer.token
    try {
        let raw_data = await fetch(`${HAMS_NOTIFICATION_URL}${extension}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // "Authorization": `Token ${token.token}`
            },
            // body: JSON.stringify(api_body)
        });
        // let data = await raw_data.json();
        // raw_data = null;
        // return data
    }
    catch (error) {
        console.log(error)
        throw error;

    }
}
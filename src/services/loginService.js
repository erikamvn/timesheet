import api from './api';

const executeLogin = async (userID, accessKey) => {
 //   const url = API_URL + '/Accounts';

    try{

        const res = await api.post('/Accounts', {
            userID,
            accessKey,
            "grantType": 'password'
        });

        if (res.status === 200){
            const { accessToken, expiresIn, refreshToken, name } = res.data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("expiresIn", expiresIn);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("usuarioLogado", name);
            return true;
        }else{
            return false;
        }
    } catch (e){
        console.log(e)
        return false;
    }
    
}

export {executeLogin};
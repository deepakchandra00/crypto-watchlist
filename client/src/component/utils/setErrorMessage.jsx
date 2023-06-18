export const setErrorStatus = (error) => {
    let errorMessage = ""
    if (error.response) {
        errorMessage = error.response.data?.message || "";
        const errorPath = error.response.data?.path || "";
        if (error.response.status === 401) {
            errorMessage = "No authorization for such actions or expired credentials. Please signing in again or if needed, request more access rights! Error Details :" +
                errorMessage
        } else if (error.response.status === 403) {
            errorMessage = "Forbidden! Please check if you have VPN connection! Error details :" +
                errorPath + errorMessage
        } else if (error.response.status === 407) {
            errorMessage = "Proxy authenticatino required! Error details :" +
                errorPath + errorMessage
        } else if (error.response.status >= 400 && error.response.status < 500) {
            errorMessage = "Server rejected request for path : Error details :" +
                errorPath + errorMessage + "with response status" + error.response?.status
        } else if (error.response.status >= 500) {
            errorMessage = "Issue with the server. Please try again later! Error details :" +
                errorPath + errorMessage
        } else {
            errorMessage = "UnknownAxiosError" +
                errorPath + errorMessage
        }
    } else if(error.request){
        errorMessage = "UnknownAxiosError" +
        error.request + (error?.message || "")
    } else {
        errorMessage = "UnknownError " + (error?.message || "")
    }
    return {hasError:true, message:errorMessage}
}
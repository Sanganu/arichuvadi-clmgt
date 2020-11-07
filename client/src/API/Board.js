import axios from "axios";
export default {
    createBoardMember: function (memberDetails) {
        return axios.post('/api/board/new', memberDetails)
    },
    boardMemberLogin: function (authdetails) {
        return axios.post('/auth/login', authdetails)
    }
}
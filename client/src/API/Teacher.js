import axios from "axios";

export default {
    getAllInstructors() {
        return axios("/api/board/all")
    }
}
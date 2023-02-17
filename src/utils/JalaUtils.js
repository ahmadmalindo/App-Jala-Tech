import { 
    getListPriceEbbie,
    getFilterByRegion,
    getDetailPriceEbbie,

    getListNewsEbbie,

    getListDiseasesEbbie,

} from "../constants/apiJala";

class Jala {

    async ListPriceEbbie(params) {
        return params = await getListPriceEbbie(params).then((response) => {
            const res = response.data
            return res

        }).catch((error) => {
            return ToastConnection()
        })
    }

    async FilterByRegion(params) {
        return params = await getFilterByRegion(params).then((response) => {
            const res = response.data
            return res

        }).catch((error) => {
            return ToastConnection()
        })
    }

    async DetailPriceEbbie(params) {
        return params = await getDetailPriceEbbie(params).then((response) => {
            const res = response.data
            return res

        }).catch((error) => {
            return ToastConnection()
        })
    }

    async ListNewsEbbie(params) {
        return params = await getListNewsEbbie(params).then((response) => {
            const res = response.data
            return res

        }).catch((error) => {
            return ToastConnection()
        })
    }

    async ListDiseasesEbbie(params) {
        return params = await getListDiseasesEbbie(params).then((response) => {
            const res = response.data
            return res

        }).catch((error) => {
            return ToastConnection()
        })
    }
}

const jala = new Jala()

Object.freeze(jala)

export default jala

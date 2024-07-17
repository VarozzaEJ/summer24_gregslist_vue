import { AppState } from "../AppState.js"
import { House } from "../models/House.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class HousesService {
    async getHouses() {
        const response = await api.get('api/houses')
        logger.log(response.data)
        const houses = response.data.map(housePOJO => new House(housePOJO))
        AppState.houses = houses
    }
    async createHouse(editableCarData) {
        const response = await api.post('api/houses', editableCarData)
        logger.log(response.data)
        const newHouse = new House(response.data)
        AppState.houses.push(newHouse)
    }


}

export const housesService = new HousesService()
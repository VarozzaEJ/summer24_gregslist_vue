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
    async deleteHouse(houseId) {
        const response = await api.delete(`api/houses/${houseId}`)
        logger.log('Destroying car with the properties of:', response)
        const houseIndex = AppState.houses.findIndex(house => house.id == houseId)
        if (houseIndex == -1) throw new Error("You messed up finding the index");
        AppState.houses.splice(houseIndex, 1)
    }


}

export const housesService = new HousesService()
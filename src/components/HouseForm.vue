<script setup>
import { ref } from 'vue';
import Pop from '../utils/Pop.js';
import { Modal } from 'bootstrap';
import { housesService } from '../services/HousesService.js';


const editableHouseData = ref({
    bedrooms: 0,
    bathrooms: 0,
    levels: 0,
    year: 0,
    price: 0,
    description: '',
    imgUrl: ''
})

async function createHouse() {
    try {
        await housesService.createHouse(editableHouseData.value) // NOTE this is a ref object, we have to pass down the value stored inside of the ref
        editableHouseData.value = {
            bedrooms: 0,
            bathrooms: 0,
            levels: 0,
            year: 0,
            price: 0,
            description: '',
            imgUrl: ''
        }
        Modal.getOrCreateInstance('#houseFormModal').hide()
    } catch (error) {
        Pop.error(error)
    }
}
</script>


<template>
    <!-- NOTE .prevent will call event.preventDefault() -->
    <form @submit.prevent="createHouse()">
        <div class="form-floating mb-3">
            <!-- NOTE v-model sets up tow data binding between the input's value and a variable declared in the script -->
            <!-- this input is bound to the make property in our ref object -->
            <input v-model="editableHouseData.bedrooms" type="text" class="form-control" id="bedrooms"
                placeholder="Car Bedrooms..." required maxlength="500">
            <label for="make">Bedrooms</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="editableHouseData.bathrooms" type="text" class="form-control" id="Bathrooms"
                placeholder="Bathrooms..." required maxlength="500">
            <label for="Bathrooms">Bathrooms</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="editableHouseData.levels" type="text" class="form-control" id="Levels"
                placeholder="Car Levels..." required maxlength="500">
            <label for="Levels">Levels</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="editableHouseData.imgUrl" type="url" class="form-control" id="imgUrl"
                placeholder="House ImgUrl..." required maxlength="500">
            <label for="imgUrl">House ImgUrl</label>
        </div>
        <div class="form-floating mb-3">
            <textarea v-model="editableHouseData.description" class="form-control" placeholder="House Description..."
                id="description" maxlength="500"></textarea>
            <label for="description">House Description</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="editableHouseData.year" type="number" class="form-control" id="year"
                placeholder="House Year..." required>
            <label for="year">House Year</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="editableHouseData.price" type="range" class="form-control" id="price"
                placeholder="House Price..." required min="0" max="1000000">
            <label for="price">House Price {{ '$' + editableHouseData.price }}</label>
        </div>

        <div class="text-end">
            <button class="btn btn-dark" type="submit">Submit</button>
        </div>
    </form>
</template>


<style scoped></style>
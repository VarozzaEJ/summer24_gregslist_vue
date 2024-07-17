<script setup>
import { onMounted } from 'vue';
import { housesService } from '../services/HousesService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import { computed } from 'vue';
import HouseCard from '../components/HouseCard.vue'
import FormModal from '../components/FormModal.vue';
import HouseForm from '../components/HouseForm.vue';


const houses = computed(() => AppState.houses)
const account = computed(() => AppState.account)


onMounted(() => {
    getHouses()
})

async function getHouses() {
    try {
        await housesService.getHouses()
    }
    catch (error) {
        Pop.error(error);
    }
}

</script>


<template>


    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="d-flex align-items-center gap-3">
                    <h1>Cars</h1>
                    <!-- NOTE only show button if there is an account object in the appstate (if you are logged in) -->
                    <button v-if="account" class="btn btn-dark" data-bs-toggle="modal"
                        data-bs-target="#houseFormModal">Create
                        House
                        Listing</button>
                </div>
            </div>
        </div>
        <section class="row">

            <div v-for="house in houses" :key="house.id" class="col-12 mb-3">
                <p>

                </p>
                <HouseCard :houseProp="house" />
            </div>
        </section>
    </div>
    <FormModal modalId="houseFormModal">
        <template #modalHeader>
            Create House
        </template>
        <!-- targets the slot with name of 'modalBody' and injects whatever is between the template tags -->
        <template #modalBody>
            <HouseForm />
        </template>
    </FormModal>
</template>


<style lang=" scss" scoped>
        </style>

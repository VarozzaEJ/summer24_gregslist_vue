<script setup>
import { AppState } from '../AppState.js';
import { House } from '../models/House.js';
import { computed } from 'vue';
import Pop from '../utils/Pop.js';
import { housesService } from '../services/HousesService.js';


const account = computed(() => AppState.account)

defineProps({ houseProp: { type: House } })


async function deleteHouse(houseId) {
    try {
        const wantsToDelete = await Pop.confirm("Are You Sure About That?")
        if (!wantsToDelete) return
        await housesService.deleteHouse(houseId)
    }
    catch (error) {
        Pop.error(error);
    }
}

</script>


<template>
    <div class="row car-card" style="">
        <div class="col-md-6 px-0">
            <img :src="houseProp.imgUrl" :alt="`${houseProp.year}`" class="car-img img-fluid">
        </div>
        <div class="col-md-6">
            <div class="p-2 d-flex flex-column justify-content-between h-100">
                <div>
                    <h2>{{ houseProp.year }} {{ houseProp.bedrooms }} bedroom(s) {{ houseProp.bathrooms }} bathroom(s)
                    </h2>
                    <h3>{{ '$' + houseProp.price }}</h3>
                </div>
                <div>
                    <h3>Listed on {{ houseProp.createdAt.toLocaleDateString() }}</h3>
                    <p>{{ houseProp.description }}</p>
                    <div class="d-flex align-items-center"
                        :class="account?.id == houseProp.creatorId ? 'justify-content-between' : 'justify-content-end'">
                        <!-- NOTE don't forget elvis, because the account is not set in the appstate before these cards render -->
                        <button v-if="account?.id == houseProp.creatorId" class="btn btn-outline-danger"
                            title="Delete House" type="button" @click="deleteHouse(houseProp.id)">
                            <i class="mdi mdi-close-octagon fs-3"></i>
                        </button>
                        <img :src="houseProp.creator.picture" :alt="houseProp.creator.name"
                            :title="`Contact ${houseProp.creator.name} for more information`" class="creator-picture">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.car-img {
    min-height: 100%;
    width: 100%;
    object-fit: cover;
}

.car-card {
    background-color: rgb(215, 215, 215);
    box-shadow: 0 7px 15px black;
    border-style: solid;
    border-width: 6px;
}

.creator-picture {
    height: 15vh;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 50%;
}
</style>
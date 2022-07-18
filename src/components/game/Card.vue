<script>
/* eslint-disable */
    export default{
        name: 'ShitheadCard'
    }
</script>

<script setup>
import {computed} from 'vue';

const props = defineProps({
    suit:{
        type: String,
        required: true,
        validator(val){
            return ['hearts','clubs','diamonds','spades'].includes(val.toLowerCase());
        }
    },
    value:{
        type: String,
        required: true,
        validator(val){
            return ['1','2','3','4','5','6','7','8','9','10','J','Q','K','A'].includes(val.toUpperCase());
        }
    }
});

const classObj = computed(()=>{
    return `_${props.value}`
});

const valueIsNumeric = computed(()=>{
    return !isNaN(parseInt(props.value,10));
});
</script>

<template>
    <div class="gamecard">
        <div class="valueRow">
             <span>{{value}}</span> <img src="@/assets/suits/hearts.svg" class="suit-img-small"/>
        </div>
        <div class="mainValue" :class="classObj">
            <template v-if="valueIsNumeric">
                <img :src="suitImage" class="suit-img" v-for="n in parseInt(props.value)"/>
            </template>
        </div>
        <div class="valueRow">
             <span>{{value}}</span> <img :src="suitImage" class="suit-img-small"/>
        </div>
    </div>
</template>

<style lang="scss">
.gamecard{
    cursor: pointer;

    border: 1px solid #000000;
    border-radius: 15px;

    min-height: 15rem;
    min-width: 2rem;
    max-width: 12rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .mainValue{
        flex-grow: 1;
        border: 1px solid blue;

        .suit-img{
            width: 2rem;
        }


        &._2, &._3{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
        }
    }

    .valueRow{
        display: flex;
        flex-direction: column;
            margin: 0.7em;
        height: 100%;
        justify-content: flex-start;
        align-items: flex-start;
        border: 1px solid red;

        .suit-img-small{
            width: 1rem;
        }

        &:first-of-type{
            margin-bottom: 0;
        }


        &:last-of-type{
            margin-top: 0;
            transform: rotate(180deg);
        }

        span{
            font-weight: bold;
        }
    }
}
</style>
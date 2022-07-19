<script>
/* eslint-disable */
export default {
    name: 'ShitheadCard'
}
</script>

<script setup>
import { computed } from 'vue';
import useIcons from '@/useIcons';

const ICONS = useIcons();

const props = defineProps({
    suit: {
        type: String,
        required: true,
        validator(val) {
            return ['hearts', 'clubs', 'diamonds', 'spades'].includes(val.toLowerCase());
        }
    },
    value: {
        type: String,
        required: true,
        validator(val) {
            return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'].includes(val.toUpperCase());
        }
    }
});

const classObj = computed(() => {
    return `_${props.value}`
});

const numericValue = computed(() => {
    const cardValue = props.value === 'A' ? 1 : parseInt(props.value, 10);
    return !isNaN(cardValue) ? cardValue : false;
});

const suitImage = computed(() => {
    return ICONS(`./suits/${props.suit}.svg`);
});

const faceImage = computed(() => {
    if (props.value === 'J' || props.value === 'Q' || props.value === 'K') {
        return ICONS(`./facecards/${props.value}.svg`);
    }
    return false;
});
</script>

<template>
    <div class="gamecard">
        <div class="valueRow">
            <span>{{ value }}</span> <img :src="suitImage" class="suit-img-small" />
        </div>
        <div class="mainValue" :class="classObj">

            <template v-if="numericValue">
                <template v-if="props.value === 'A' || props.value === '2' || props.value === '3'">
                    <img :src="suitImage" class="suit-img" v-for="n in numericValue" />
                </template>

                <template v-if="props.value === '5' || props.value === '7' || props.value === '8'">
                    <div>
                        <img :src="suitImage" class="suit-img" />
                        <img :src="suitImage" class="suit-img" />
                    </div>

                    <div>
                        <img :src="suitImage" class="suit-img" />
                    </div>

                    <div>
                        <img :src="suitImage" class="suit-img" />
                        <img :src="suitImage" class="suit-img" />
                    </div>

                    <div v-if="props.value === '8'">
                        <img :src="suitImage" class="suit-img" />
                    </div>

                    <div v-if="props.value === '7' || props.value === '8'">
                        <img :src="suitImage" class="suit-img" />
                        <img :src="suitImage" class="suit-img" />
                    </div>
                </template>

                <template v-if="props.value === '4' || props.value === '6'">
                    <div>
                        <img :src="suitImage" class="suit-img" v-for="n in Math.floor(numericValue / 2)" />
                    </div>
                    <div>
                        <img :src="suitImage" class="suit-img" v-for="n in Math.floor(numericValue / 2)" />
                    </div>
                </template>

                <template v-if="props.value === '9'">
                    <div>
                        <img :src="suitImage" class="suit-img" v-for="n in 4" />
                    </div>
                    <div>
                        <img :src="suitImage" class="suit-img" />
                    </div>
                    <div>
                        <img :src="suitImage" class="suit-img" v-for="n in 4" />
                    </div>
                </template>

                <template v-if="props.value === '10'">
                    <div class="mainValue _5">

                        <div>
                            <img :src="suitImage" class="suit-img" />
                            <img :src="suitImage" class="suit-img" />
                        </div>

                        <div>
                            <img :src="suitImage" class="suit-img" />
                        </div>

                        <div>
                            <img :src="suitImage" class="suit-img" />
                            <img :src="suitImage" class="suit-img" />
                        </div>
                    </div>
                    <div class="mainValue _5">

                        <div>
                            <img :src="suitImage" class="suit-img" />
                            <img :src="suitImage" class="suit-img" />
                        </div>

                        <div>
                            <img :src="suitImage" class="suit-img" />
                        </div>

                        <div>
                            <img :src="suitImage" class="suit-img" />
                            <img :src="suitImage" class="suit-img" />
                        </div>
                    </div>
                </template>
            </template>

            <template v-if="faceImage">
                <div>
                    <img :src="suitImage" class="suit-img" />
                </div>

                <div>
                    <img :src="faceImage" class="face-img" />
                    <img :src="faceImage" class="face-img" />
                </div>


                <div>
                    <img :src="suitImage" class="suit-img" />
                </div>
            </template>
        </div>
        <div class="valueRow">
            <span>{{ value }}</span> <img :src="suitImage" class="suit-img-small" />
        </div>
    </div>
</template>

<style lang="scss">
.gamecard {
    cursor: pointer;

    border: 1px solid #000000;
    background-color: #f0fff0;
    border-radius: 15px;

    min-height: 15rem;
    min-width: 2rem;
    max-width: 12rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .valueRow {
        display: flex;
        flex-direction: column;
        margin: 0.7em;
        height: 100%;
        justify-content: flex-start;
        align-items: flex-start;

        .suit-img-small {
            width: 1rem;
        }

        &:first-of-type {
            margin-bottom: 0;
        }


        &:last-of-type {
            margin-top: 0;
            transform: rotate(180deg);
        }

        span {
            font-weight: bold;
        }
    }

    .mainValue {
        flex-grow: 1;
        margin-left: 0.7em;
        margin-right: 0.7em;
        display: flex;

        .suit-img {
            width: 2rem;
            z-index: 3;
        }

        &._J,
        &._Q,
        &._K {
            flex-direction: column;
            justify-content: center;

            div {
                display: flex;
                flex-direction: column;
                align-items: flex-start;

                &:nth-of-type(2) {
                    align-items: center;

                    .face-img {

                        width: 5rem;
                        z-index: 2;

                        &:last-of-type {
                            transform: rotate(180deg);
                            z-index: 1;
                            position: relative;
                            top: -0.7rem;
                        }
                    }
                }

                &:last-of-type {
                    transform: rotate(180deg);
                }
            }

        }

        &._A,
        &._2,
        &._3 {
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
        }

        &._A {
            justify-content: center;
        }

        &._2,
        &._3 {
            .suit-img:last-of-type {
                transform: rotate(180deg);
            }
        }

        &._4,
        &._6 {
            flex-direction: row;
            justify-content: space-around;

            div {
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .suit-img {
                    &:last-of-type {
                        transform: rotate(180deg);
                    }
                }
            }
        }

        &._5,
        &._7,
        &._8 {
            flex-direction: column;
            justify-content: space-between;

            div {
                display: flex;
                flex-direction: row;
                justify-content: space-around;

                &:nth-of-type(2) {
                    justify-content: center;
                }

                &:last-of-type {
                    transform: rotate(180deg);
                }
            }
        }

        &._8 {
            div {
                &:nth-last-of-type(2) {
                    transform: rotate(180deg);
                }
            }
        }

        &._9 {
            flex-direction: row;
            justify-content: space-evenly;

            div {
                display: flex;
                flex-direction: column;
                justify-content: space-around;

                &:nth-of-type(1),
                &:nth-of-type(3) {
                    .suit-img {

                        &:nth-last-of-type(1),
                        &:nth-last-of-type(2) {
                            transform: rotate(180deg);
                        }
                    }
                }

            }
        }

        &._10 {
            flex-direction: column;

            .mainValue {
                div {
                    &:last-of-type {
                        transform: none;
                    }
                }

                &:nth-of-type(2) {
                    transform: rotate(180deg);
                }
            }
        }


    }


}
</style>
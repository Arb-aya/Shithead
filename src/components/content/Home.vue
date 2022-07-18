<script>
export default{
    name: 'ShitheadHome'
}
</script>
<script setup>
import ShitheadCard from "@/components/game/Card";
</script>

<template>
Home page here fool.
<router-link :to="{name:'login'}"> Login </router-link>

<ShitheadCard value="3" suit="hearts"></ShitheadCard>
</template>

<style lang="scss">
</style>

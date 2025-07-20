<script setup>
import LayoutNav from '@/components/LayoutNav.vue'
import LayoutHeader from '@/components/LayoutHeader.vue'
import LayoutFooter from '@/components/LayoutFooter.vue'
import LayoutFixed from '@/components/LayoutFixed.vue'
import { getLayoutHeader } from '@/apis/textapi'
import { onMounted,ref } from 'vue'
import { useCountStore } from '@/stores/counter'
defineOptions({
    name:'LayoutIndex',
})
const headers=ref([])
const count_store=useCountStore()
onMounted(async ()=>{
    const getdata=await getLayoutHeader()
    headers.value=getdata.data.result
    count_store.getheaders(headers.value)
})
</script>
<template>
  <LayoutFixed/>
  <LayoutNav />
  <LayoutHeader :headers="headers" />
  <RouterView />
  <LayoutFooter />
</template>
<style>
</style>
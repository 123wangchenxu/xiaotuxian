import { defineStore } from "pinia";
import { ref } from "vue";
export const useCountStore=defineStore('count',()=>{
  const headers=ref([])
  function getheaders(Headers)
  {
    headers.value=Headers
  }
  return { headers, getheaders };
})
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
//So basically getters and mutations getters
//'state' as their default parameter
//and actions get 'context' as their parameter
//which is like passing the whole'store'
//but it is not actually a store
export const store = new Vuex.Store({
  state:{
    products:[
      {name:'Banana Skin',price:20},
      {name:'Shiny Star',price:40},
      {name:'Green Shells',price:60},
      {name:'Red Shells',price:80}
    ]
  },
  //MAP GETTERS TO COMPUTED PRPERTIES AND MAP ACTIONS TO METHODS
  getters:{
    saleProducts:state=>{
      var saleProducts = state.products.map(product =>{
        return{
          name:"**"+product.name+"**",
          price: product.price/2
        }
      });
      return saleProducts
    }
  },
  mutations:{ //DONT USE ANY ASYNCHRONUS TASK IN MUTATIONS
    reducePrice: (staate,payload) =>{  //use actions for that
        staate.products.forEach(product=>{
        product.price -= payload
      })
    }
  },
  actions:{ // THEY SIT BETWEEN COMPONENTS AND MUTATIONS
    //THAT is the happen after mutation but before
    //commiting change to COMPONENTS
    //hence asynchronous code is good here
    reducePrice: (context,payload) =>{
      setTimeout(function(){
        context.commit('reducePrice',payload)
      },4000)
    }
  }
})

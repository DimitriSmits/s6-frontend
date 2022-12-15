<template>
       <MenuLeft :model="items">
        <template #start>
            <a href = "/">
         
            </a>
        </template>
    </MenuLeft>    
</template>

<script>
import API_MATCH from '../services/matchService';

export default {
    data() {
      
		return {
            item:null,
            list: [],
            JSONresponse: {},
            items: [
                {
                    label: 'Matches',
                    icon: 'pi pi-heart',
                    to: '/loginpage'
                },
			]

		}
        
    },
          mounted(){
  
                API_MATCH.getmatches().get().then((response) =>{
                // filter de lijst
                if(response == null){
                    setTimeout(() => {
                        this.getpre();
                    }, 1000);
                    return;
                }

                response.forEach(obj => {
                let obje = {};
                obje["label"] = obj.gamer.username;
                obje["icon"] = 'pi pi-heart';
                obje["to"]= '/loginpage';
                this.items.push(obje)
                // this.items.push(this.item);
                });


                // });
            })
          

      },

}
</script>

<style>
.p-menu {
    height: 100vh;
    float: left;
}
</style>
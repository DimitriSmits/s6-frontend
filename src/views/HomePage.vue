<template>
<div>
  <NavbarTop>  </NavbarTop>
  <div class="holder">
    <NavbarLeft></NavbarLeft>
    <div class="content">   

      <div class="container" v-for="item in list" :key="item.id">
        <!-- v-for="item in JSONProfiles" :key="item.id" -->
        <img src="@/assets/profilepic.png" alt="Snow" style="width:100%;">
        <div class="bottom-left">{{item.gamer.username}}</div>




      </div>   
      <div class="containerchoice" >
        <div class="imagechoice" v-on:click="dislikeMatch">
          <i class="pi pi-times-circle" style="font-size: 5rem; color:black;cursor: pointer;"></i>
        </div>
        
        <div class="imagechoice" v-on:click="saveMatch" >
          <i class="pi pi-heart-fill" style="font-size: 5rem; color:red;cursor: pointer;"></i>
        </div>
      </div>

    </div>
  </div>
</div>
</template>

<script setup>
import NavbarTop from '@/components/NavbarTop.vue';
import NavbarLeft from '@/components/NavbarLeft.vue';


</script>

<script>
import API_MATCH from '../services/matchService';

export default {
    data() {
      
		return {
            list: [],
            JSONresponse: {},

		}
    },
          mounted(){
  
                API_MATCH.matches().getprefprofiles().then((response) =>{
                // filter de lijst
                if(response == null){
                    setTimeout(() => {
                        this.getpre();
                    }, 1000);
                    return;
                }
                this.list = response;
                          })
          

      },
    methods: {

        getprofiles() {

                API_MATCH.matches().getprefprofiles().then((response) =>{
                console.log(response);
                if(response == null){
                    setTimeout(() => {
                        this.fetchCheckboxes();
                    }, 1000);
                    return;
                }
                this.JSONresponse = response;
            });

        },
        saveMatch() {
                this.list.forEach((item) => {
                this.JSONresponse.profile2 = item.id
                })
                this.JSONresponse.profile1 =  "0";
                this.JSONresponse.love = true;
                API_MATCH.savematch()
                    .save(this.JSONresponse)
                    .catch((error) => {
                        console.error(error);
                        alert('Something went wrong');
                    });
        },
        dislikeMatch() {
                this.list.forEach((item) => {
                this.JSONresponse.profile2 = item.id
                })
                this.JSONresponse.profile1 =  "0";
                this.JSONresponse.love = false;
                API_MATCH.savematch()
                    .save(this.JSONresponse)
                    .catch((error) => {
                        console.error(error);
                        alert('Something went wrong');
                    });
        },
    },
  components: { NavbarTop,NavbarLeft},

}
</script>

<style scoped>
.input{
    margin-top:1%;
}
.holder{
    overflow: hidden;

}
#bio{
    width: 1000px;
}
.content{
 overflow: hidden;
 width: 800px;
 margin-left: auto;
 margin-right: auto;
 margin-top:1%;
}

.container {
  position: relative;
  width: 75%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  color: white;
}
.contrainerchoice {
    position: relative;
  width: 75%;
  margin-left: auto;
  margin-right: auto;
  color: white;
}

.imagechoice {
  display: inline-block;
  width: 50%;
  text-align: center;
  margin-top: 5%;

}

.bottom-left {
  position: absolute;
  bottom: 8px;
  left: 16px;
  font-size: 30px;
}
</style>




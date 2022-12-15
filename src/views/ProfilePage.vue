<template>
<div>
  <NavbarTop>  </NavbarTop>
  <div class="holder">
    <NavbarLeft></NavbarLeft>
    <div class="content">      
        <h2>Profilepicture</h2>
        <form v-on:submit.prevent="onProfileSave">
            <FileUpload name="demo[]" url="./upload" />
            <div class="input">
                <label for="bio">Bio</label>
                <span class="p-float-label">          
                <InputText id="bio" type="text"  v-model="JSONresponse.bio" />
                </span>
            </div>
            <div class="input">
                <label for="gender">M     /     F</label>
                <span class="p-float-label">          
                <SelectButton v-model="JSONresponse.preferance" :options="genders" optionLabel="gender" />
                </span>
            </div>
            <div class="input">
                <label for="preferance">M     /     F     /     B</label>
                <span class="p-float-label">          
                <SelectButton  v-model="JSONresponse.gender"  :options="preferances" optionLabel="preferance" />
                </span>
            </div>
            <div class="input">
                <ButtonVue  type="submit" label="Save"/><br>
            </div>
        </form>
    </div>
  </div>
</div>
</template>

<script setup>
import NavbarTop from '@/components/NavbarTop.vue';
import NavbarLeft from '@/components/NavbarLeft.vue';

</script>

<script>
import API_PROFILE from '../services/profileService';

export default {
    data() {
		return {
            gender : null,
            preferance : null,
            JSONresponse: {},
            selectedGender: null,
			genders: [
				'FEMALE',
				'MALE',
			],
			selectedPref: null,
			preferances: [
				'FEMALE',
				'MALE',
				'BOTH'
			],

		}
	},
    methods: {
        onProfileSave() {
                API_PROFILE.profiles()
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
</style>




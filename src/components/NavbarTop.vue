<template>
    <MenubarTop :model="items">
        <template #start>
            <a href = "/">
                <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="200" />
            </a>
        </template>
    </MenubarTop>    
</template>

<script>
export default {
    data(){
        return {
            items:[
                {
                    label: 'Account',
                    icon: 'pi pi-user',
                    to: '/profilepage'
                },
                {
                    label:'Sign out',
                    icon: 'pi pi-sign-out',
                    to: '/logout',
                }
            ],
                clickedItems: []
        }
    },
}
</script>

<style>
.p-menubar-start {
    margin-right: 24px;
    
}

.p-menubar-root-list, .p-menubar-button {
    margin-left: auto !important;
}
</style>
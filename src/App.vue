<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Calendar from "./components/Calendar.vue"
</script>

<template>
	<v-layout>
		<Calendar/>
        <v-footer>
        </v-footer>
    </v-layout>

  <RouterView />
</template>


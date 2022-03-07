<script>
	import { book, activeSection } from "./store.js"
	import { createEventDispatcher } from "svelte"
	
	const dispatch = createEventDispatcher()
	
	export let label = "Select Section"
	export let value = $activeSection
	
	const handleSectionSelection = (id) => {
		dispatch("selectSection", id)
	}
	
</script>

<div class="form-control">
	<select class="select select-primary w-full" bind:value={value} on:change={() => {handleSectionSelection(value)}}>
	  <option disabled>{label}</option>
	  {#each Object.keys($book.sections) as k}
		<option selected={value == $book.sections[k].id} value={$book.sections[k].id}>{$book.sections[k].id}</option>
	  {/each}
	</select>
</div>
<script>
	import { onMount } from "svelte"
	import Diagram from "./Diagram.svelte"
	import { diagramData, book, activeSection } from "./store.js"
	import {addSection, addChoice, setMetadata, newGamebook, gamebookToMermaid} from "./gamebook.js"
	
	let description = ""
	
		
	onMount(() => {
		updateUI()
	})
	
	const newSection = () => {
		let id = prompt("ID for the new section (keep it short)")
		book.set(addSection($book, id))	
		editSection(id)
	}
	
	const editSection = (id) => {
		$activeSection = id
		
		description = $book.sections[$activeSection].description
	}
	
	const saveSection = () => {
		$book.sections[$activeSection].description = description
	}
	
	const updateUI = () => {
		diagramData.set(gamebookToMermaid($book))
	}
</script>
<div class="p-5">
	<div class="flex">
		<div class="flex-1 p-2">
			<Diagram />
		</div>
		<div class="flex-1">
			<div class="flex items-center">
				<span class="flex-1">You're editing</span>
				<div class="form-control m-2">
					<select class="select select-primary w-full" bind:value={$activeSection} on:change={() => {editSection($activeSection)}}>
					  <option disabled>Select section to edit</option>
					  {#each Object.keys($book.sections) as k}
						<option selected={$activeSection == $book.sections[k].id} value={$book.sections[k].id}>{$book.sections[k].id}</option>
					  {/each}
					</select>
				</div>
				<button class="btn btn-ghost m-2" on:click={newSection}>New Section</button>
				<button class="btn btn-ghost m-2">Delete Section</button>
				
			</div>
			<div class="form-control">
  				<label class="label">
					<span class="label-text">Section description</span>
					<span class="label-text-alt">Remember that the Playdate is a small device.</span>
  				</label> 
  				<textarea class="textarea textarea-bordered textarea-primary h-24" placeholder="Your masterpiece here. No instadeath please." bind:value={description} on:change={saveSection}></textarea>
			</div>
			<div class="flex">
				<div class="form-control pr-2 flex-1">
					<label class="label">
						<span class="label-text">Choice Label</span>
					</label>
					<input type="text" class="input input-primary"/>
				</div>
				<div class="form-control pr-2 flex-1">
					<label class="label">
						<span class="label-text">Destination</span>
					</label>
					<select class="select select-primary w-full">
					  <option disabled selected>Pick your favorite Simpson</option>
					  <option>Homer</option>
					  <option>Marge</option>
					  <option>Bart</option>
					  <option>Lisa</option>
					  <option>Maggie</option>
					</select>
				</div>
			</div>
			<div class="flex">
				<div class="form-control pr-2 flex-1">
					<label class="label">
						<span class="label-text">Required tags</span>
					</label>
					<input type="text" class="input input-primary"/>
				</div>
				<div class="form-control pr-2 flex-1">
					<label class="label">
						<span class="label-text">Prohibited tags</span>
					</label>
					<input type="text" class="input input-primary"/>
				</div>
				<div class="form-control pr-2 flex-1">
					<label class="label">
						<span class="label-text">New tags</span>
					</label>
					<input type="text" class="input input-primary"/>
				</div>
			</div>
		</div>
	</div>
</div>
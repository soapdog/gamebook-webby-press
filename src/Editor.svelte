<script>
	import { onMount } from "svelte"
	import Diagram from "./Diagram.svelte"
	import SectionPicker from "./SectionPicker.svelte"
	import { diagramData, book, activeSection } from "./store.js"
	import {addSection, addChoice, setMetadata, newGamebook, gamebookToMermaid, persistBook} from "./gamebook.js"
	
	let description = ""
	
	let showDiagram = true
	let showEditor = true
	let diagramOrientation = "TB"
	
	let fLabel = ""
	let fDestination = ""
	let fTagsRequired = ""
	let fTagsProhibited = ""
	let fTagsAdded = ""
	
	let choices = []
	
	onMount(() => {
		updateUI()
	})
	
	const newSection = () => {
		let id = prompt("ID for the new section (keep it short, use only letters and dashes)")
		
		id = id.replace(/[^\u00BF-\u1FFF\u2C00-\uD7FF\w]+|[\_]+/ig, '-')
		
		if (id == "end") {
			id = `'end'` // mermaid can't handle sections named end.
		}
		
		book.set(addSection($book, id))	
		editSection(id)
	}
	
	const editSection = (id) => {
		console.dir($book.sections[$activeSection])
		
		$activeSection = id
		
		description = $book.sections[$activeSection].description
		
		choices = Object.keys($book.sections[$activeSection].choices).map(e => $book.sections[$activeSection].choices[e])
		updateUI()
	}
	
	const deleteSection = () => {
		let id = $activeSection
		let answer = confirm(`Are you sure you want to delete section: "${id}"? This cannot be undone.`)
		
		if (answer) {
			let sections = $book.sections
			delete sections[id]
			$book.sections = sections
			persistBook($book)
			let keys = Object.keys($book.sections)
			editSection(keys[0])
			updateUI()
		}
	}
	
	const deleteChoice = (label) => {
		let answer = confirm(`Are you sure you want to delete choice with label: "${label}"? This cannot be undone.`)
		
		if (answer) {
			let choices = $book.sections[$activeSection].choices
			delete choices[label]
			$book.sections[$activeSection].choices = choices
			persistBook($book)
			editSection($activeSection)
		}
	}
	
	
	const editChoice = (label) => {
		fLabel = label
		fDestination = $book.sections[$activeSection].choices[label].destination
		fTagsRequired = $book.sections[$activeSection].choices[label].tagsRequired.join(", ")
		fTagsProhibited = $book.sections[$activeSection].choices[label].tagsProhibited.join(", ")
		fTagsAdded = $book.sections[$activeSection].choices[label].tagsAdded.join(", ")
		
		updateUI()
	}
	
	const saveSection = () => {
		$book.sections[$activeSection].description = description
		persistBook($book)
	}
	
	const updateUI = () => {
		diagramData.set(gamebookToMermaid($book, $activeSection, diagramOrientation))
	}
	
	const handleClickSection = (evt) => {
		editSection(evt.detail)
	}
	
	const handleDestinationSelect = (evt) => {
		fDestination = evt.detail
	}
	
	const saveChoice = () => {
		if (fDestination == "") {
			alert("Please select a destination section.")
			return false
		}
		
		if (fLabel == "") {
			alert("Please add a label.")
			return false
		}
		
		let tagsRequired = fTagsRequired.length > 0 ? fTagsRequired.split(",").map(e => e.trim()) : []
		let tagsProhibited = fTagsProhibited.length > 0 ? fTagsProhibited.split(",").map(e => e.trim()) : []
		let tagsAdded = fTagsAdded.length > 0 ? fTagsAdded.split(",").map(e => e.trim()) : []
		
		$book = addChoice($book, $activeSection, fLabel, fDestination, tagsRequired, tagsProhibited, tagsAdded)
		persistBook($book)
		console.dir("book", $book)
		
		fLabel = ""
		fDestination = ""
		fTagsRequired = ""
		fTagsProhibited = ""
		fTagsAdded = ""
		
		editSection($activeSection)
	}
</script>
<div class="p-5">
	<div class="flex justify-center">
		  <div class="flex-1">
		  	<button class="btn float-left" class:btn-primary={showDiagram} on:click={() => {showDiagram = !showDiagram}}>Diagram</button>
 			<div class="btn-group pl-4" on:change={updateUI}>
   				<input type="radio" bind:group={diagramOrientation} value="TB" name="options" data-title="Vertical" class="btn"  checked={diagramOrientation == "TB"}>
   				<input type="radio" bind:group={diagramOrientation} value="LR" name="options" data-title="Horizontal" class="btn" checked={diagramOrientation == "LR"}>
 			</div>
		  </div>
		  <div class="flex-1">
		  <button class="btn float-right" class:btn-primary={showEditor} on:click={() => {showEditor = !showEditor}}>Editor</button>
		  </div>
	</div>
	<div class="flex">
		<div class="flex-1 p-2" class:hidden={!showDiagram}>
			<Diagram on:selectSection={handleClickSection} />
		</div>
		<div class="flex-1" class:hidden={!showEditor}>
			<div class="flex items-center">
				<span class="flex-1">You're editing</span>
				<SectionPicker bind:value={$activeSection} on:selectSection={handleClickSection} />
				<button class="btn btn-ghost m-2" on:click={newSection}>New Section</button>
				<button class="btn btn-ghost m-2" on:click={deleteSection}>Delete Section</button>
				
			</div>
			<div class="form-control">
  				<label class="label">
					<span class="label-text">Section description</span>
					<span class="label-text-alt">Remember that the Playdate is a small device.</span>
  				</label> 
  				<textarea class="textarea textarea-bordered textarea-primary h-24" placeholder="Your masterpiece here. No instadeath please." bind:value={description} on:change={saveSection}></textarea>
			</div>
			
			{#if choices.length > 0}
			<div class="divider"></div>
				<div class="overflow-x-auto">
			  	<table class="table w-full">
					<thead>
				  	<tr>
						<th>Destination</th>
						<th>Label</th>
						<th>Tags required</th>
						<th>Tags prohibited</th>
						<th>Tags added</th>
						<th>Controls</th>
				  	</tr>
					</thead>
					<tbody>
						{#each choices as choice}
						{@debug choice}
						<tr class:active={fLabel == choice.label}>
							<td>{choice.destination}</td>
							<td>{choice.label}</td>
							<td>{choice?.tagsRequired.join(", ")}</td>
							<td>{choice?.tagsProhibited.join(", ")}</td>
							<td>{choice?.tagsAdded.join(", ")}</td>
							<td>
								<button class="btn-sm btn-ghost m-2" on:click={()=>{editChoice(choice.label)}}>Edit</button>
								<button class="btn-sm btn-ghost m-2" on:click={()=>{deleteChoice(choice.label)}}>Delete</button>
							</td>
						</tr>
						{/each}
					</tbody>
			  	</table>
				</div>
			{:else}
			<p>No choices</p>
			{/if}
			
			
			<div class="divider"></div>
			
			
			<div class="flex">
				<div class="form-control pr-2 flex-1">
					<label class="label">
						<span class="label-text">Choice Label</span>
					</label>
					<input type="text" bind:value={fLabel} class="input input-primary"/>
				</div>
				<div class="form-control pr-2 flex-1">
					<label class="label">
						<span class="label-text">Destination</span>
					</label>
					<SectionPicker label="Select Destination" bind:value={fDestination} on:selectSection={handleDestinationSelect} />
				</div>
			</div>
			<div class="flex">
				<div class="form-control pr-2 flex-1">
					<label class="label">
						<span class="label-text">Required tags</span>
					</label>
					<input type="text" class="input input-primary" bind:value={fTagsRequired} />
				</div>
				<div class="form-control pr-2 flex-1">
					<label class="label">
						<span class="label-text">Prohibited tags</span>
					</label>
					<input type="text" class="input input-primary" bind:value={fTagsProhibited}/>
				</div>
				<div class="form-control pr-2 flex-1">
					<label class="label">
						<span class="label-text">New tags</span>
					</label>
					<input type="text" class="input input-primary" bind:value={fTagsAdded}/>
				</div>
			</div>
			<button class="btn btn-primary float-right m-2" on:click={saveChoice}>Save Choice</button>
		</div>
	</div>
</div>
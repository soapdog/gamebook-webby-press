<script>
	import Diagram from "./Diagram.svelte"
	import { diagramData } from "./store.js"
	import {addSection, addChoice, setMetadata, newGamebook, gamebookToMermaid} from "./gamebook.js"
	
	let book = newGamebook()
	
	book = addSection(book, "start", "This is the start")
	book = addChoice(book, "start", "Go there", "b")
	book = addChoice(book, "start", "Go there ?", "c")
	
	book = addSection(book, "b", "this is room b")
	book = addChoice(book, "b", "Go there", "c")
	
	console.dir(book)
	
	diagramData.set(gamebookToMermaid(book))
	
	const handleclick = () => {
		book = addChoice(book, "b", "whatever", "d")
		diagramData.set(gamebookToMermaid(book))
		
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
					<select class="select select-primary w-full">
					  <option disabled selected>Pick your favorite Simpson</option>
					  <option>Homer</option>
					  <option>Marge</option>
					  <option>Bart</option>
					  <option>Lisa</option>
					  <option>Maggie</option>
					</select>
				</div>
				<button class="btn btn-ghost m-2" on:click={handleclick}>New Section</button>
				<button class="btn btn-ghost m-2">Delete Section</button>
				
			</div>
			<div class="form-control">
  				<label class="label">
					<span class="label-text">Section text</span>
					<span class="label-text-alt">Remember that the Playdate is a small device.</span>
  				</label> 
  				<textarea class="textarea textarea-bordered textarea-primary h-24" placeholder="Your masterpiece here. No instadeath please."></textarea>
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
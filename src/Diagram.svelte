<script>
	import { onMount, createEventDispatcher } from "svelte"
	import mermaid from "mermaid"
	import { diagramData } from "./store.js"
	
	const dispatch = createEventDispatcher()
	
	// need to add this to the global object because
	// this is where mermaid looks for callbacks ¬¬
	window.editSection = (id) => {
		console.log("callback", id)
		dispatch("clickSection", id)
	}
	


	onMount(()=>{
		let config = {
			startOnLoad:false,
			flowchart:{
				useMaxWidth:true,
				htmlLabels:true,
				curve:"cardinal",
			},
			securityLevel:"loose",
		}
 	
		console.log("initial diagram data:", $diagramData)	
		mermaid.initialize(config)
		
		diagramData.subscribe((data) => {
			console.log("data updated", data)
			
			if (data === "") { 
				console.log("passed no data to mermaid diagram.")
				return false
			}
			
			let output = document.getElementById("chart") 
			
			let insert = function (code, binder) {
				output.innerHTML = code
				binder(output)	
		  	}
		  	mermaid.render("preparedScheme", data, insert, output)
		})
	})

	
</script>

<div class="mermaid" id="chart">
	{$diagramData}
</div>
		
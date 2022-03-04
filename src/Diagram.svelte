<script>
	import {onMount} from "svelte"
	import mermaid from "mermaid"
	import { diagramData } from "./store.js"
	


	onMount(()=>{
		console.log("go!")
		let config = {
			startOnLoad:false,
			flowchart:{
				useMaxWidth:true,
				htmlLabels:true,
				curve:'cardinal',
			},
			securityLevel:'loose',
		}
 	
		console.log("initial diagram data:", $diagramData)	
		mermaid.initialize(config)
		
		diagramData.subscribe((data) => {
			console.log("data updated")
			let output = document.getElementById("chart") 
			let insert = function (code) {
				output.innerHTML = code;
		  	}
		  	mermaid.render("preparedScheme", data, insert)
		})
	})

	
</script>

<div class="mermaid" id="chart">
	{$diagramData}
</div>
		
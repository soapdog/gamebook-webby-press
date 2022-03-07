<script>
import { book } from "./store.js"

const save = () => {
	let data = JSON.stringify($book)
	let blob = new Blob([data], { type: "text/json;charset=utf-8" })
	
	let link = URL.createObjectURL(blob)
	let a = document.createElement("a")
	a.download = $book.metadata.title + ".json"
	a.href = link
	a.click()
}
</script>

<div class="p-4">
<article class="prose">
<h2>Save & Load</h2>
<p>
	Use the buttons below to save or load your current gamebook to disk. Remember that <i>Gamebook.Webby.Press</i> always save your gamebook to your browser storage as well.
</p>
<p>
	You are currently editing <b>{$book.metadata.title}</b> gamebook.
</p>
<button class="btn btn-primary" on:click={save}>Save To Disk</button>
<br><br>
<button class="btn btn-primary" on:click={save}>Load From Disk</button>
</article>
</div>
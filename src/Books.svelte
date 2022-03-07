<script>
import { book, go } from "./store.js"

let books = []

for (let i = 0; i <= localStorage.length; i++) {
	let k = localStorage.key(i)
	let item = localStorage.getItem(k)
	try {
		let d = JSON.parse(item)
		
		if (d?.metadata?.title) {
			books.push(d)
		}
	} catch(e) {
	}
}

const load = (key) => {
	let data = localStorage.getItem(key)
	let b = JSON.parse(data)
	$book = b
	go("editor")
}
</script>

<div class="p-4">
<article class="prose">
<h2>Books</h2>
<p>
	<i>Gamebook.Webby.Press</i> always save your gamebooks to your browser local storage. Click on a book below to load them.
</p>
<ul>
	{#each books as book}
	<li>
		<button class="btn btn-ghost" on:click={() => {load(book.metadata.title)}}>{book.metadata.title}</button>
	</li>
	{/each}
</ul>

</article>
</div>
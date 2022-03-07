<script>
import { go, route } from "./store.js"
</script>

 

<li class:bordered={$route.to == "books"}><a href="?view=books" on:click|preventDefault={() => {go("books")}}>Books</a></li>
<li class:bordered={$route.to == "settings"}><a href="?view=settings" on:click|preventDefault={() => {go()}}>Settings</a></li>
<li class:bordered={$route.to == "editor"}><a href="?view=editor" on:click|preventDefault={() => {go("editor")}}>Sections</a></li>
<li class:bordered={$route.to == "saveload"}><a href="?view=saveload" on:click|preventDefault={() => {go("saveload")}}>Save/Load</a></li>
<li class:bordered={$route.to == "export"}><a href="?view=export" on:click|preventDefault={() => {go()}}>Export</a></li>
<li class:bordered={$route.to == "help"}><a href="?view=help" on:click|preventDefault={() => {go()}}>Help</a></li>
<li class:bordered={$route.to == "about"}><a href="?view=about" on:click|preventDefault={() => {go("about")}}>About</a></li>
<li class:bordered={$route.to == "sourcecode"}><a href="?view=sourcecode" on:click|preventDefault={() => {go()}}>Source-Code</a></li>


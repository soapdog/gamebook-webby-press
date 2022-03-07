<script>
  import { route, go, book } from "./store.js"
  import Menu from "./Menu.svelte"
  import Footer from "./Footer.svelte"
  
  // Views
  import Editor from "./Editor.svelte"
  import About from "./About.svelte"
  import SaveAndLoad from "./SaveAndLoad.svelte"
  import Books from "./Books.svelte"
  
  let urlParams = location.search
  let params = new URLSearchParams(urlParams)
  
  if (params.get("view")) {
    go(params.get("view"))
  }
  
  if (localStorage.getItem("current book")) {
    let key = localStorage.getItem("current book")
    let data = localStorage.getItem(key)
    let b = JSON.parse(data)
    $book = b
    go("editor")
  }
  
  const views = {
    about: About,
    editor: Editor,
    saveload: SaveAndLoad,
    books: Books
  }
</script>

<main>
  <div class="drawer h-screen w-full">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle"> 
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <div class="w-full navbar bg-base-300">
        <div class="flex-none lg:hidden">
          <label for="my-drawer-3" class="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </label>
        </div> 
        <div class="flex-1 px-2 mx-2 font-semibold">Gamebook.Webby.Press</div>
        <div class="flex-none hidden lg:block">
          <ul class="menu menu-horizontal">
            <!-- Navbar menu content here -->
            <Menu />
          </ul>
        </div>
      </div>
      <!-- Page content here -->
      <div class="flex flex-col">
       <svelte:component this={views[$route.to]} data={$route.data}/> 
       <Footer />  
      </div>
      
    </div> 
    <div class="drawer-side">
      <label for="my-drawer-3" class="drawer-overlay"></label> 
      <ul class="menu p-4 overflow-y-auto w-80 bg-base-100">
        <!-- Sidebar content here -->
        <Menu />
      </ul>
    </div>
  </div>
</main>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>

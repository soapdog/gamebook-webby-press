export function addChoice(
    book,
	section,
    label,
    destination,
    tagsRequired,
    tagsProhibited,
    tagsAdded
) {
    let choice = {
        label,
        destination,
        tagsRequired,
        tagsProhibited,
        tagsAdded,
    }
    book.sections[section].choices = book.sections[section].choices || {}
    book.sections[section].choices[label] = choice
    return book
}

export function addSection(book, id, description = "", choices = {}) {
    let section = {
        id,
        description,
        choices,
    }

    book.sections = book.sections || {}
    book.sections[id] = section
	return book
}

export function setMetadata(book, config) {
    book.metadata = book.metadata || {}

    for (const key in config) {
        book.metadata[key] = config[key]
    }

    return book
}

export function newGamebook(metadata = {title: "Unnamed Adventure"}, sections = {}) {
    return {
        metadata,
        sections,
    }
}

export function gamebookToMermaid(book, activeSection) {
	let data = `flowchart TB\n\n`
	
	for (const s in book.sections) {
		let section = book.sections[s]
        
        data += `${section.id}\n`
        data += `click ${section.id} call editSection() "Edit Section"\n`
        
        if (section.id == activeSection) {
            data += `style ${section.id} stroke:#333,stroke-width:4px\n`
        }
		
		for (const c in section.choices) {
			let choice = section.choices[c]
			data += `${section.id} --${choice.label}--> ${choice.destination}\n`
		}
	}
    console.dir("book", book)
	console.log("diagram", data)
	return data
}

export function persistBook(book) {
    if (book.metadata.title === "") {
        book.metadata.title = "Unnamed Adventure"
    }
    
    localStorage.setItem(book.metadata.title, JSON.stringify(book))
    localStorage.setItem("current book", book.metadata.title)
}

export function loadLastBook() {
    if (localStorage.getItem("current book")) {
        let key = localStorage.getItem("current book")
        return JSON.parse(localStorage.getItem(key))
    }
}
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

export function addSection(book, id, description, choices = {}) {
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

export function newGamebook(metadata = {}, sections = {}) {
    return {
        metadata,
        sections,
    }
}

export function gamebookToMermaid(book) {
	let data = `flowchart TB\n\n`
	
	for (const s in book.sections) {
		let section = book.sections[s]
		
		for (const c in section.choices) {
			let choice = section.choices[c]
			data += `${section.id} --${choice.label}--> ${choice.destination}\n`
		}
	}
	
	return data
}
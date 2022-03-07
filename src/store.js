import { writable } from "svelte/store"
import { newGamebook } from "./gamebook.js"

export const diagramData = writable("")

export const book = writable(newGamebook())

export const activeSection = writable("")

export const route = writable({to: "about", data: {}})

export const go = (view, data = {}) => {
	route.set({to: view, data})
}
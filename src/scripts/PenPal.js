import { Requests } from "./Requests.js"
import { LetterForm } from "./LetterForm.js"


export const PenPal = () => {
    return `
        <h1>Pen Pal Society</h1>
        <section class="letterForm">
            ${LetterForm()}
        </section>

        <section class="letters">
            <h2>Letters</h2>
            ${Requests()}
        </section>
    `
}
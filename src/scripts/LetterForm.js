import { sendRequest, getRequests, sendTopicObject, getTopicObjects, getRecipients, getAuthors, getTopics } from "./dataAccess.js";

const formState = {
    authorId: 0,
    authorName: "",
    authorEmail: "",
    recipientId: 0,
    recipientName: "",
    recipientEmail: "",
    topics: []
}



export const LetterForm = () => {
    const authors = getAuthors();
    const recipients = getRecipients();
    const topics = getTopics();

    let html = `
    <label class="label" for="letterAuthor">Author</label>
    <div class="field">
        <select name="letterAuthor" id="authors">
            <option value="">Choose Author</option>
            ${authors.map(
                author => {
                    return `<option value="${author.id}--${author.name}--${author.email}" id="author__option">${author.name}</option>`
                }
            ).join("")}
        </select>
    </div>

    <label class="label" for="letterBody">Letter</label>
    <div class ="field">
        <input type="text" name="letterBody" />
    </div>

    <label class="label" for="topics">Topics</label>
    <div class="field" id="topic_field">
            ${topics.map(
                topic => {
                    return `
                    <div>
                        <input type="checkbox" class="topics" value="${topic.id}" name="${topic.name}">
                        <label for="${topic.name}">${topic.name}</label>
                    </div>`
                }
            ).join("")}
    </div>
    <div class="field">
        <label class="label" for="letterRecipient">Recipient</label>
        <select name="letterRecipient" id="recipients">
            <option value="">Choose Recipient</option>
            ${recipients.map(
                recipient => {
                    return `<option value="${recipient.id}--${recipient.name}--${recipient.email}" id="recipient__option">${recipient.name}</option>`
                }
            ).join("")}
        </select>

    <button class="button" id="submitRequest">Submit Request</button>`
    return html;
}

const mainContainer = document.querySelector("#container")
export let topicStr = ""

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitRequest") {
        // Get what the user typed into the form fields
        const letterAuthor = formState.authorName
        const letterAuthorEmail = formState.authorEmail
        const letterBody = document.querySelector("input[name='letterBody']").value
        const letterRecipient = formState.recipientName
        const letterRecipientEmail = formState.recipientEmail

        const requestObj = {
            author: letterAuthor,
            letter: letterBody,
            authorEmail: letterAuthorEmail,
            recipient: letterRecipient,
            recipientEmail: letterRecipientEmail,
            date: Date()
        }

        const topics = getTopics()

        sendRequest(requestObj)
            .then((dataObj) => {
                let topicsArray = formState.topics;
        
                for(const topicArr of topicsArray) {
                    let topicObj = {
                        requestId: dataObj.id,
                        topicId: topicArr
                    }
                    sendTopicObject(topicObj)

                }
                
                formState.topics = []
            })

    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "authors") {
            const [authorId, authorName, authorEmail] = event.target.value.split("--");
            formState.authorId = authorId;
            formState.authorName = authorName;
            formState.authorEmail = authorEmail
        }
    }
)


mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "recipients") {
            const [recipientId, recipientName, recipientEmail] = event.target.value.split("--");
            formState.recipientId = recipientId;
            formState.recipientName = recipientName;
            formState.recipientEmail = recipientEmail;
        }
    }
)

mainContainer.addEventListener(
    "change",
    (event) => {
        if(event.target.className === "topics" && event.target.checked === true) {
            formState.topics.push(event.target.value);
        }
    }
)
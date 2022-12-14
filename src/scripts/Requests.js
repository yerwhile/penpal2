import { getRequests, getTopicObjects, getTopics } from "./dataAccess.js"
import { topicStr } from "./LetterForm.js"



export const Requests = () => {
    const requests = getRequests()
    const topicObjects = getTopicObjects()
    const topics = getTopics();

    const requestToList = (requestObj) => {
        let topicArr = []
        for(const topicObject of topicObjects) {
            if(topicObject.requestId === requestObj.id) {
                for(const topic of topics) {
                    if(topic.id === parseInt(topicObject.topicId)) {
                        topicArr.push(topic.name)
                    }
                }
            }
        }
        return `
        <div class="letter__results">
            <p>Dear ${requestObj.author} ${requestObj.authorEmail}</p>
            <p>${requestObj.letter}</p>
            <p>Sincerely, ${requestObj.recipient} ${requestObj.recipientEmail}</p>
            <p>Sent on ${requestObj.date}</p>
            <p class="topic_badge">Topics: ${topicArr.join(" ")}</p>
        </div>
        <hr>`
    }
    let html = `
        <ul>
            ${
                requests.map(requestToList).join("")
            }
        </ul>
    `

    return html
}
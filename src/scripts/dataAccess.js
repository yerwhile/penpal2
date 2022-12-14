import { mainContainer } from './main.js';

const applicationState = {
    requests: [],
    authors: [],
    recipients: [],
    topics: [],
    topicObjects: []
}

const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (letterRequests) => {
                applicationState.requests = letterRequests
            }
        )
}

export const fetchAuthors = () => {
    return fetch(`${API}/authors`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.authors = data
            }
        )
}

export const fetchRecipients = () => {
    return fetch(`${API}/recipients`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.recipients = data
            }
        )
}

export const fetchTopics = () => {
    return fetch(`${API}/topics`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.topics = data
            }
        )
}

export const fetchTopicObjects = () => {
    return fetch(`${API}/topicObjects`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.topicObjects = data
            }
        )
}


export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
}

export const getAuthors = () => {
    return applicationState.authors.map(author => ({...author}))
}

export const getRecipients = () => {
    return applicationState.recipients.map(recipient => ({...recipient}))
}

export const getTopics = () => {
    return applicationState.topics.map(topic => ({...topic}))
}

export const getTopicObjects = () => {
    return applicationState.topicObjects.map(topicObject => ({...topicObject}))
}

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        // .then(() => {
        //     mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        // })
}


export const sendTopicObject = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/topicObjects`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}
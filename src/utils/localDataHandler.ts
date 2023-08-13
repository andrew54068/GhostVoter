import { Topic, Vote } from "components/VoteTable/Vote/TopicBox"


// export interface TopicVoteSum {
//     topic: string;
//     option: number;
//     voteCount: number;
// }

export const DATAS = [
    {
        id: "74f4bd0b-d04d-419e-a8a6-d0e1f31cfc1d",
        title: "Who should be the next presiden?",
        options: [
            { title: "Vitalik", amount: 2 },
            { title: "Justin Sun", amount: 3 },
            { title: "CZ", amount: 1 },
        ],
    },
    {
        id: "b30a5f14-4a20-4f39-bcbe-675f0d362283",
        title: "What's your favorite number",
        options: [
            { title: "69", amount: 6 },
            { title: "99", amount: 3 },
            { title: "77", amount: 1 },
        ],
    }
];


export interface OptionInfo {
    title: string;
    amount: number;
}

export interface TopicVotes {
    id: string;
    title: string;
    options: OptionInfo[];
    voterIds: string[];
}

export const localDataHandler = () => {

    const TOPIC_KEY = "topics"

    const initial = () => {
        let existingTopics = sessionStorage.getItem(TOPIC_KEY)
        if (!existingTopics || existingTopics === '') {
            let dataString = JSON.stringify(DATAS)
            sessionStorage.setItem(TOPIC_KEY, dataString)
        }
    }

    const canVote = (topicId: string, userId: string) => {
        let existingTopics = sessionStorage.getItem(TOPIC_KEY)
        if (existingTopics) {
            var resultTopics: TopicVotes[] = JSON.parse(existingTopics)
            var topic = resultTopics.find(value => value.id === topicId)
            if (!topic) return false
            if (topic.voterIds.includes(userId)) return false
            return true
        }
        return false
    }

    const getTopics = (): TopicVotes[] => {
        initial()
        let existingTopics = sessionStorage.getItem(TOPIC_KEY)
        if (existingTopics) {
            const resultTopics: TopicVotes[] = JSON.parse(existingTopics)
            return resultTopics
        }
        return []
    }

    const addNewTopic = (newTopic: Topic) => {
        let existingTopics = sessionStorage.getItem(TOPIC_KEY)
        var resultString = ''
        if (existingTopics) {
            var resultTopics: TopicVotes[] = JSON.parse(existingTopics)
            const optionInfos: OptionInfo[] = newTopic.options.map(optionTitle => {
                return {
                    title: optionTitle,
                    amount: 0,
                    userIds: [],
                }
            })
            resultTopics.push({
                id: newTopic.id,
                title: newTopic.title,
                options: optionInfos,
                voterIds: []
            })
            resultString = JSON.stringify(resultTopics)
        } else {
            resultString = JSON.stringify([newTopic])
        }
        sessionStorage.setItem(TOPIC_KEY, resultString)
    }

    const getOptionsAmountByTopic = (topicId: string): OptionInfo[] => {
        let existingTopics = sessionStorage.getItem(TOPIC_KEY)
        if (existingTopics) {
            var resultTopics: TopicVotes[] = JSON.parse(existingTopics)
            const topic = resultTopics.find(value => value.id === topicId)
            return topic?.options ?? []
        }
        return []
    }

    const addNewVote = (newVote: Vote) => {
        let existingTopics = sessionStorage.getItem(TOPIC_KEY)
        if (existingTopics) {
            var resultTopics: TopicVotes[] = JSON.parse(existingTopics)
            var topic = resultTopics.find(value => value.id === newVote.topicId)
            if (!topic) return
            var newOptions = topic.options
            var option = newOptions.find(option => option.title === newVote.optionTitle)
            if (!option) return
            if (!canVote(topic.id, newVote.userId)) return
            option.amount = option.amount + 1
            resultTopics.push({
                id: newVote.topicId,
                title: topic.title,
                options: newOptions,
                voterIds: topic.voterIds.concat([newVote.userId])
            })
            const resultString = JSON.stringify(resultTopics)
            sessionStorage.setItem(TOPIC_KEY, resultString)
        }
    }

    return {
        canVote,
        getTopics,
        addNewTopic,
        getOptionsAmountByTopic,
        addNewVote
    }
}
const loggedBlogAppUserKey = 'loggedBlogAppUser'

export const getUser = () => {
    const loggedUserJSON = window.localStorage.getItem(loggedBlogAppUserKey)

    return loggedUserJSON
        ? JSON.parse(loggedUserJSON)
        : null
}

export const saveUser = (user) => {
    window.localStorage.setItem(loggedBlogAppUserKey, JSON.stringify(user))
}

export const removeUser = () => {
    window.localStorage.removeItem(loggedBlogAppUserKey)
}
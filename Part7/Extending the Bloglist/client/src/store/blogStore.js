import { create } from "zustand";
import blogService from "../services/blogs"

const useBlogStore = create(set => ({
    blogs: [],
    actions: {
        fetchBlogs: async () => {
            const blogsToSet = await blogService.getAll()
            set(state => ({
                blogs: blogsToSet
            }))
        },
        createBlog: async (blogObject) => {
            const blogToAdd = await blogService.create(blogObject)
            set(state => ({
                blogs: state.blogs.concat({
                    ...blogToAdd,
                })
            }))
        },
        updateBlog: async (blogObject) => {
            const blogToUpdate = await blogService.updatedLikes(blogObject)
            set(state => ({
                blogs: state.blogs.map(blog => blog.id === blogToUpdate.id ? blogToUpdate : blog)
            }))
        },
        deleteBlog: async (idToDelete) => {
            await blogService.deleteBlog(idToDelete)
            set(state => ({
                blogs: state.blogs.filter(blog => blog.id !== idToDelete)
            }))
        },
        addComment: async (blogId, comment) => {
            const updatedBlog = await blogService.addComment(blogId, comment)
            set(state => ({
                blogs: state.blogs.map(blog =>
                    blog.id === updatedBlog.id ? updatedBlog : blog
                )
            }))
            return updatedBlog
        }
    }
}))

export default useBlogStore
export const useBlogs = () => useBlogStore(state => state.blogs)
export const useBlogActions = () => useBlogStore(state => state.actions)

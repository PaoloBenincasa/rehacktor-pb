export function getAvatarUrl(file) {
  
        if (!file) {
            return 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
        }
        return `https://zpgxlohindvjcpvsazrk.supabase.co/storage/v1/object/sign/avatars/${file}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzLzAuODgzMDYxODE2MDk2MjQ5OC5qcGciLCJpYXQiOjE3MzQ2MTY1ODksImV4cCI6MTc2NjE1MjU4OX0.ykJhLb-4zX6ZBk8sKj03cnNMnqCgw0oTBhts1SHIY1U&t=2024-12-19T13%3A56%3A31.114Z`
    }
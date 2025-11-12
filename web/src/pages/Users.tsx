"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { UserPlus } from "lucide-react"
import { mockUsers, type User } from "../../mock/mockData"
import { UserCard } from "../components/Users/UserCard"
import { UserDialog } from "../components/Users/UserDialog"

export default function Users() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    role: "customer" as "admin" | "customer",
    is_active: true,
  })

  const handleOpenAdd = () => {
    setEditingUser(null)
    setFormData({
      full_name: "",
      email: "",
      phone_number: "",
      role: "customer",
      is_active: true,
    })
    setOpenDialog(true)
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setFormData({
      full_name: user.full_name,
      email: user.email,
      phone_number: user.phone_number,
      role: user.role,
      is_active: user.is_active,
    })
    setOpenDialog(true)
  }

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.user_id !== id))
  }

  const handleSave = () => {
    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.user_id === editingUser.user_id
            ? { ...u, ...formData, updated_at: new Date().toISOString() }
            : u
        )
      )
    } else {
      const newUser: User = {
        user_id: Date.now(),
        ...formData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      setUsers((prev) => [...prev, newUser])
    }

    setOpenDialog(false)
    setEditingUser(null)
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">👥 Quản lý người dùng</h2>
        <Button onClick={handleOpenAdd} className="flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          Thêm người dùng
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard key={user.user_id} user={user} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>

      <UserDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
        editingUser={editingUser}
      />
    </div>
  )
}

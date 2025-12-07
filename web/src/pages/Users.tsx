"use client"

import { useEffect, useState } from "react"
import { Button } from "../components/ui/button"
import { UserPlus } from "lucide-react"
import { UserCard } from "../components/Users/UserCard"
import { UserDialog } from "../components/Users/UserDialog"
import { adminGetUsers, adminCreateUser, adminUpdateUser, adminDeleteUser } from "../lib/api"

export default function Users() {
  const [users, setUsers] = useState<any[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [editingUser, setEditingUser] = useState<any | null>(null)

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    role: "customer" as "admin" | "customer",
    is_active: true,
  })

  /* ============================
        LOAD USERS (GLOBAL)
  ============================ */
  const loadUsers = async () => {
    try {
      const res = await adminGetUsers()     // Response
      const data = await res.json()         // JSON
      setUsers(data.users)
    } catch (err: any) {
      console.error("Load users failed:", err.message)
    }
  }

  /* ============================
        RUN ON PAGE LOAD
  ============================ */
  useEffect(() => {
    loadUsers()
  }, [])

  /* ============================
        OPEN ADD USER
  ============================ */
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

  /* ============================
        OPEN EDIT USER
  ============================ */
  const handleEdit = (user: any) => {
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

  /* ============================
          DELETE USER
  ============================ */
  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa người dùng này?")) return

    try {
      await adminDeleteUser(id)
      setUsers((prev) => prev.filter((u) => u.user_id !== id))
    } catch (err: any) {
      alert(err.message)
    }
  }

  /* ============================
        SAVE NEW / UPDATE USER
  ============================ */
  const handleSave = async () => {
    try {
      if (editingUser) {
        const res = await adminUpdateUser(editingUser.user_id, formData)
        const data = await res.json()

        setUsers((prev) =>
          prev.map((u) =>
            u.user_id === editingUser.user_id ? data.user : u
          )
        )
      } else {
        const res = await adminCreateUser(formData)
        const data = await res.json()

        setUsers((prev) => [...prev, data.user])
      }

      setOpenDialog(false)
      setEditingUser(null)
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">👥 Quản lý người dùng</h2>

        <Button onClick={handleOpenAdd} className="flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          Thêm người dùng
        </Button>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard
            key={user.user_id}
            user={user}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* DIALOG */}
      <UserDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        formData={formData}
        setFormData={setFormData}
        onSuccess={loadUsers}   // ✔ Sử dụng được vì loadUsers giờ ở global
        editingUser={editingUser}
      />
    </div>
  )
}

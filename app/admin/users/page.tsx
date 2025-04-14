"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { users as initialUsers } from "@/lib/data"
import { Hotel, Search, UserPlus, Pencil, Trash2 } from "lucide-react"

export default function AdminUsersPage() {
  const [users, setUsers] = useState(initialUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)

  const filteredUsers = users.filter((user) => {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return (
      user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query) || user.phone.includes(query)
    )
  })

  const handleAddUser = () => {
    setCurrentUser({
      id: String(users.length + 1),
      name: "",
      email: "",
      phone: "",
      isAdmin: false,
    })
    setIsEditing(true)
  }

  const handleEditUser = (user: any) => {
    setCurrentUser(user)
    setIsEditing(true)
  }

  const handleSaveUser = () => {
    if (users.some((user) => user.id === currentUser.id)) {
      // Update existing user
      setUsers(users.map((user) => (user.id === currentUser.id ? currentUser : user)))
    } else {
      // Add new user
      setUsers([...users, currentUser])
    }
    setIsEditing(false)
    setCurrentUser(null)
  }

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  return (
    <div className="min-h-screen bg-emerald-50">
      <MainNav isAdmin={true} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-700">Manage Users</h1>
          <Button onClick={handleAddUser} className="bg-emerald-500 hover:bg-green-600">
            <UserPlus className="h-4 w-4 mr-2" />
            Add New User
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search users by name, email, or phone..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User List</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredUsers.length > 0 ? (
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-2 border-b bg-muted/50 p-4 font-medium">
                  <div className="col-span-1">ID</div>
                  <div className="col-span-3">Name</div>
                  <div className="col-span-3">Email</div>
                  <div className="col-span-2">Phone</div>
                  <div className="col-span-1">Admin</div>
                  <div className="col-span-2">Actions</div>
                </div>

                {filteredUsers.map((user) => (
                  <div key={user.id} className="grid grid-cols-12 gap-2 border-b p-4 items-center">
                    <div className="col-span-1 font-mono text-sm">{user.id}</div>
                    <div className="col-span-3">{user.name}</div>
                    <div className="col-span-3 text-sm">{user.email}</div>
                    <div className="col-span-2 text-sm">{user.phone}</div>
                    <div className="col-span-1">
                      <Switch
                        checked={user.isAdmin}
                        onCheckedChange={(checked) => {
                          setUsers(users.map((u) => (u.id === user.id ? { ...u, isAdmin: checked } : u)))
                        }}
                      />
                    </div>
                    <div className="col-span-2 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-green-200 text-green-600 hover:bg-emerald-50"
                        onClick={() => handleEditUser(user)}
                      >
                        <Pencil className="h-3.5 w-3.5 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-lg font-medium text-gray-700 mb-2">No users found</h3>
                <p className="text-gray-500">Try adjusting your search criteria</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Dialog open={isEditing} onOpenChange={(open) => !open && setIsEditing(false)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{currentUser?.id ? `Edit ${currentUser.name}` : "Add New User"}</DialogTitle>
              <DialogDescription>Make changes to user details here. Click save when you're done.</DialogDescription>
            </DialogHeader>

            {currentUser && (
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={currentUser.name}
                    onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={currentUser.email}
                    onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={currentUser.phone}
                    onChange={(e) => setCurrentUser({ ...currentUser, phone: e.target.value })}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="admin"
                    checked={currentUser.isAdmin}
                    onCheckedChange={(checked) => setCurrentUser({ ...currentUser, isAdmin: checked })}
                  />
                  <Label htmlFor="admin">Admin User</Label>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveUser} className="bg-emerald-500 hover:bg-green-600">
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>

      <footer className="bg-[#00836C] text-white py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Hotel className="h-5 w-5" />
              <span className="text-lg font-bold">Sunset Paradise</span>
            </div>
            <div className="text-sm">&copy; {new Date().getFullYear()} Sunset Paradise. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

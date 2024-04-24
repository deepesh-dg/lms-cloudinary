"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/auth";
import Link from "next/link";

export default function Page() {
  const { register } = useAuth();

  const [loader, setLoader] = useState(false);
  const [data, setData] = React.useState({
    name: "",
    email: "",
    role: "student",
    password: "",
  });

  const submit = async (e) => {
    setLoader(() => true);
    e.preventDefault();

    const { success, msg } = await register(data);

    if (!success) window.alert(msg);

    setLoader(() => false);
  };

  return (
    <Card className="w-[350px] mx-auto">
      <form onSubmit={submit}>
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>Sign up in just one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Full name"
                type="text"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={data.email}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Email ID"
                type="email"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="role">Role</Label>
              <Select
                value={data.role}
                onValueChange={(value) =>
                  setData((prev) => ({ ...prev, role: value }))
                }
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                value={data.password}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, password: e.target.value }))
                }
                placeholder="password"
                type="password"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-y-4">
          <Button type="submit" className="w-full" disabled={loader}>
            Sign up
          </Button>
          <p>
            Already have an account?{" "}
            <Link href="/login" className="hover:underline font-bold">
              Login
            </Link>{" "}
            now.
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}

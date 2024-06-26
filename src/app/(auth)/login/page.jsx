"use client";

import * as React from "react";
import { toast } from "@/components/ui/use-toast";
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
import { useAuth } from "@/contexts/auth";
import Link from "next/link";

export default function Page() {
  const { login } = useAuth();

  const [loader, setLoader] = React.useState(false);
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const submit = async (e) => {
    setLoader(() => true);
    e.preventDefault();

    const { success, message } = await login(data.email, data.password);

    if (!success)
      toast({
        variant: "destructive",
        title: "Login failed",
        description: message,
      });

    setLoader(() => false);
  };

  return (
    <Card className="w-[350px] mx-auto">
      <form onSubmit={submit}>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login in just one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
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
            Login
          </Button>
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="hover:underline font-bold">
              Sign up
            </Link>{" "}
            now.
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}

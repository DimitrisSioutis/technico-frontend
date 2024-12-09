"use client"

import { useFormState } from "react-dom"
import { login } from "@/actions/userController"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";


export default function Page() {
  const [formState, formAction] = useFormState(login, { success: false, message: "" });

  return (
    <div className="h-[88svh] flex items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="py-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                className="py-2"
              />
            </div>
            <div className="py-2">
              <Input
                id="password"
                name="password"
                type="password"
                className="py-2"
              />
            </div>

            <span>{formState.message}</span>

            <CardFooter className="mt-8">
            <Button type="submit"  className="w-full">
              Login
            </Button>
            </CardFooter>
          </form>

          <div className="mt-4 text-center">
            <p>
              Don&apos;t have an account?
              <Link href="/signup" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

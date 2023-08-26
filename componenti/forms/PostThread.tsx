"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/componenti/ui/form";
import { Button } from "@/componenti/ui/button";
import { Textarea } from "@/componenti/ui/textarea";

import { ThreadValidation } from "@/lib/validation/thread";
import { updateUser } from "@/lib/actions/user.actions";
import { createThread } from "@/lib/actions/thread.actions";
import Thread from "@/lib/models/thread.models";

export default function PostThread({ userId }: { userId: string }) {
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
            thread: "",
            accountId: userId,
        },
    });

    const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
        await createThread({
            text: values.thread,
            author: userId,
            communityId: null,
            path: pathname,
        });

        router.push("/");
    };

    return (
        <>
            <div>PostThread</div>;
            <Form {...form}>
                <form
                    className="flex flex-col justify-start gap-10"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name="thread"
                        render={({ field }) => (
                            <FormItem className="flex w-full flex-col gap-3">
                                <FormLabel className="text-base-semibold text-light-2">
                                    Name
                                </FormLabel>
                                <FormControl className="no-focus border border-dark-4 bg-dark-3">
                                    <Textarea
                                        rows={15}
                                        className="account-form_input no-focus"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="bg-primary-500">
                        Invia Thread
                    </Button>
                </form>
            </Form>
        </>
    );
}

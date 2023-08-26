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
import { Input } from "@/componenti/ui/input";

import { CommentValidation } from "@/lib/validation/thread";
// import { updateUser } from "@/lib/actions/user.actions";
// import { addComment } from "@/lib/actions/thread.actions";
import Thread from "@/lib/models/thread.models";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";

interface Props {
    threadId: string;
    currentUserImg: string;
    currentUserId: string;
}

export default function Comment({
    threadId,
    currentUserImg,
    currentUserId,
}: Props) {
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            thread: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
        await addCommentToThread(
            threadId,
            values.thread,
            JSON.parse(currentUserId),
            pathname
        );

        form.reset();
    };

    return (
        <div className="mt-1">
            <h1 className="text-white">Comment</h1>
            <Form {...form}>
                <form
                    className="comment-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name="thread"
                        render={({ field }) => (
                            <FormItem className="flex w-full  items-center gap-3">
                                <FormLabel>
                                    <Image
                                        src={currentUserImg}
                                        alt="Current image user"
                                        width={48}
                                        height={48}
                                        className="rounded-full object-cover"
                                    ></Image>
                                </FormLabel>
                                <FormControl className="border-none bg-transparent">
                                    <Input
                                        type="text"
                                        placeholder="Comment..."
                                        className="no-focus text-light-1 outline-none"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="comment-form_btn">
                        Invia
                    </Button>
                </form>
            </Form>
        </div>
    );
}

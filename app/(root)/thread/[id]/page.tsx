import ThreadCard from "@/componenti/cards/ThreadCard";
import { currentUser } from "@clerk/nextjs";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import Comment from "@/componenti/forms/Comment";

export default async function Page({ params }: { params: { id: string } }) {
    if (!params.id) return null;

    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    const thread = await fetchThreadById(params.id);

    return (
        <section className="">
            <ThreadCard
                id={thread?._id}
                currentUserId={user?.id || ""}
                parentId={thread?.parentId}
                content={thread?.text}
                author={thread?.author}
                community={thread?.community}
                createdAt={thread?.createdAt}
                comments={thread?.children}
                key={thread?._id}
            />
            <div className="mt-7">
                <Comment
                    threadId={thread?._id}
                    currentUserImg={userInfo.image}
                    currentUserId={JSON.stringify(userInfo._id)}
                />
            </div>

            <div className="mt-10">
                {thread.children.map((childItem: any) => (
                    <ThreadCard
                        id={childItem?._id}
                        currentUserId={user?.id || ""}
                        parentId={childItem?.parentId}
                        content={childItem?.text}
                        author={childItem?.author}
                        community={childItem?.community}
                        createdAt={childItem?.createdAt}
                        comments={childItem?.children}
                        key={childItem?._id}
                        isComment
                    />
                ))}
            </div>
        </section>
    );
}

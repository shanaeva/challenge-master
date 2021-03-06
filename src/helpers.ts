import {CommentType, ChildrenType} from "./types";
import comments from "./data/comments";
import authors from "./data/authors";

const MAX_LENGTH_DATE = 19;

export const getDataRequest = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (Math.random() > 0.05) {
        return {
            comments,
            authors,
        };
    }

    throw new Error("Не удалось загрузить данные");
};

export const formatComments = (comments: Array<CommentType>) => {
    const children = {} as {[key: number]: {children: Array<ChildrenType>}};

    return comments
        .sort((a, b) => b.id - a.id)
        .reduce<ChildrenType[]>((acc, comment) => {
            if (comment.parent) {
                if (!children[comment.parent]) {
                    children[comment.parent] = {children: []};
                }
                if (children[comment.id]) {
                    children[comment.parent].children.push({
                        ...comment,
                        ...children[comment.id],
                    });
                } else {
                    children[comment.parent].children.push(comment);
                }
            } else {
                acc.push({...comment, children: children[comment.id]?.children});
            }
            return acc;
        }, [])
        .sort(
            (a, b) =>
                new Date(a.created).valueOf() - new Date(b.created).valueOf(),
        );
};

export const formattedDate = (date: string) =>
    date.slice(0, MAX_LENGTH_DATE).replace("T", ", ");


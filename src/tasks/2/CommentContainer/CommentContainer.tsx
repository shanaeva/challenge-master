import "./styles.css";
import {AuthorType, ChildrenType} from "../types";
import {Comment} from "../Comment/Comment";
import React, {useState} from "react";
import {Button} from "../Button/Button";
import {formattedDate} from "../helpers";

const MAX_COUNT_COMMENTS = 1;

type Props = {
    comments: Array<ChildrenType>;
    authors: ReadonlyArray<AuthorType>;
    deep?: number;
};

export const CommentContainer = ({comments, authors, deep = 0}: Props) => {
    const [hiddenChildren, setHiddenChildren] = useState<Array<ChildrenType>>();
    const [maxCountComments, setMaxCountComments] =
        useState(MAX_COUNT_COMMENTS);

    return (
        <>
            {comments.map((comment) => {
                const {
                    author: authorId,
                    created,
                    id,
                    likes,
                    text,
                    children,
                } = comment;

                const author = authors.find((el) => el.id === authorId);

                if (!author) return null;

                const {name, avatar} = author;
                const date = formattedDate(created);

                const isShowMore = deep < maxCountComments;

                const showMore = () => {
                    setHiddenChildren(children);

                    setMaxCountComments(maxCountComments + deep);
                };

                const currentChildren = hiddenChildren || children;
                const isCurrentChildren =
                    currentChildren && currentChildren.length !== 0;

                return (
                    <div className="comment-container" key={id}>
                        <Comment
                            text={text}
                            name={name}
                            avatar={avatar}
                            likes={likes}
                            date={date}
                            deep={deep + 1}
                        />
                        {isCurrentChildren && isShowMore && (
                            <CommentContainer
                                comments={currentChildren}
                                authors={authors}
                                deep={deep + 1}
                            />
                        )}
                        {isCurrentChildren && !isShowMore && (
                            <Button onClick={showMore} />
                        )}
                    </div>
                );
            })}
        </>
    );
};

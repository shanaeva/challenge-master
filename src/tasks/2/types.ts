export type AuthorType = {
    id: number;
    name: string;
    avatar: string;
};

export type CommentType = {
    id: number;
    created: string;
    text: string;
    author: number;
    parent: number;
    likes: number;
};

export type DataType = {
    authors: ReadonlyArray<AuthorType>;
    comments: Array<CommentType>;
};

export type ChildrenType = CommentType & {children?: Array<ChildrenType>};

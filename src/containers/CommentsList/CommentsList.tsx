import React, {useEffect, useState} from "react";
import {DataType} from "../../types";
import {formatComments, getDataRequest} from "../../helpers";
import {Comment} from "../Comment/Comment";

export const CommentsList = () => {
    const [state, setState] = useState<DataType | null>(null);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        getDataRequest()
            .then((res: DataType) => {
                const {authors, comments} = res;
                setState({authors, comments: formatComments(comments)});
            })
            .catch((err) => {
                console.error(err);
                setIsError(true);
            });
    }, []);

    if (!state || isError) {
        return null;
    }

    const {authors, comments} = state;

    return <Comment comments={comments} authors={authors} />;
};

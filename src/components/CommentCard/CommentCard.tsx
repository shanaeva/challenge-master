import "./styles.css";
import imgSrc from "../../assets/like.svg";

type Props = {
    text: string;
    name: string;
    avatar: string;
    likes: number;
    date: string;
    deep: number;
};

const styled = (deep: number) => ({
    marginLeft: `${1.5 * deep}vw`,
});

export const CommentCard = ({name, avatar, text, likes, date, deep}: Props) => (
    <div className="comment flex" style={styled(deep)}>
        <div className="comment__header flex">
            <div className="flex">
                <div className="comment__img-wrapper flex">
                    <img className="comment__img" src={avatar} alt="" />
                </div>

                <div className="comment__name flex">
                    <h1 className="font font_size_l">{name}</h1>
                    <p className="font font_color font_size_s">{date}</p>
                </div>
            </div>

            <div className="comment__likes flex">
                <img className="comment__img-likes" src={imgSrc} alt="" />
                <p className="comment__count font_size_l">{likes}</p>
            </div>
        </div>

        <p className="comment__text font_size_l">{text}</p>
    </div>
);

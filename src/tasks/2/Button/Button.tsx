import "./styles.css";

export const Button = ({onClick}: {onClick: () => void}) => (
    <div className='button-container flex'>
        <button className="more-button font_size_l" onClick={onClick}>
            <span>Показать еще</span>
        </button>
    </div>
);

import './InfoButton.css';

const InfoButton = ({ setInfos }) => {

    const toggleInfos = () => {
        setInfos((prev) => !prev )
    }  

    return (
        <button className="info" onClick={toggleInfos}>?</button>
    );
}

export default InfoButton;
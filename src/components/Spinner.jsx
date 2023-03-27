import './Spinner.css';

const Spinner = () => {

    return (
        <div className="lds-spinner">
            {[...Array(12)].map((_, i) => <div key={i}/>)}
        </div>
    );
}

export default Spinner;
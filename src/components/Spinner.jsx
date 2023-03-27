import './Spinner.css';

const Spinner = () => {

    return (
        <div class="lds-spinner">
            {[...Array(12)].map(_ => <div/>)}
        </div>
    );
}

export default Spinner;
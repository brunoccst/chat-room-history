import { SpinnerIcon } from 'assets';
import './load-spinner.scss';

const LoadSpinner = () => {
    return (
        <div className="load-spinner">
            <img src={SpinnerIcon} alt="Load spinner icon" />
        </div>
    )
}

export default LoadSpinner;
import './Watch.scss';
import { ArrowBackOutlined } from "@material-ui/icons";
import { useLocation,Link } from 'react-router-dom';
const Watch = (props) => {
    const location = useLocation();
    const movie = location.movie;
    //console.log(location);
    return (
        <div>
            <div className="watch">
                <Link to="/">
                    <div className="back">
                        <ArrowBackOutlined/>
                        Home
                    </div>
                </Link>
                <video
                    className="video"
                    autoPlay
                    progress
                    controls
                    src={movie.video}
                />
            </div>
        </div>
    );
}

export default Watch;
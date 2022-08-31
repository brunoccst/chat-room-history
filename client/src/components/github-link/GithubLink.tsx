import { GithubIcon } from "assets";
import './github-link.scss'

const GithubLink = () => {
    const href = "https://github.com/brunoccst/chat-room-history";

    return (
        <a href={href} className="github-link">
            <img src={GithubIcon} className='github-icon' alt="GitHub icon" />
            <div>chat-room-history</div>
        </a>
    )
}

export default GithubLink;
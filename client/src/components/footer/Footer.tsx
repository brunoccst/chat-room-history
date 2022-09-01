import { GithubLink, LanguageSelector } from "components"
import './footer.scss';

const Footer = () => {
    return (
        <div className="footer">
            <LanguageSelector />
            <GithubLink />
        </div>
    )
}

export default Footer;
import Link from "next/link";
import Logo from "@/components/Logo";

const PLATFORM_URL = "https://platform.ollacademy.com/";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div>
            <Link className="brand" href="/" aria-label="The Organization Learning Labs">
              <Logo />
            </Link>
            <p style={{ margin: 0, color: "var(--mute)", fontSize: "14.5px" }}>+91 76766 46518</p>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About us</Link></li>
              <li><Link href="/#research">Research</Link></li>
              <li><Link href="/#best-practices">Best practices</Link></li>
              <li><Link href="/#faq">Questions and answers</Link></li>
            </ul>
          </div>
          <div>
            <h4>Industries in focus</h4>
            <ul>
              <li><Link href="/?industry=it">Information technology</Link></li>
              <li><Link href="/?industry=bfsi">Banking and insurance</Link></li>
            </ul>
          </div>
          <div>
            <h4>Get started</h4>
            <ul>
              <li>
                <a href={PLATFORM_URL}>
                  Sign in as an organization<small>Structural and governance maturity</small>
                </a>
              </li>
              <li>
                <a href={PLATFORM_URL}>
                  Sign in as a department<small>Where the capability gaps sit</small>
                </a>
              </li>
              <li>
                <a href={PLATFORM_URL}>
                  Sign in as an individual<small>Your own Development Action Plan</small>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-small">
          <span>© 2026 The Organization Learning Labs LLP</span>
          <span>
            <Link href="/privacy">Privacy policy</Link> &nbsp; <Link href="/terms">Terms</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

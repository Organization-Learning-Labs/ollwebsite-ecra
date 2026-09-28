import Link from "next/link";
import Logo from "@/components/Logo";
import { assessmentSignups } from "@/data/ecra";
import { siteConfig } from "@/lib/site";

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
            <div className="foot-more">
              <h4>Explore more</h4>
              <ul>
                <li><Link href="/about/responsible-assessment">Responsible Assessment</Link></li>
                <li><Link href="/competence-blueprint">Competence Blueprint</Link></li>
                <li><Link href="/#best-practices">Best Practices</Link></li>
                <li><Link href="/#faq">Questions and Answers</Link></li>
              </ul>
            </div>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/about/our-purpose">Our Purpose</Link></li>
              <li><Link href="/about/our-values">Our Values</Link></li>
              <li><Link href="/about/our-approach">Our Approach</Link></li>
              <li><a href={siteConfig.research} target="_blank" rel="noopener">Our Research</a></li>
              <li><Link href="/ecra">Our Assessment</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
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
              {assessmentSignups.map((a) => (
                <li key={a.slug}>
                  <a href={PLATFORM_URL}>
                    {a.title}
                    <small>{a.line}</small>
                  </a>
                </li>
              ))}
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

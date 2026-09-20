import Link from 'next/link';
import './bookonline.css';

export default function BookOnline() {
  return (
    <Link href="/request" className="book-online">
      <span>
        <i className="icon-spanner" aria-hidden="true" />
        Book Online
      </span>
    </Link>
  );
}

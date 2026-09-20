import Link from 'next/link';
import './bookonline.css';

export default function BookOnline({ appliance }: { appliance?: string }) {
  return (
    <Link href={appliance ? `/book-online?appliance=${encodeURIComponent(appliance)}` : '/book-online'} className="book-online">
      <span>
        <i className="icon-spanner" aria-hidden="true" />
        Book Online
      </span>
    </Link>
  );
}
